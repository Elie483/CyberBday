# Cyber Birthday Firewall

A mobile-first, cyber-themed birthday web app with a security awareness twist. Built with vanilla HTML, CSS, and JavaScript—no frameworks, no tracking, no backend.

## Live Demo

- **Birthday mode:** `index.html` or `https://yourusername.github.io/repo-name/`
- **Professional mode:** `index.html?mode=professional` or `demo.html`

## Features

- Terminal-style typing effect with blinking cursor, random delays, glitch chars
- Matrix-style falling characters background (theme-aware)
- Confetti celebration on access granted (+ Easter egg: type "cake")
- Success beep + typing clicks with mute toggle (M key)
- Web Speech API greeting: "Happy Birthday Elie Ishimwe! Stay curious and secure."
- Cyber tips carousel in footer (educational)
- Profile image reveal with neon glow
- Theme toggle (Dark/Light) with localStorage persistence
- Two modes: Birthday (personal) and Professional (client-facing)
- Fully responsive, WCAG-compliant (44px touch targets)
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

- **Primary:** ishiel.HEIC (Safari). Fallbacks: profile.jpg, elie.jpeg, 123.HEIC

## Privacy

- No data collected
- No cookies
- No analytics
- No external requests

## License

MIT

---

**Built by Elie Ishimwe** | Cybersecurity Enthusiast | Blue Team 🛡️
