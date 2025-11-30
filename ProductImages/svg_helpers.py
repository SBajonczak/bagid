"""SVG helper utilities moved out of converter for reusability.

Dieses Modul enthält Konstanten und Hilfsfunktionen zur Arbeit mit SVGs:
- Namespace-Konstanten
- viewBox / canvas Berechnung
- Layer-Suche und Label-Utilities
- Wasserzeichen-Visibility-Toggle
- href-Erzeugung (data-uri / relative / file URI)
"""
from __future__ import annotations

import base64
import io
import os
from pathlib import Path
from typing import Optional, Tuple
import xml.etree.ElementTree as ET


SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
INKSCAPE_NS = "http://www.inkscape.org/namespaces/inkscape"

# Register namespaces for pretty output
ET.register_namespace("", SVG_NS)
ET.register_namespace("xlink", XLINK_NS)
ET.register_namespace("inkscape", INKSCAPE_NS)


def _parse_length(value: Optional[str]) -> Optional[float]:
    if not value:
        return None
    s = value.strip().lower()
    try:
        return float(s)
    except ValueError:
        pass
    factors = {
        "px": 1.0,
        "in": 96.0,
        "cm": 96.0 / 2.54,
        "mm": 96.0 / 25.4,
    }
    for unit, factor in factors.items():
        if s.endswith(unit):
            num = s[: -len(unit)].strip()
            try:
                return float(num) * factor
            except ValueError:
                return None
    return None


def _get_viewbox(root: ET.Element) -> Optional[Tuple[float, float, float, float]]:
    view_box = root.get("viewBox") or root.get("viewbox")
    if view_box:
        parts = [p for p in view_box.replace(",", " ").split() if p]
        if len(parts) == 4:
            try:
                return float(parts[0]), float(parts[1]), float(parts[2]), float(parts[3])
            except ValueError:
                return None
    return None


def _get_canvas_user_space(root: ET.Element) -> Tuple[Optional[float], Optional[float], Optional[float], Optional[float]]:
    vb = _get_viewbox(root)
    if vb is not None:
        minx, miny, w, h = vb
        return minx, miny, w, h
    width_px = _parse_length(root.get("width"))
    height_px = _parse_length(root.get("height"))
    if width_px is not None and height_px is not None:
        return 0.0, 0.0, width_px, height_px
    return None, None, None, None


def _find_layers(root: ET.Element) -> list[ET.Element]:
    layers: list[ET.Element] = []
    for g in root.findall(f".//{{{SVG_NS}}}g"):
        if g.get(f"{{{INKSCAPE_NS}}}groupmode") == "layer":
            layers.append(g)
    return layers


def _find_by_label(root: ET.Element, label: str) -> list[ET.Element]:
    matches: list[ET.Element] = []
    for el in root.iter():
        if el.get(f"{{{INKSCAPE_NS}}}label") == label:
            matches.append(el)
    return matches


def _apply_watermark_setting(root: ET.Element, watermark: Optional[int]) -> None:
    if watermark is None:
        return
    show = bool(watermark)
    for el in _find_by_label(root, "Wasserzeichen"):
        style = el.get("style") or ""
        props: dict[str, str] = {}
        for part in (s.strip() for s in style.split(";") if s.strip()):
            if ":" in part:
                k, v = part.split(":", 1)
                props[k.strip()] = v.strip()
        if show:
            if props.get("display", "").strip() == "none":
                del props["display"]
        else:
            props["display"] = "none"
        if props:
            new_style = ";".join(f"{k}:{v}" for k, v in props.items())
            el.set("style", new_style)
        else:
            if "style" in el.attrib:
                del el.attrib["style"]


def _relative_href(from_svg: str, to_image: str) -> str:
    svg_dir = os.path.dirname(os.path.abspath(from_svg))
    try:
        rel = os.path.relpath(os.path.abspath(to_image), svg_dir)
    except Exception:
        rel = os.path.basename(to_image)
    return rel.replace("\\", "/")


def _svg_tree_to_bytes(tree: ET.ElementTree) -> bytes:
    buf = io.BytesIO()
    tree.write(buf, encoding="utf-8", xml_declaration=True)
    return buf.getvalue()


def _make_image_href(svg_path: str, image_path: str, embed: bool, *, prefer_relative: bool = False) -> str:
    lp = image_path.lower()
    if embed:
        if lp.endswith((".jpg", ".jpeg")):
            mime = "image/jpeg"
        elif lp.endswith(".webp"):
            mime = "image/webp"
        else:
            mime = "image/png"
        with open(image_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode("ascii")
        return f"data:{mime};base64,{b64}"
    if prefer_relative:
        return _relative_href(svg_path, image_path)
    return Path(os.path.abspath(image_path)).as_uri()
