"""
Einmaliger Codemod für app/(marketing)/**/page.tsx:
 - <main> der Seiten → <div> (das Layout stellt bereits <main>)
 - Emojis aus Texten entfernen (✓ ✔ ✗ ✘ ✕ ★ ☆ bleiben – sie tragen Bedeutung)
 - echte Bilder (<ContentFigure>) und Story-Zeitleiste (<StoryBridge>) einfügen
 - tote Links korrigieren (bag-tag.de/de#shop, /en/contact)
Idempotent: bereits umgebaute Dateien werden nicht doppelt geändert.
"""
import re
import sys
from pathlib import Path

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else '.') / 'app' / '(marketing)'
SHOP = 'https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc'
KEEP = set('✓✔✗✘✕★☆')
# (Emoji-Muster siehe strip_emoji)


def strip_emoji(text: str) -> str:
    # Emoji samt Variation-Selector/ZWJ und genau einem folgenden Leerzeichen
    # entfernen – sonst nichts anfassen.
    pattern = re.compile(r'[\U0001F000-\U0001FAFF☀-➿⭐⭕⌚⌛⏩-⏺][️‍]* ?')

    def repl(m):
        return m.group(0) if m.group(0)[0] in KEEP else ''

    return pattern.sub(repl, text)


def insert_after_tldr_or_intro(src: str, snippet: str) -> str:
    m = re.search(r'<TldrSection\b', src)
    if m:
        close_self = src.find('/>', m.end())
        close_tag = src.find('</TldrSection>', m.end())
        candidates = [(close_self, 2), (close_tag, len('</TldrSection>'))]
        candidates = [c for c in candidates if c[0] != -1]
        pos, ln = min(candidates)
        # Bei Self-Closing sicherstellen, dass das '/>' zum TldrSection gehört
        return src[: pos + ln] + '\n\n' + snippet + src[pos + ln :]
    h1 = src.find('</h1>')
    if h1 != -1:
        p_end = src.find('</p>', h1)
        pos = p_end + 4 if p_end != -1 and p_end - h1 < 1500 else h1 + 5
        return src[:pos] + '\n\n' + snippet + src[pos:]
    return src


def insert_bridge(src: str, snippet: str) -> str:
    for marker in ('<RelatedLinksSection', '<CtaSection'):
        i = src.find(marker)
        if i != -1:
            line_start = src.rfind('\n', 0, i) + 1
            line = src[line_start:i]
            indent = line[: len(line) - len(line.lstrip())]
            return src[:line_start] + indent + snippet + '\n\n' + src[line_start:]
    i = src.rfind('</article>')
    if i != -1:
        line_start = src.rfind('\n', 0, i) + 1
        return src[:line_start] + '          ' + snippet + '\n' + src[line_start:]
    return src


def add_imports(src: str) -> str:
    imports = (
        "import StoryBridge from '@/app/components/content/StoryBridge';\n"
        "import ContentFigure from '@/app/components/content/ContentFigure';\n"
    )
    # Ende des letzten import-Statements finden
    idx = 0
    for m in re.finditer(r"^import[\s\S]*?from\s+['\"][^'\"]+['\"];?\s*$", src, flags=re.M):
        idx = m.end()
    return src[:idx] + '\n' + imports + src[idx:]


changed = 0
for page in sorted(ROOT.rglob('page.tsx')):
    rel = '/' + page.parent.relative_to(ROOT).as_posix()
    src = page.read_bytes().decode('utf-8')
    orig = src
    src = re.sub(r'<main(\s)', r'<div\1', src)
    src = src.replace('</main>', '</div>')
    src = strip_emoji(src)
    # Nach dem Entfernen leere Icon-Container (z. B. <span className="text-2xl mr-4"></span>) löschen
    src = re.sub(r'[ \t]*<(span|div) className="[^"]*">\s*</\1>\r?\n?', '', src)
    src = src.replace('"https://bag-tag.de/de#shop"', f'"{SHOP}"')
    src = src.replace('"/en/contact"', '"/en/help"')
    if 'StoryBridge' not in src:
        src = add_imports(src)
        src = insert_after_tldr_or_intro(src, f'          <ContentFigure path="{rel}" />')
        src = insert_bridge(src, f'<StoryBridge path="{rel}" />')
    if src != orig:
        page.write_bytes(src.encode('utf-8'))
        changed += 1
        print('✓', rel)
print(changed, 'Dateien geändert')
