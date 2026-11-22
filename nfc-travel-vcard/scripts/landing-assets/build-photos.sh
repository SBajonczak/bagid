#!/usr/bin/env bash
# Erzeugt die Landingpage-Fotos, das OG-Bild und den komprimierten Clip aus
# dem echten Produktvideo (public/assets/bagid-loop.mp4).
# Benötigt: ffmpeg, ImageMagick (convert). Aufruf aus nfc-travel-vcard/.
set -euo pipefail
SRC=public/assets/bagid-loop.mp4
OUT=public/assets/landing
TMP=$(mktemp -d)
mkdir -p "$OUT"

frame() { ffmpeg -loglevel error -ss "$1" -i "$SRC" -frames:v 1 -y "$TMP/$2.png"; }
frame 13.5 tag
frame 4    scan
frame 10.5 tap

# Anhänger am Rucksack (Hochformat 5:6)
convert "$TMP/tag.png"  -crop 900x1080+520+0  +repage -resize 900x  -quality 80 "$OUT/photo-tag-backpack.webp"
# Handy an den Anhänger halten (NFC)
convert "$TMP/scan.png" -crop 1200x1080+400+0 +repage -resize 1000x -quality 78 "$OUT/photo-nfc-scan.webp"
# Finder liest die Daten auf dem Handy
convert "$TMP/tap.png"  -crop 1200x1080+400+0 +repage -resize 1000x -quality 78 "$OUT/photo-finder-reads.webp"
# Open-Graph-Bild 1200x630
convert "$TMP/tag.png"  -crop 1920x1008+0+36  +repage -resize 1200x630! -quality 82 "$OUT/og-bag-tag.jpg"

# Kurzer, leichter Clip (statt 25 MB) + Poster
ffmpeg -loglevel error -y -i "$SRC" -an -vf "scale=1280:-2" -c:v libx264 -preset veryfast -crf 30 -movflags +faststart -pix_fmt yuv420p "$OUT/bag-tag-demo-720p.mp4"
convert "$TMP/scan.png" -resize 1280x -quality 78 "$OUT/bag-tag-demo-poster.webp"

rm -rf "$TMP"
ls -la "$OUT"
