"""
SVG Bild-Inserter

Fügt ein Rasterbild (z. B. JPG/PNG) in die vorletzte Ebene (Layer) einer SVG ein,
zentriert es und skaliert es proportional auf maximal 1000x1000 (Standard),
ohne das Seitenverhältnis zu verändern.

Annahmen und Verhalten:
- Layer werden als <g>-Elemente mit inkscape:groupmode="layer" erkannt.
- Zentrierung erfolgt auf Basis der SVG-Zeichenfläche (width/height oder viewBox).
- Einheiten px/mm/cm/in werden für width/height des Root-SVG unterstützt
  (Umrechnung mit 96 DPI). Wenn width/height fehlen, wird viewBox verwendet.
- Wenn weniger als 2 Layer vorhanden sind, wird ausfallsicher der letzte Layer verwendet.

Beispiel (PowerShell):
  python .\converter.py --svg .\Vorlage.svg --image .\Marve-1.jpg --max-size 1000 \
		 --out .\Vorlage-with-image.svg

Benötigte Pakete: Pillow (für Bildabmessungen). Installation (optional):
  pip install Pillow
"""

from __future__ import annotations

import argparse
import base64
import io
import os
import sys
import tempfile
import subprocess
import shutil
from pathlib import Path
from typing import Optional, Tuple

try:
	from PIL import Image  # type: ignore
except Exception:  # pragma: no cover - optional dependency
	Image = None  # type: ignore

try:
	import cairosvg  # type: ignore
except Exception:  # pragma: no cover - optional dependency
	cairosvg = None  # type: ignore

import xml.etree.ElementTree as ET


SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
INKSCAPE_NS = "http://www.inkscape.org/namespaces/inkscape"

# Verwende Default Namespace für SVG (kein Prefix in Ausgabe)
ET.register_namespace("", SVG_NS)
ET.register_namespace("xlink", XLINK_NS)
ET.register_namespace("inkscape", INKSCAPE_NS)


def _parse_length(value: Optional[str]) -> Optional[float]:
	"""Parse an SVG length attribute (e.g., "800", "800px", "210mm"). Returns pixels.

	Uses CSS px @ 96 DPI for unit conversion.
	Supported units: px (default), mm, cm, in.
	"""
	if not value:
		return None
	s = value.strip().lower()
	try:
		# If pure number: assume px
		return float(s)
	except ValueError:
		pass

	# Unit-suffixed
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
	"""Return (minx, miny, width, height) of the SVG viewBox if present."""
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
	"""Return (minx, miny, width_user, height_user) of the canvas in user units.

	Prefer viewBox if present; otherwise fall back to width/height in px assuming 1px == 1 user unit.
	"""
	vb = _get_viewbox(root)
	if vb is not None:
		minx, miny, w, h = vb
		return minx, miny, w, h
	# Fallback to px dimensions as user units
	width_px = _parse_length(root.get("width"))
	height_px = _parse_length(root.get("height"))
	if width_px is not None and height_px is not None:
		return 0.0, 0.0, width_px, height_px
	return None, None, None, None


def _find_layers(root: ET.Element) -> list[ET.Element]:
	"""Find all layer <g> elements (inkscape:groupmode="layer")."""
	layers: list[ET.Element] = []
	# Search all g elements and check the inkscape attribute
	for g in root.findall(f".//{{{SVG_NS}}}g"):
		if g.get(f"{{{INKSCAPE_NS}}}groupmode") == "layer":
			layers.append(g)
	return layers


def _find_by_label(root: ET.Element, label: str) -> list[ET.Element]:
	"""Find any elements (any tag) with inkscape:label == label anywhere in the tree."""
	matches: list[ET.Element] = []
	for el in root.iter():
		if el.get(f"{{{INKSCAPE_NS}}}label") == label:
			matches.append(el)
	return matches


