# Self-Hosted Fonts

This directory contains self-hosted font files for **99 Roots Studio**, making the website fully GDPR-compliant by avoiding Google Fonts CDN.

## Font Files Required

You need to download and place the following `.woff2` font files in this directory:

### Space Mono
- `space-mono-regular.woff2` (Weight: 400)
- `space-mono-bold.woff2` (Weight: 700)

### Roboto
- `roboto-light.woff2` (Weight: 300)
- `roboto-regular.woff2` (Weight: 400)
- `roboto-medium.woff2` (Weight: 500)
- `roboto-bold.woff2` (Weight: 700)

### Bebas Neue
- `bebas-neue-regular.woff2` (Weight: 400)
- `bebas-neue-bold.woff2` (Weight: 700)

## How to Get the Font Files

### Option 1: Google Webfonts Helper (Recommended)
1. Visit: https://gwfh.mranftl.com/fonts
2. Search for "Space Mono" and download the required weights
3. Search for "Roboto" and download the required weights
4. Search for "Bebas Neue" and download the required weights
5. Extract the `.woff2` files and place them in this directory

## File Structure

```
/public/fonts/
├── README.md (this file)
├── space-mono.css (font-face declarations)
├── roboto.css (font-face declarations)
├── bebas-neue.css (font-face declarations)
├── space-mono-regular.woff2
├── space-mono-bold.woff2
├── roboto-light.woff2
├── roboto-regular.woff2
├── roboto-medium.woff2
├── roboto-bold.woff2
├── bebas-neue-regular.woff2
└── bebas-neue-bold.woff2
```

## GDPR Compliance

By self-hosting these fonts, you:
- ✅ Avoid transferring user IP addresses to Google
- ✅ Don't need cookie consent for fonts
- ✅ Comply with German GDPR regulations
- ✅ Improve page load performance (no external DNS lookup)

## License

Both fonts are open-source and free for commercial use:
- **Space Mono**: SIL Open Font License 1.1
- **Roboto**: Apache License 2.0
- **Bebas Neue**: SIL Open Font License 1.1