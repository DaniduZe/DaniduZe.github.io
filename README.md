# Danidu Sennath — Engineering Portfolio

[![Deploy Portfolio to GitHub Pages](https://github.com/DaniduZe/DaniduZe.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/DaniduZe/DaniduZe.github.io/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live-daniduze.github.io-C6F432?style=flat&labelColor=0A0A0A)](https://daniduze.github.io/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white&labelColor=0A0A0A)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white&labelColor=0A0A0A)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white&labelColor=0A0A0A)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white&labelColor=0A0A0A)](https://tailwindcss.com/)

Personal engineering portfolio of **Danidu Sennath Kawudupitiya** — Software, IoT, Robotics & AI Engineer.

> *"I don't just write code; I bring devices to life."*

**Live Site:** [https://daniduze.github.io/](https://daniduze.github.io/)

---

## Highlights

- **Interactive ASCII Portrait:** Custom canvas-rendered portrait in the hero section.
- **Project Case-Study Drawer:** Filterable portfolio across IoT, Embedded Systems, Autonomous Robotics, AI, and Full-Stack Software with interactive architecture breakdowns and KPIs.
- **Capabilities Bento Grid & Journey Timeline:** Structured engineering disciplines, technology stack, and academic/professional milestones.
- **Zero-Backend Inquiry Builder:** Instant clipboard email copy and structured `mailto:` inquiry composer with no third-party tracking or form servers.
- **Accessible & Motion-Aware:** Respects `prefers-reduced-motion` via Framer Motion's `<MotionConfig reducedMotion="user">` and supports full keyboard navigation (including `Esc` dismissal for drawers and menus).

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18 + TypeScript 5.7 |
| **Build Tool** | Vite 6 (`@vitejs/plugin-react`) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Animation** | Framer Motion 11 |
| **Icons** | Lucide React |
| **Typography** | Space Grotesk & JetBrains Mono |
| **Deployment** | GitHub Pages via GitHub Actions (OIDC) |

---

## Project Structure

```text
.
├── .github/
│   ├── workflows/deploy.yml   # Automated CI/CD build, audit, and GitHub Pages deploy
│   └── dependabot.yml         # Weekly automated npm & GitHub Actions security updates
├── public/
│   ├── projects/              # Project showcase thumbnails
│   ├── Danidu-Sennath-Resume.pdf
│   ├── favicon.svg
│   ├── portrait-head.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/            # UI sections (Hero, AsciiPortrait, ProjectsSection, CaseStudyDrawer, etc.)
│   ├── data/                  # Strongly-typed profile, projects, capabilities, and timeline data
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html                 # Meta tags, Open Graph/Twitter cards, and CSP headers
├── package.json
├── SECURITY.md
└── vite.config.ts
```

---

## Local Development

### Prerequisites

- **Node.js** `>= 20` (CI runs Node 22)
- **npm** `>= 10`

### Commands

```bash
# Install dependencies cleanly from package-lock.json
npm ci

# Start local development server
npm run dev

# Type-check and build production bundle to ./dist
npm run build

# Preview production build locally
npm run preview
```

---

## Security & Deployment Architecture

- **OIDC GitHub Pages Deployment:** Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs `npm ci`, `npm audit --audit-level=high`, and `npm run build` before deploying `./dist` using least-privilege OIDC permissions (`contents: read`, job-scoped `pages: write` and `id-token: write`). No Personal Access Tokens or secrets are stored.
- **Content Security Policy (CSP) & Referrer Policy:** Strict `<meta>` CSP and `strict-origin-when-cross-origin` referrer headers are enforced in `index.html`, with production sourcemaps disabled in `vite.config.ts`.
- **Link Hardening:** External `target="_blank"` links enforce `rel="noopener noreferrer"`.
- **Automated Patching:** Dependabot monitors both `npm` dependencies and GitHub Actions weekly.
- **Responsible Disclosure:** See [SECURITY.md](./SECURITY.md).

---

## Contact

- **Website:** [daniduze.github.io](https://daniduze.github.io/)
- **GitHub:** [@DaniduZe](https://github.com/DaniduZe)
- **LinkedIn:** [in/danidu-sennath](https://www.linkedin.com/in/danidu-sennath)
- **Email:** danidusennath@gmail.com