def _apply_watermark_setting(root: ET.Element, watermark: Optional[int]) -> None:
	"""Toggle visibility of elements labeled 'Wasserzeichen'.

	If `watermark` is None, do nothing. If 1 => show (remove display:none),
	if 0 => hide (set display:none) on the group's style attribute.
	"""
	if watermark is None:
		return
	show = bool(watermark)
	for el in _find_by_label(root, "Wasserzeichen"):
		style = el.get("style") or ""
		# parse style into dict
		props: dict[str, str] = {}
		for part in (s.strip() for s in style.split(";") if s.strip()):
			if ":" in part:
				k, v = part.split(":", 1)
				props[k.strip()] = v.strip()
		if show:
			# remove display:none if present
			if props.get("display", "").strip() == "none":
				del props["display"]
		else:
			# ensure hidden
			props["display"] = "none"
		# rebuild style
		if props:
			new_style = ";".join(f"{k}:{v}" for k, v in props.items())
			el.set("style", new_style)
		else:
			if "style" in el.attrib:
				del el.attrib["style"]


def _get_image_size(path: str) -> Tuple[int, int]:
	"""Return (width, height) of the raster image in pixels. Requires Pillow."""
	# Try Pillow first if available
	if Image is not None:
		try:
			with Image.open(path) as im:
				im.load()
				return im.width, im.height
		except Exception:
			# Fallthrough to format-specific parsers
			pass

	# Fallback: implement lightweight WebP header parser to avoid requiring Pillow
	if path.lower().endswith(".webp"):
		size = _get_webp_size(path)
		if size:
			return size
		# If parser failed, raise explicit error
		raise RuntimeError(
			"Konnte Bildabmessungen nicht bestimmen. Installiere 'Pillow' mit WebP-Unterstützung oder verwende ein anderes Bildformat."
		)

	raise RuntimeError(
		"Pillow ist nicht installiert oder kann das Bild nicht öffnen. Bitte 'pip install Pillow' ausführen."
	)


def _get_webp_size(path: str) -> Optional[Tuple[int, int]]:
	"""Read WebP file header and return (width, height) if parseable.

	Supports VP8 (lossy), VP8L (lossless) and VP8X (extended) chunks.
	Returns None if parsing fails.
	"""
	try:
		with open(path, "rb") as f:
			header = f.read(12)
			if len(header) < 12 or header[0:4] != b"RIFF" or header[8:12] != b"WEBP":
				return None
			# walk chunks
			while True:
				chunk_hdr = f.read(8)
				if len(chunk_hdr) < 8:
					break
				chunk_type = chunk_hdr[0:4]
				chunk_size = int.from_bytes(chunk_hdr[4:8], "little")
				if chunk_type == b"VP8X":
					data = f.read(chunk_size)
					if len(data) >= 10:
						# width and height stored as 24-bit little-endian, values are (minus one)
						w = int.from_bytes(data[4:7], "little") + 1
						h = int.from_bytes(data[7:10], "little") + 1
						return w, h
				elif chunk_type == b"VP8 ":
					data = f.read(chunk_size)
					# lossy VP8: start code at offset 3..5 and width/height at 6..9
					if len(data) >= 10:
						w = ((data[6] | (data[7] << 8)) & 0x3FFF) + 0
						h = ((data[8] | (data[9] << 8)) & 0x3FFF) + 0
						return w, h
				elif chunk_type == b"VP8L":
					data = f.read(chunk_size)
					# lossless VP8L: size encoded in first 5 bytes
					if len(data) >= 5 and data[0] == 0x2F:
						b1, b2, b3, b4 = data[1], data[2], data[3], data[4]
						w = ((b1 | ((b2 & 0x3F) << 8)) + 1)
						h = (((b2 >> 6) | (b3 << 2) | ((b4 & 0x0F) << 10)) + 1)
						return w, h
				else:
					# skip this chunk
					f.seek((chunk_size + 1) & ~1, os.SEEK_CUR)
			# not found
			return None
	except Exception:
		return None


# NOTE: Alte Skalierungsfunktion entfernt; nun wird direkt über user-space Limits skaliert.


