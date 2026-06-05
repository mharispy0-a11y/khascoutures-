# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Warning: Non-standard Next.js

This project uses **Next.js 16.2.7** with React 19. APIs, conventions, and file structure may differ from your training data. Check `node_modules/next/dist/docs/` before writing code that touches routing, data fetching, or rendering modes.

## Commands

```powershell
npm run dev       # dev server → http://localhost:3000
npm run build     # production build (static export, all 6 routes)
npm run start     # serve production build
eslint            # lint (no --fix flag in this eslint config)
```

## Architecture

**App Router** — all pages live in `app/`, all reusable UI in `components/`.

- `app/layout.tsx` — root layout; mounts `Navbar`, `Footer`, `WhatsAppFAB` around every page
- `app/page.tsx` — landing page; composes homepage section components in order
- `app/globals.css` — the entire design system lives here (see below)
- `app/{about,collections,contact,gallery}/page.tsx` — four inner pages, all server components

All pages are statically generated (no `getServerSideProps`, no API routes, no database).

## Tailwind CSS v4 — critical difference

**There is no `tailwind.config.js`.** All theme tokens are declared in `app/globals.css` inside a `@theme {}` block:

```css
@import "tailwindcss";
@theme {
  --color-gold: #C9A84C;
  --font-display: var(--font-cormorant);
  /* … */
}
```

Tailwind utility classes like `text-gold`, `bg-charcoal`, `font-display` are derived from these CSS custom properties at build time. To add a new token, add it to `@theme` in `globals.css`.

## Brand design tokens

| Token | Value | Usage |
|-------|-------|-------|
| `gold` | `#C9A84C` | Primary accent, borders, icons |
| `gold-dark` | `#B8860B` | Hover states |
| `gold-light` | `#E8C97A` | Shimmer highlights |
| `ivory` | `#FAF6F0` | Page background |
| `charcoal` | `#2C2C2C` | Dark sections, text |
| `warm-white` | `#FFFDF8` | Card backgrounds |

Custom utility classes defined in `globals.css`: `.gold-shimmer`, `.ornamental-line`, `.card-hover`, `.animate-fadeInUp`, `.animate-floatUp`.

## Fonts

Loaded in `app/layout.tsx` via `next/font/google`:
- `--font-cormorant` → Cormorant Garamond (display/headings) — use `font-display` utility or `style={{ fontFamily: "var(--font-cormorant)" }}`
- `--font-inter` → Inter (body) — use `font-body` utility

## lucide-react caveat

The installed version (`^1.17.0`) **does not export `Instagram`**. Use the inline SVG component pattern already used in `Footer.tsx`, `ContactCTA.tsx`, and `contact/page.tsx`:

```tsx
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 …" />
    </svg>
  );
}
```

## Client vs Server components

Only `components/Navbar.tsx` uses `"use client"` (needs `useState`/`useEffect` for scroll and mobile menu). Everything else is a server component. Do not add `"use client"` unless the component requires browser APIs or React hooks.

## Placeholder values to replace before launch

- WhatsApp number: `923001234567` in `WhatsAppFAB.tsx`, `ContactCTA.tsx`, `contact/page.tsx`
- Form endpoint: `https://formspree.io/f/placeholder` in `contact/page.tsx`
- Gallery images: gradient placeholder `div`s in `gallery/page.tsx` and `GalleryPreview.tsx`
