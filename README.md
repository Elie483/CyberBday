# Cyber Birthday Firewall

A mobile-first, cyber-themed birthday web app with a security awareness twist. Built with vanilla HTML, CSS, and JavaScript—no frameworks, no tracking, no backend.

## Live Demo

- **Birthday mode:** `index.html` or `https://yourusername.github.io/repo-name/`
- **Professional mode:** `index.html?mode=professional` or `demo.html`

## Features

- Terminal-style typing effect with blinking cursor
- Matrix-style falling characters background
- Confetti celebration on access granted
- Success beep with mute toggle (M key)
- Cyber tips carousel (educational)
- Profile image reveal
- Two modes: Birthday (personal) and Professional (client-facing)
- Fully responsive, viewport-optimized
- Mobile audio support (unlocks on first tap)

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- No dependencies, no build step
- Client-side only

## Project Structure

```
├── index.html          # Entry point
├── demo.html           # Redirects to professional mode
├── css/
│   └── style.css       # Styles
├── js/
│   └── script.js       # Application logic
├── assets/
│   ├── images/         # Profile images
│   │   ├── ishiel.HEIC
│   │   ├── elie.jpeg
│   │   └── 123.HEIC
│   └── audio/          # Optional: success-beep.mp3
├── .gitignore
├── .nojekyll
├── LICENSE
└── README.md
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. **Settings** → **Pages** → **Source**: Deploy from branch
3. **Branch:** `main` (or `master`), **Folder:** `/ (root)`
4. Save

Your site will be at `https://<username>.github.io/<repo>/`

## Local Development

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Open `http://localhost:8080`

## Image Notes

- **HEIC** (ishiel.HEIC): Works in Safari (iOS/macOS). Other browsers fall back to elie.jpeg
- For best compatibility, add `profile.jpg` or use `elie.jpeg` in `assets/images/`

## Privacy

- No data collected
- No cookies
- No analytics
- No external requests

## License

MIT

---

**Built by Elie Ishimwe** | Cybersecurity Enthusiast | Blue Team 🛡️