def _relative_href(from_svg: str, to_image: str) -> str:
	"""Compute a relative path from the SVG's directory to the image file."""
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
	"""Return an href value for an <image> element.

	- If `embed` is True -> return a data:...;base64,... URI (uses original bytes and MIME).
	- If `embed` is False and `prefer_relative` is True -> return a relative path from svg_path to image_path.
	- If `embed` is False and `prefer_relative` is False -> return an absolute file:// URI.

	Additionally: when not embedding and the image is a .webp, some renderers (CairoSVG)
	cannot read WebP. In contexts that require an absolute/consumable href (prefer_relative=False)
	the caller may expect a file:// URI; this helper will not convert WebP to PNG here —
	conversion for in-memory rendering is handled by callers that need it.
	"""
	lp = image_path.lower()
	if embed:
		# Determine MIME
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

	# absolute file URI
	return Path(os.path.abspath(image_path)).as_uri()


def _build_svg_tree_bytes(
	svg_path: str,
	image_path: str,
	max_size: int,
	embed_data_uri: bool,
	before_layer_label: Optional[str],
	after_layer_label: Optional[str],
	new_layer_label: str,
    watermark: Optional[int] = None,
) -> bytes:
	"""Erstellt die SVG (mit Bild) im Speicher und gibt Bytes zurück."""
	tree = ET.parse(svg_path)
	root = tree.getroot()

	# Apply watermark visibility setting if requested
	_apply_watermark_setting(root, watermark)

	minx, miny, canvas_w, canvas_h = _get_canvas_user_space(root)
	if canvas_w is None or canvas_h is None or minx is None or miny is None:
		raise ValueError("Konnte SVG-Zeichenfläche nicht bestimmen (width/height oder viewBox fehlen).")

	parent_map = {c: p for p in root.iter() for c in p}
	insert_parent: ET.Element = root
	insert_index: Optional[int] = None

	def find_first(label: Optional[str]) -> Optional[ET.Element]:
		if not label:
			return None
		m = _find_by_label(root, label)
		return m[0] if m else None

	before_el = find_first(before_layer_label)
	after_el = find_first(after_layer_label)

	def get_parent_and_index(el: ET.Element) -> Tuple[Optional[ET.Element], Optional[int]]:
		p = parent_map.get(el)
		if p is None:
			return None, None
		children = list(p)
		try:
			return p, children.index(el)
		except ValueError:
			return p, None

	if before_el is not None and after_el is not None:
		p_b, idx_b = get_parent_and_index(before_el)
		p_a, idx_a = get_parent_and_index(after_el)
		if p_b is not None and p_b is p_a and idx_b is not None and idx_a is not None:
			insert_parent = p_b
			insert_index = (idx_a + 1) if idx_a < idx_b else idx_b
		elif p_a is not None and idx_a is not None:
			insert_parent = p_a
			insert_index = idx_a + 1
		elif p_b is not None and idx_b is not None:
			insert_parent = p_b
			insert_index = idx_b
	elif before_el is not None:
		p, idx = get_parent_and_index(before_el)
		if p is not None and idx is not None:
			insert_parent = p
			insert_index = idx
	elif after_el is not None:
		p, idx = get_parent_and_index(after_el)
		if p is not None and idx is not None:
			insert_parent = p
			insert_index = idx + 1
	else:
		layers = _find_layers(root)
		if layers:
			insert_parent = layers[-2] if len(layers) >= 2 else layers[-1]
		else:
			insert_parent = root

	# Bildgröße und Skalierung
	img_w, img_h = _get_image_size(image_path)
	width_px = _parse_length(root.get("width"))
	height_px = _parse_length(root.get("height"))
	px_per_unit_x = (width_px / canvas_w) if (width_px and canvas_w) else 1.0
	px_per_unit_y = (height_px / canvas_h) if (height_px and canvas_h) else 1.0
	user_limit_w = max_size / px_per_unit_x
	user_limit_h = max_size / px_per_unit_y
	aspect = (img_w / img_h) if img_h else 1.0
	if user_limit_w / aspect <= user_limit_h:
		scaled_w = user_limit_w
		scaled_h = user_limit_w / aspect
	else:
		scaled_h = user_limit_h
		scaled_w = user_limit_h * aspect
	x = minx + (canvas_w - scaled_w) / 2.0
	y = miny + (canvas_h - scaled_h) / 2.0

	image_el = ET.Element(f"{{{SVG_NS}}}image")
	image_el.set("x", f"{x:.3f}")
	image_el.set("y", f"{y:.3f}")
	image_el.set("width", f"{scaled_w:.3f}")
	image_el.set("height", f"{scaled_h:.3f}")
	image_el.set("preserveAspectRatio", "xMidYMid meet")
	href_val = _make_image_href(svg_path, image_path, embed_data_uri, prefer_relative=False)
	# If renderer can't handle webp for non-embedded images, convert to PNG and embed
	if not embed_data_uri and image_path.lower().endswith('.webp') and Image is not None:
		# try convert to PNG data-uri to make rendering reliable
		try:
			with Image.open(image_path) as im:
				buf = io.BytesIO()
				im.convert('RGBA').save(buf, format='PNG')
				b64 = base64.b64encode(buf.getvalue()).decode('ascii')
				href_val = f"data:image/png;base64,{b64}"
		except Exception:
			# keep file URI
			pass
	image_el.set(f"{{{XLINK_NS}}}href", href_val)
	image_el.set("href", href_val)

	# Optionaler Wrapper-Layer
	if new_layer_label:
		wrapper = ET.Element(f"{{{SVG_NS}}}g")
		if insert_parent is root:
			wrapper.set(f"{{{INKSCAPE_NS}}}groupmode", "layer")
		wrapper.set(f"{{{INKSCAPE_NS}}}label", new_layer_label)
		wrapper.append(image_el)
		node_to_insert = wrapper
	else:
		node_to_insert = image_el

	if insert_index is None:
		insert_parent.append(node_to_insert)
	else:
		insert_parent.insert(insert_index, node_to_insert)

	return _svg_tree_to_bytes(tree)


