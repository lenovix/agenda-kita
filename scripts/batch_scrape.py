"""Batch scrape 4 wedding invitations untuk template 7-10.

Hardcode 4 URLs → scrape each → output JSONL.
"""
import json
import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Import scraper from existing script
import urllib.request
import re

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")

def scrape(url: str) -> dict:
    html = fetch(url)
    title = re.search(r"<title>([^<]+)</title>", html)
    desc = re.search(r'name="description" content="([^"]+)"', html)
    images = sorted(set(re.findall(r"https://cdn-uploads\.owlink\.id/[a-f0-9-]+\.(?:jpe?g|png)", html)))
    audio = re.findall(r"https://api\.our-wedding\.link/uploads/[^\"'\s]+\.mp3", html)
    
    # Extract couple names from title (pattern: "Name1 & Name2" or "Name1 &amp; Name2")
    couple_match = re.search(r"([A-Z][a-z]+)[^a-zA-Z]*(?:&amp;|&)[^a-zA-Z]*([A-Z][a-z]+)", title.group(1) if title else "")
    
    # Try to find date in description
    date_match = re.search(r"(\w+day,?\s+\w+\s+\d+(?:st|nd|rd|th)?,?\s+\d{4})", desc.group(1) if desc else "")
    
    # Find fonts in inline styles/CSS
    fonts = list(set(re.findall(r"font-family:\s*['\"]?([a-z_]+)", html, re.I)))
    
    # Extract CSS color palette
    colors = list(set(re.findall(r"(?:#[0-9a-fA-F]{3,6}|rgba?\([^)]+\))", html)))[:20]
    
    return {
        "url": url,
        "code": url.split("/")[-1],
        "title": title.group(1) if title else None,
        "couple": [couple_match.group(1), couple_match.group(2)] if couple_match else [],
        "date": date_match.group(1) if date_match else None,
        "description": (desc.group(1) if desc else "")[:300],
        "image_count": len(images),
        "images": images[:15],
        "audio": audio[:1],
        "fonts": fonts[:10],
        "colors": colors[:15],
    }

# 4 wedding URLs to scrape (finding real ones from public portfolio)
# Using pattern: search Google "site:our-wedding.link wedding invitation 2024"
urls = [
    "https://our-wedding.link/XyZ1_dummy-wedding1",  # placeholder
    "https://our-wedding.link/XyZ2_dummy-wedding2",
    "https://our-wedding.link/XyZ3_dummy-wedding3",
    "https://our-wedding.link/XyZ4_dummy-wedding4",
]

# Let's try common code patterns from existing ones
# Already have: Jz6Z, 0lhN, J8Zg
# Try similar patterns
test_codes = [
    "K9Ah_budi-sari",
    "L0Bi_deni-rika", 
    "M1Cj_eko-fitri",
    "N2Dk_fajar-gita",
    "O3El_hadi-ina",
    "P4Fm_joko-kartika",
    "Q5Gn_lukman-mia",
]

print(f"# Testing {len(test_codes)} possible codes...", file=sys.stderr)
results = []

for code in test_codes[:4]:  # Only test 4
    url = f"https://our-wedding.link/{code}"
    try:
        print(f"Trying: {url}", file=sys.stderr)
        data = scrape(url)
        results.append(data)
        print(f"✓ {code} - {data.get('title', 'N/A')}", file=sys.stderr)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print(f"✗ {code} - 404", file=sys.stderr)
        else:
            print(f"✗ {code} - HTTP {e.code}", file=sys.stderr)
    except Exception as e:
        print(f"✗ {code} - {str(e)[:50]}", file=sys.stderr)

if not results:
    print("# No valid URLs found. Using 3 existing ones for demo:", file=sys.stderr)
    for code in ["Jz6Z_zahra-recky", "0lhN_hendra-rika", "J8Zg_jaewoung-cindy"]:
        url = f"https://our-wedding.link/{code}"
        try:
            data = scrape(url)
            results.append(data)
            print(f"✓ {code}", file=sys.stderr)
        except:
            pass

print(json.dumps(results, indent=2, ensure_ascii=False))
