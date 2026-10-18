# Manvendra — Portfolio

A personal portfolio website with a code-themed profile, filterable project showcase, skill charts, and an interactive "work in progress" page. Built with React, Vite, Tailwind CSS v4, and React Router.

---

## Links

> Replace the `YOUR_LINK_HERE` placeholders below with your actual URLs.

| | |
|---|---|
| **Live site** | `YOUR_LINK_HERE` |
| **Repository** | https://github.com/dev-manvendra/Portfolio |
| **Resume** | [`public/Resume.pdf`](public/Resume.pdf) |

---

## Tech stack

| Layer | Tools |
|---|---|
| UI | React 19, React Router 7 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Linting | ESLint 10 + React Hooks/React Refresh plugins |
| Deploy | Vercel (SPA rewrites via `vercel.json`) |

---

## Features

- **Profile** (`/`) — hero with a typewriter-style code block, stats bar, background cards, resume and social links.
- **Projects** (`/projects`) — featured + grid cards with stack filtering (tag chips), code and live-demo buttons.
- **Skills** (`/skills`) — grouped skill cards with animated level bars (1–4).
- **404 / WIP** (`*` and `/in-progress`) — a small memory card game that fills a fake "build progress" bar while content is being prepared.
- Sticky header with active-route nav, footer with social links, responsive layout, and `prefers-reduced-motion` support.

---

## Getting started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm 9+

### Install & run

```bash
git clone https://github.com/dev-manvendra/Portfolio.git
cd Portfolio
npm install
npm run dev
```

The app runs at `http://localhost:5173` with hot module replacement.

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

---

## Project structure

```
Portfolio/
├── index.html                # HTML entry
├── vite.config.js            # React + Tailwind plugins
├── eslint.config.js          # Lint rules (dist/ ignored)
├── vercel.json               # SPA rewrites for Vercel
├── public/
│   └── Resume.pdf            # Served at /Resume.pdf
└── src/
    ├── main.jsx              # Router config + entry
    ├── App.jsx               # Layout shell (Header + Outlet + Footer)
    ├── index.css             # Tailwind import, theme, utilities
    └── Components/
        ├── Header.jsx        # Brand + nav links
        ├── Footer.jsx        # Social links
        ├── Profile.jsx       # Home / profile page
        ├── Projects.jsx      # Projects page + filter
        ├── Skills.jsx        # Skills page
        └── Error.jsx         # 404 + work-in-progress game
```

### Routes

| Path | Component |
|---|---|
| `/` | `Profile` |
| `/projects` | `Projects` |
| `/skills` | `Skills` |
| `*` (any unknown) | `Error` (WIP) |
| `/in-progress` | `Error` (WIP) |

---

## Editing your content

All page content lives in plain data objects at the top of each component — no CMS needed:

| File | What to edit |
|---|---|
| `src/Components/Profile.jsx` → `PROFILE_DATA` | Name, role, bio, email, **social links**, resume URL, stats |
| `src/Components/Projects.jsx` → `PROJECTS_DATA` | Project title, description, stack, `code` and `demo` links |
| `src/Components/Skills.jsx` → `SKILLS_DATA` | Skill groups and levels (`1`–`4`) |
| `src/Components/Header.jsx` → `BRAND`, `NAV_LINKS` | Brand name and navigation items |
| `src/Components/Footer.jsx` → `SOCIALS` | Footer social links |

**Project link rule:** in `PROJECTS_DATA`, set `demo: "https://..."` for a live URL. Any value that is not an `https://` URL (e.g. `"in-progress"`) makes the button point to the WIP page instead.

---

## Deployment

Preconfigured for **Vercel**:

1. Import the repo in Vercel (framework preset: **Vite**).
2. Build command: `npm run build` · Output directory: `dist`.
3. `vercel.json` already rewrites all paths to `index.html` so client-side routes work on refresh.

Any static host works — deploy the `dist/` folder and ensure SPA fallback is enabled.

---

## License

Not specified — add a `LICENSE` file if you want to define one.