def insert_image_into_svg(
	svg_path: str,
	image_path: str,
	out_path: Optional[str] = None,
	max_size: int = 1000,
	embed_data_uri: bool = False,
	before_layer_label: Optional[str] = None,
	after_layer_label: Optional[str] = None,
	new_layer_label: str = "Bild",
    watermark: Optional[int] = None,
) -> str:
	"""Insert image into the penultimate layer of the SVG, centered and scaled.

	Returns the output SVG path.
	"""
	if not os.path.isfile(svg_path):
		raise FileNotFoundError(f"SVG nicht gefunden: {svg_path}")
	if not os.path.isfile(image_path):
		raise FileNotFoundError(f"Bild nicht gefunden: {image_path}")

	tree = ET.parse(svg_path)
	root = tree.getroot()

	# Apply watermark visibility setting if requested
	_apply_watermark_setting(root, watermark)

	# Canvas user space (use viewBox if present)
	minx, miny, canvas_w, canvas_h = _get_canvas_user_space(root)
	if canvas_w is None or canvas_h is None or minx is None or miny is None:
		raise ValueError(
			"Konnte SVG-Zeichenfläche nicht bestimmen (width/height oder viewBox fehlen)."
		)

	# Build a parent map for quick parent lookup
	parent_map = {c: p for p in root.iter() for c in p}

	# Determine insertion parent and index using inkscape:label of arbitrary elements
	insert_parent: ET.Element = root
	insert_index: Optional[int] = None

	before_el = None
	after_el = None
	if before_layer_label:
		m = _find_by_label(root, before_layer_label)
		if m:
			before_el = m[0]
		else:
			print(f"Warnung: before-layer '{before_layer_label}' nicht gefunden. Ignoriere diesen Teil.")
	if after_layer_label:
		m = _find_by_label(root, after_layer_label)
		if m:
			after_el = m[0]
		else:
			print(f"Warnung: after-layer '{after_layer_label}' nicht gefunden. Ignoriere diesen Teil.")

	def get_parent_and_index(el: ET.Element) -> Tuple[Optional[ET.Element], Optional[int]]:
		p = parent_map.get(el)
		if p is None:
			return None, None
		children = list(p)
		try:
			return p, children.index(el)
		except ValueError:
			return p, None

	if before_el is not None and after_el is not None:
		p_b, idx_b = get_parent_and_index(before_el)
		p_a, idx_a = get_parent_and_index(after_el)
		if p_b is not None and p_b is p_a and idx_b is not None and idx_a is not None:
			# Same parent: put strictly between
			insert_parent = p_b
			if idx_a < idx_b:
				insert_index = idx_a + 1
			else:
				insert_index = idx_b
		elif p_a is not None and idx_a is not None:
			insert_parent = p_a
			insert_index = idx_a + 1
		elif p_b is not None and idx_b is not None:
			insert_parent = p_b
			insert_index = idx_b
	elif before_el is not None:
		p, idx = get_parent_and_index(before_el)
		if p is not None and idx is not None:
			insert_parent = p
			insert_index = idx
	elif after_el is not None:
		p, idx = get_parent_and_index(after_el)
		if p is not None and idx is not None:
			insert_parent = p
			insert_index = idx + 1
	else:
		# Fallback: insert into penultimate layer if available, else root
		layers = _find_layers(root)
		if layers:
			insert_parent = layers[-2] if len(layers) >= 2 else layers[-1]
		else:
			insert_parent = root

	# Get image size
	img_w, img_h = _get_image_size(image_path)

	# Compute px per user unit using width/height vs viewBox if possible
	width_px = _parse_length(root.get("width"))
	height_px = _parse_length(root.get("height"))
	px_per_unit_x = (width_px / canvas_w) if (width_px and canvas_w) else 1.0
	px_per_unit_y = (height_px / canvas_h) if (height_px and canvas_h) else 1.0

	# Translate max-size (px) into user unit limits
	user_limit_w = max_size / px_per_unit_x
	user_limit_h = max_size / px_per_unit_y
	aspect = (img_w / img_h) if img_h else 1.0
	# Fit proportionally
	if user_limit_w / aspect <= user_limit_h:
		scaled_w = user_limit_w
		scaled_h = user_limit_w / aspect
	else:
		scaled_h = user_limit_h
		scaled_w = user_limit_h * aspect

	# Center within viewBox/user space
	x = minx + (canvas_w - scaled_w) / 2.0
	y = miny + (canvas_h - scaled_h) / 2.0

	# Create <image> element
	image_el = ET.Element(f"{{{SVG_NS}}}image")
	image_el.set("x", f"{x:.3f}")
	image_el.set("y", f"{y:.3f}")
	image_el.set("width", f"{scaled_w:.3f}")
	image_el.set("height", f"{scaled_h:.3f}")
	image_el.set("preserveAspectRatio", "xMidYMid meet")
	# Use relative href for written SVGs (so files remain portable)
	href_val = _make_image_href(svg_path, image_path, embed_data_uri, prefer_relative=True)
	image_el.set(f"{{{XLINK_NS}}}href", href_val)
	image_el.set("href", href_val)  # also set non-namespaced for compatibility

	# Decide if we need a wrapper group (named) and insert at the computed spot
	node_to_insert: ET.Element
	if new_layer_label:
		wrapper = ET.Element(f"{{{SVG_NS}}}g")
		# Only mark as a layer if placed at root (top-level layer); otherwise it's a labeled group
		if insert_parent is root:
			wrapper.set(f"{{{INKSCAPE_NS}}}groupmode", "layer")
		wrapper.set(f"{{{INKSCAPE_NS}}}label", new_layer_label)
		wrapper.append(image_el)
		node_to_insert = wrapper
	else:
		node_to_insert = image_el

	if insert_index is None:
		insert_parent.append(node_to_insert)
	else:
		insert_parent.insert(insert_index, node_to_insert)

	# Determine output path
	if not out_path:
		base, ext = os.path.splitext(svg_path)
		out_path = f"{base}-with-image{ext or '.svg'}"

	# Ensure directory exists
	os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)

	tree.write(out_path, encoding="utf-8", xml_declaration=True)
	return out_path


