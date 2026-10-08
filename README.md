# lcsc.ca

The Langara Computer Science Club website. Next.js 16 (App Router), React 19, Tailwind CSS v4, deployed to Cloudflare Workers through [vinext](https://github.com/cloudflare/vinext).

Design source: the "LCSC — Website Redesign" Figma file (`Mz8EZY4bLAD9anqC3UgMuV`). Read the ground rules below before changing anything.

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

- `app/<route>/page.tsx`: one file per page (`/`, `/build`, `/events`, `/projects`, `/resources`, `/join`), plus `app/not-found.tsx`.
- `app/components/`: the shared pieces. `page-shell.tsx` is the frame every page renders (skip link, nav, `main`, footer); `site-nav` and `site-footer`; `page-intro`; `program-card`; `text-link.tsx` (inline links, button links and the new-tab cue); and `typography.tsx` (every text role and the button tones). Page sections live in `app/components/<page>/`.
- `app/components/ui/`: Magic UI's theme toggler, vendored from the registry. Its one local change is marked LOCAL PATCH; re-apply it if the file is re-added.
- `app/hooks/`: `useReducedMotion` (follows the setting live) and `useMounted`.
- `app/site-config.ts`: every external URL (Luma, Discord, socials, club tools), the page list, the gutter and the shared band classes. Change links here, not in pages.
- `app/content/`: the copy and data the pages share: `programs.ts` (the Build cards), `projects.ts`, `resources.ts` and `past-events.ts`.
- `app/globals.css`: the Figma colour and spacing tokens, the shadcn aliases onto them, the derived dark theme and the print styles.
- `public/photos/`: real club photos (Langara Hacks and campus shots from the club's own sites and Drive), resized to WebP.

## Ground rules

- Luma (`luma.com/lcsc`) owns membership, events, dates, registration and the mailing list. Don't build event, registration, attendance or mailing-list systems here, and don't list upcoming dates on the site.
- Discord owns conversation and announcements. Copy sends people there to ask, share or find teammates.
- Don't invent club facts: dates, people, numbers, quotes. Use the Figma copy, the club's existing sites, or a visible TODO. Every past event in `app/content/past-events.ts` cites its source.
- Photos are real club photos only, never stock or generated.
- The nav and footer only link to routes that have a Figma frame.
- Corners are square, colours come from tokens in `globals.css`, and dark mode is the default.
