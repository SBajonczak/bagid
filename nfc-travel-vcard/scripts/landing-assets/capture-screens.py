"""
Erzeugt echte Handy-Screenshots der Bag-Tag-App für die Landingpage.

Nutzt den eingebauten Demo-Tag (/demo) und liefert die API-Antworten mit
Beispieldaten aus, damit keine Datenbank nötig ist.

Voraussetzung: laufender Server (npx next start -p 3100), Python-Playwright.
Aufruf:  python3 scripts/landing-assets/capture-screens.py [BASE_URL] [CHROME_PATH]
"""
import json
import subprocess
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
CHROME = sys.argv[2] if len(sys.argv) > 2 else None
OUT = Path(__file__).resolve().parents[2] / "public" / "assets" / "landing"
OUT.mkdir(parents=True, exist_ok=True)

DEMO = {
    "de": {
        "tagName": "Reisekoffer", "ownerFirstName": "Max", "ownerLastName": "Mustermann",
        "ownerEmail": "max.mustermann@example.com", "ownerMobile": "+49 171 1234567",
        "destinationAccommodation": "Hotel Bella Vista", "destinationAddress": "Via Roma 42, 00100 Rom",
        "transportation": "Flug", "arrivalAirportName": "Rom Fiumicino",
    },
    "en": {
        "tagName": "Suitcase", "ownerFirstName": "Max", "ownerLastName": "Miller",
        "ownerEmail": "max.miller@example.com", "ownerMobile": "+44 7700 900123",
        "destinationAccommodation": "Hotel Bella Vista", "destinationAddress": "Via Roma 42, 00100 Rome",
        "transportation": "Flight", "arrivalAirportName": "Rome Fiumicino",
    },
}


def payload(lang):
    d = DEMO[lang]
    data = {
        "tagId": "demo", "hasData": 1, "tagName": d["tagName"],
        "ownerFirstName": d["ownerFirstName"], "ownerLastName": d["ownerLastName"],
        "ownerAddress": "", "ownerEmail": d["ownerEmail"], "ownerMobile": d["ownerMobile"],
        "ownerLandline": None, "ownerOther": "",
        "guideFirstName": "", "guideLastName": "", "guideEmail": "", "guideMobile": "", "guideLandline": None,
        "destinationAccommodation": d["destinationAccommodation"], "destinationAddress": d["destinationAddress"],
        "transportation": d["transportation"], "transportationNumber": "LH232",
        "transportationDate": "2026-05-18T09:45:00Z", "showFlightMap": False,
    }
    legs = [{
        "journeyType": "outbound", "sequence": 1, "carrier": "Lufthansa", "flightNumber": "LH232",
        "departureAirport": "FRA", "departureDatetime": "2026-05-18T09:45:00Z",
        "arrivalAirport": "FCO", "arrivalDatetime": "2026-05-18T11:50:00Z",
        "departureAirportName": "Frankfurt", "arrivalAirportName": d["arrivalAirportName"],
    }]
    return data, legs


def shoot(page, path, heading_text, offset=88):
    # offset: Platz für die sticky Navigation (64px) + Luft
    page.wait_for_timeout(600)
    loc = page.get_by_role("heading", name=heading_text).first
    y = page.evaluate("(el) => el.getBoundingClientRect().top + window.scrollY", loc.element_handle())
    page.evaluate(f"window.scrollTo(0, {max(0, y - offset)})")
    page.wait_for_timeout(300)
    page.screenshot(path=str(path))


def to_webp(png, name):
    target = OUT / name
    subprocess.run(["convert", str(png), "-resize", "600x", "-quality", "82", str(target)], check=True)
    png.unlink()
    print("✓", target.relative_to(OUT.parents[2]))


with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME, args=["--no-sandbox"]) if CHROME else p.chromium.launch()
    for lang in ("de", "en"):
        data, legs = payload(lang)
        ctx = browser.new_context(viewport={"width": 390, "height": 780}, device_scale_factor=2,
                                  is_mobile=True, has_touch=True, locale=f"{lang}-{lang.upper()}")
        page = ctx.new_page()
        page.route("**/api/tags/demo", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps(data)))
        page.route("**/api/tags/demo/flights", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps(legs)))
        page.goto(f"{BASE}/{lang}")
        page.evaluate(f"localStorage.setItem('preferred-language', '{lang}')")

        page.goto(f"{BASE}/demo", wait_until="networkidle")
        contact = "Kontakt / Über mich" if lang == "de" else "About / Contact data"
        tmp = OUT / f"_tmp_{lang}.png"
        shoot(page, tmp, contact)
        to_webp(tmp, f"screen-finder-contact-{lang}.webp")

        dest = "Zieladresse" if lang == "de" else "Destination address"
        travel = "Reisedaten" if lang == "de" else "Travel data"
        shoot(page, tmp, travel)
        to_webp(tmp, f"screen-finder-trip-{lang}.webp")

        page.goto(f"{BASE}/demo/edit", wait_until="networkidle")
        shoot(page, tmp, dest, offset=150)
        to_webp(tmp, f"screen-edit-destination-{lang}.webp")
        ctx.close()
    browser.close()