# Entfernt: build_svg_tree_with_image (Batch / In-Memory Bedarf nicht mehr).


def _verify_image_present(path: str) -> None:
	"""Öffnet die geschriebene SVG und prüft, ob ein <image>-Element existiert.
	Wir suchen nach 'href' oder 'xlink:href'. Gibt Warnung falls keins gefunden."""
	try:
		with open(path, "r", encoding="utf-8") as f:
			content = f.read()
		if "<image" not in content:
			print(f"WARNUNG: Kein <image>-Tag in Ausgabe '{path}' gefunden.")
	except Exception as e:
		print(f"WARNUNG: Konnte Ausgabedatei nicht für Prüfung öffnen: {e}")


def _render_svg_bytes_to_webp(svg_bytes: bytes, out_path: str, quality: int = 85) -> None:
	"""Rasterisiert SVG zu WEBP (CairoSVG bevorzugt, Inkscape-CLI als Fallback)."""
	if Image is None:
		raise RuntimeError("Pillow ist nicht installiert. Bitte 'pip install Pillow' ausführen.")

	png_bytes: Optional[bytes] = None
	if cairosvg is not None:
		try:
			png_bytes = cairosvg.svg2png(bytestring=svg_bytes)
		except Exception as e:
			print(f"Hinweis: CairoSVG Rendering fehlgeschlagen: {e}")

	if png_bytes is None:
		# Versuche Inkscape zu finden: PATH, INKSCAPE_EXE, typische Windows-Installationsorte
		inkscape = shutil.which("inkscape")
		if not inkscape:
			inkscape = os.environ.get("INKSCAPE_EXE")
			if inkscape and not os.path.isfile(inkscape):
				inkscape = None
		if not inkscape and os.name == "nt":
			candidates = [
				r"C:\\Program Files\\Inkscape\\bin\\inkscape.exe",
				r"C:\\Program Files\\Inkscape\\inkscape.exe",
				r"C:\\Program Files (x86)\\Inkscape\\bin\\inkscape.exe",
				r"C:\\Program Files (x86)\\Inkscape\\inkscape.exe",
			]
			for c in candidates:
				if os.path.isfile(c):
					inkscape = c
					break
		if not inkscape:
			raise RuntimeError(
				"Weder CairoSVG verfügbar noch Inkscape gefunden. Installiere 'pip install cairosvg' (inkl. Cairo-Abhängigkeiten) "
				"oder installiere Inkscape und setze optional INKSCAPE_EXE auf den Pfad zur inkscape.exe."
			)
		with tempfile.TemporaryDirectory() as td:
			svg_tmp = os.path.join(td, "tmp.svg")
			png_tmp = os.path.join(td, "tmp.png")
			with open(svg_tmp, "wb") as f:
				f.write(svg_bytes)
			cmd = [inkscape, svg_tmp, "--export-type=png", f"--export-filename={png_tmp}"]
			subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
			with open(png_tmp, "rb") as f:
				png_bytes = f.read()

	with Image.open(io.BytesIO(png_bytes)) as im:  # type: ignore[arg-type]
		im = im.convert("RGBA")
		os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
		im.save(out_path, format="WEBP", quality=quality, method=6)


