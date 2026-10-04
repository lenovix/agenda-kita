"""Scraper undangan our-wedding.link → JSON.

Usage: python scripts/scrape_wedding.py https://our-wedding.link/J8Zg_jaewoung-cindy
Output: stdout JSON (section order, couple, dates, venue, images, colors, fonts).
"""
import json
import re
import sys
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")


def css_vars(css: str) -> dict:
    """Extract :root { --var: value } pairs."""
    out = {}
    for m in re.finditer(r"--([\w-]+)\s*:\s*([^;}]+)", css):
        out[m.group(1)] = m.group(2).strip()
    return out


def main() -> None:
    url = sys.argv[1].rstrip("/")
    html = fetch(url)

    title = re.search(r"<title>([^<]+)</title>", html)
    desc = re.search(r'name="description" content="([^"]+)"', html)

    # Body rendered content
    nuxt = re.search(r'id="__nuxt">(.+?)<script', html, re.S)
    body = nuxt.group(1) if nuxt else ""

    # Section ids in order
    sections = re.findall(r'id="(\w+)"', body)

    # All media URLs
    images = sorted(set(re.findall(r"https://cdn-uploads\.owlink\.id/[a-f0-9-]+\.(?:jpe?g|png|gif)", html)))
    audio = sorted(set(re.findall(r"https://api\.our-wedding\.link/uploads/[^\"'\s]+\.mp3", html)))

    # CSS files
    css_urls = re.findall(r'https://cdn-uploads\.owlink\.id/css/[^"]+\.css[^"]*', html)

    # Fetch main CSS (first one) for palette/fonts
    palette, fonts = {}, {}
    for cu in css_urls[:2]:
        try:
            css = fetch(cu)
            vars_ = css_vars(css)
            palette.update(vars_)
            for m in re.finditer(r"font-family:\s*['\"]?([\w\s-]+)['\"]?\s*;", css):
                fonts[m.group(1).strip()] = True
        except Exception:
            pass

    # window.__NUXT__ state (may be minified IIFE)
    nuxt_state = re.search(r"window\.__NUXT__\s*=\s*(.+?);\s*</script>", html, re.S)
    state_raw = nuxt_state.group(1)[:20000] if nuxt_state else ""

    # Extract key text snippets from body
    texts = re.findall(r"<(?:h1|h2|h3|p|button)[^>]*>([^<]{2,200})<", body)

    result = {
        "url": url,
        "title": title.group(1) if title else None,
        "description": desc.group(1) if desc else None,
        "sections": sections,
        "images": images,
        "audio": audio,
        "css_files": css_urls,
        "palette": palette,
        "fonts": list(fonts.keys())[:20],
        "texts": [t.strip() for t in texts if t.strip()][:80],
        "state_raw_snippet": state_raw[:8000],
    }
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
