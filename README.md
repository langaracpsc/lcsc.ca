# lcsc.ca

The Langara Computer Science Club website. Next.js 16 (App Router), React 19, Tailwind CSS v4, deployed to Cloudflare Workers through [vinext](https://github.com/cloudflare/vinext).

Design source: the "LCSC — Website Redesign" Figma file (`Mz8EZY4bLAD9anqC3UgMuV`). Working notes and decisions live in `.context/` — read the newest handoff there before changing anything.

## Develop

```bash
pnpm install
pnpm run dev:vinext      # http://localhost:3001 (the Workers runtime, as deployed)
pnpm run lint
pnpm run build:vinext    # production build into dist/
```

`pnpm dev` (plain `next dev`) also works for quick UI work, but `dev:vinext` is what matches production.

Wrangler and Miniflare write logs and a registry under `%APPDATA%\xdg.config\.wrangler`. If that directory isn't writable (sandboxed shells), point them somewhere that is:

```bash
XDG_CONFIG_HOME="$TEMP/lcsc-xdg" pnpm run dev:vinext
```

## Where things are

- `app/<route>/page.tsx` — one file per page: `/`, `/build`, `/events`, `/projects`, `/resources`, `/join`.
- `app/components/` — the shared shell (`site-nav`, `site-footer`), `page-intro`, `program-card`, and `typography.tsx` (every text role and the button tones). Page-specific sections live in `app/components/<page>/`.
- `app/components/ui/` — vendored Magic UI components (theme toggler, text reveal). Registry-managed; don't hand-edit.
- `app/site-config.ts` — every external URL (Luma, Discord, socials, club tools). Change links here, not in pages.
- `app/content/` — shared copy (the Build program cards).
- `app/globals.css` — Figma colour and spacing tokens, the shadcn aliases onto them, and the derived dark theme.
- `public/photos/` — real club photos (Langara Hacks and campus shots from the club's own sites), resized to WebP.

## Ground rules

- Luma (`lu.ma/lcsc`) owns membership, events, registration and the mailing list. Don't build event, registration, attendance or mailing-list systems here.
- Don't invent club facts — dates, people, numbers, quotes. Use the Figma copy, the club's existing sites, or a visible TODO.
- Corners are square; colours come from tokens in `globals.css`; dark mode is the default.