# Entfernt: iter_images_in_dir (Batch nicht mehr benötigt).


def _build_arg_parser() -> argparse.ArgumentParser:
	p = argparse.ArgumentParser(description="Fügt ein Bild zwischen zwei Layern in eine SVG ein. Optional: WEBP erzeugen, wenn --out auf .webp endet.")
	p.add_argument("--svg", required=False, default=None, help="Pfad zur SVG-Vorlage (Standard: 'Vorlage.svg' oder 'ProductImages/Vorlage.svg' oder neben converter.py)")
	p.add_argument("--image", required=True, help="Pfad zum Bild (JPG/PNG)")
	p.add_argument("--out", default=None, help="Ausgabepfad (.svg oder .webp). Standard: output/<Bildname>.webp relativ zum Ausführungsverzeichnis")
	p.add_argument(
		"--max-size",
		type=int,
		default=1000,
		help="Maximale Breite/Höhe in Pixeln (proportionale Skalierung)",
	)
	p.add_argument(
		"--embed",
		action="store_true",
		help="Bild als Data-URI einbetten (SVG wird selbstenthaltend)",
	)
	p.add_argument(
		"--before-layer",
		dest="before_layer",
		default="Rahmen",
		help="Neuen Bild-Layer VOR dieser inkscape:label einfügen",
	)
	p.add_argument(
		"--after-layer",
		dest="after_layer",
		default="Hintergrund",
		help="Neuen Bild-Layer NACH dieser inkscape:label einfügen",
	)
	p.add_argument(
		"--layer-name",
		dest="layer_name",
		default="Bild",
		help="Name (inkscape:label) für den neuen Bild-Layer",
	)
	p.add_argument(
		"--quality",
		type=int,
		default=85,
		help="WEBP-Qualität (0-100), nur relevant wenn --out auf .webp endet",
	)
	p.add_argument(
		"--watermark",
		type=int,
		choices=[0, 1],
		default=None,
		help="0=Wasserzeichen ausblenden, 1=einblenden. Wenn nicht angegeben: Template unverändert.",
	)
	return p


