"""Batch scrape our-wedding.link portofolio listing and individual pages.

1. Fetch API listing (or parse HTML)
2. For each invitation URL, scrape details
3. Output JSONL with all data needed for template generation.
"""
import json
import re
import sys
import time
import urllib.request
import urllib.error

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}


def fetch(url: str, timeout: int = 30) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=timeout).read().decode("utf-8", "replace")


def extract_json_from_html(html: str) -> dict:
    """Extract window.__NUXT__ state from HTML."""
    # Try to find the IIFE pattern
    m = re.search(r"window\.__NUXT__\s*=\s*\(function\([^)]+\)\{return[^}]+}\)\(([^)]+)\)", html, re.S)
    if not m:
        # Fallback: try simpler pattern
        m = re.search(r"window\.__NUXT__\s*=\s*(\{.+?\});\s*</script>", html, re.S)
    
    if m:
        # The state is minified JS, extract key string values we need
        state_raw = m.group(0)
        
        # Extract couple names
        groom_name = re.search(r'couple_male_complete_name\s*[:=]\s*"([^"]+)"', state_raw)
        bride_name = re.search(r'couple_female_complete_name\s*[:=]\s*"([^"]+)"', state_raw)
        groom_calling = re.search(r'male_calling_name\s*[:=]\s*"([^"]+)"', state_raw)
        bride_calling = re.search(r'female_calling_name\s*[:=]\s*"([^"]+)"', state_raw)
        
        # Extract wedding date
        wedding_date = re.search(r'wedding_date\s*[:=]\s*"([^"]+)"', state_raw)
        
        # Extract location
        location = re.search(r'wedding_location\s*[:=]\s*"([^"]+)"', state_raw)
        address = re.search(r'wedding_address\s*[:=]\s*"([^"]+)"', state_raw)
        
        # Extract template/preset
        template = re.search(r'template\s*[:=]\s*"([^"]+)"', state_raw)
        
        # Extract user_code (slug)
        user_code = re.search(r'user_code\s*[:=]\s*"([^"]+)"', state_raw)
        
        # Extract background image
        bg_welcome = re.search(r'background_welcome\s*[:=]\s*"([^"]+)"', state_raw)
        
        # Extract couple photos
        male_photo = re.search(r'couple_male_photo\s*[:=]\s*"([^"]+)"', state_raw)
        female_photo = re.search(r'couple_female_photo\s*[:=]\s*"([^"]+)"', state_raw)
        
        # Extract fonts
        font_title = re.search(r'font_title\s*[:=]\s*"([^"]+)"', state_raw)
        font_content = re.search(r'font_content\s*[:=]\s*"([^"]+)"', state_raw)
        
        return {
            "groom_name": groom_name.group(1) if groom_name else None,
            "bride_name": bride_name.group(1) if bride_name else None,
            "groom_calling": groom_calling.group(1) if groom_calling else None,
            "bride_calling": bride_calling.group(1) if bride_calling else None,
            "wedding_date": wedding_date.group(1) if wedding_date else None,
            "location": location.group(1) if location else None,
            "address": address.group(1) if address else None,
            "template": template.group(1) if template else None,
            "user_code": user_code.group(1) if user_code else None,
            "bg_welcome": bg_welcome.group(1) if bg_welcome else None,
            "male_photo": male_photo.group(1) if male_photo else None,
            "female_photo": female_photo.group(1) if female_photo else None,
            "font_title": font_title.group(1) if font_title else None,
            "font_content": font_content.group(1) if font_content else None,
        }
    return {}


def scrape_invitation(url: str) -> dict:
    """Scrape single invitation page."""
    try:
        html = fetch(url)
        
        # Title
        title = re.search(r"<title>([^<]+)</title>", html)
        
        # Description
        desc = re.search(r'name="description" content="([^"]+)"', html)
        
        # Extract all images
        images = sorted(set(re.findall(r"https://cdn-uploads\.owlink\.id/[a-f0-9-]+\.(?:jpe?g|png|gif)", html)))
        
        # Extract audio
        audio = re.findall(r"https://api\.our-wedding\.link/uploads/[^\"'\s]+\.mp3", html)
        
        # Extract CSS
        css_files = re.findall(r'https://cdn-uploads\.owlink\.id/css/[^"]+\.css[^"]*', html)
        
        # Extract state
        state = extract_json_from_html(html)
        
        # Sections from body
        nuxt = re.search(r'id="__nuxt">(.+?)<script', html, re.S)
        body = nuxt.group(1) if nuxt else ""
        sections = re.findall(r'id="([\w-]+)"', body)
        
        # Text snippets
        texts = re.findall(r"<(?:h1|h2|h3|p|button)[^>]*>([^<]{2,200})<", body)
        
        return {
            "url": url,
            "title": title.group(1) if title else None,
            "description": desc.group(1) if desc else None,
            "sections": sections[:20],
            "images": images,
            "audio": audio[:2],
            "css_files": css_files[:3],
            "texts": [t.strip() for t in texts if t.strip()][:50],
            **state,
        }
    except Exception as e:
        return {"url": url, "error": str(e)}


def main():
    # Known preview URLs from manual collection or API discovery
    # The listing page is JS-rendered, so we'll try common patterns
    
    preview_codes = [
        "Jz6Z_zahra-recky",
        "0lhN_hendra-rika", 
        "J8Zg_jaewoung-cindy",
    ]
    
    # Try to extract more from the HTML if available
    try:
        listing_html = fetch("https://our-wedding.link/portofolio/preview")
        # Look for codes in various patterns
        found_codes = re.findall(r'/portofolio/preview/([A-Za-z0-9_-]+_[A-Za-z0-9_-]+)', listing_html)
        preview_codes.extend(found_codes)
    except:
        pass
    
    # Remove duplicates
    preview_codes = list(dict.fromkeys(preview_codes))
    
    print(f"Found {len(preview_codes)} preview codes", file=sys.stderr)
    
    results = []
    for code in preview_codes:
        url = f"https://our-wedding.link/{code}"
        print(f"Scraping: {url}", file=sys.stderr)
        data = scrape_invitation(url)
        results.append(data)
        time.sleep(0.5)  # Be polite
    
    print(json.dumps(results, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