def main(argv: Optional[list[str]] = None) -> int:
	args = _build_arg_parser().parse_args(argv)
	try:
		# Ermittele Standard-SVG, falls nicht angegeben
		svg_path = args.svg
		if not svg_path:
			# Kandidaten relativ zum aktuellen Arbeitsverzeichnis und zum Skriptverzeichnis
			cwd = os.getcwd()
			script_dir = os.path.dirname(os.path.abspath(__file__))
			candidates = [
				os.path.join(cwd, "Vorlage.svg"),
				os.path.join(cwd, "ProductImages", "Vorlage.svg"),
				os.path.join(script_dir, "Vorlage.svg"),
			]
			for c in candidates:
				if os.path.isfile(c):
					svg_path = c
					break
			if not svg_path:
				raise FileNotFoundError(
					"Keine Vorlage gefunden. Erwartet 'Vorlage.svg' im Arbeitsverzeichnis, 'ProductImages/Vorlage.svg' oder neben converter.py."
				)

		# Standard-Ausgabepfad: ./output/<eingangsdatei>.webp relativ zum Arbeitsverzeichnis
		out_path = args.out
		if not out_path:
			base = os.path.splitext(os.path.basename(args.image))[0]
			out_dir = os.path.join(os.getcwd(), "output")
			out_path = os.path.join(out_dir, f"{base}.webp")

		# Wenn WEBP: in-memory SVG bauen und rendern
		if out_path and out_path.lower().endswith(".webp"):
			svg_bytes = _build_svg_tree_bytes(
				svg_path=svg_path,
				image_path=args.image,
				max_size=args.max_size,
				embed_data_uri=args.embed,
				before_layer_label=args.before_layer,
				after_layer_label=args.after_layer,
				new_layer_label=args.layer_name,
				watermark=args.watermark,
			)
			_render_svg_bytes_to_webp(svg_bytes, out_path, quality=args.quality)
			print(f"WEBP erstellt: {out_path}")
			return 0

		# Wenn --out auf .webp endet, rendern wir eine WEBP-Datei statt SVG zu schreiben
		if args.out and args.out.lower().endswith(".webp"):
			svg_bytes = _build_svg_tree_bytes(
				svg_path=svg_path,
				image_path=args.image,
				max_size=args.max_size,
				embed_data_uri=args.embed,
				before_layer_label=args.before_layer,
				after_layer_label=args.after_layer,
				new_layer_label=args.layer_name,
				watermark=args.watermark,
			)
			_render_svg_bytes_to_webp(svg_bytes, args.out, quality=args.quality)
			print(f"WEBP erstellt: {args.out}")
			return 0

		# Standard: SVG schreiben
		out_svg = insert_image_into_svg(
			svg_path=svg_path,
			image_path=args.image,
			out_path=args.out,
			max_size=args.max_size,
			embed_data_uri=args.embed,
			before_layer_label=args.before_layer,
			after_layer_label=args.after_layer,
			new_layer_label=args.layer_name,
			watermark=args.watermark,
		)
		print(f"Erfolgreich erstellt: {out_svg}")
		_verify_image_present(out_svg)
		return 0
	except Exception as e:
		print(f"Fehler: {e}", file=sys.stderr)
		return 1


if __name__ == "__main__":
	raise SystemExit(main())

