import Link from "next/link";
import { P, Label, Micro } from "./typography";
import { SITE, LINKS, GUTTER } from "../site-config";
import { LcsMark } from "./lcs-mark";
import { DiscordLogo, GithubLogo, InstagramLogo, LumaLogo } from "./platform-logos";
import { linkKind } from "./text-link";

const SOCIAL = [
  { href: SITE.instagram, label: "Instagram", Logo: InstagramLogo },
  { href: SITE.discordInvite, label: "Discord", Logo: DiscordLogo },
  { href: SITE.github, label: "GitHub", Logo: GithubLogo },
  { href: SITE.lumaCalendar, label: "Luma", Logo: LumaLogo },
];

/**
 * The link columns. Every internal `href` here is a route that exists — the
 * footer never links to a page that would 404.
 *
 * Earlier versions linked to /blog, /contact, /rules, /contribute,
 * /suggested-courses and /langara-free-software, none of which has a frame in
 * the Figma. Rather than invent those pages, each label now goes somewhere
 * real: Contact is a mailto, Rules is the club's existing rules page on
 * Notion, and Contribute is the "Contribute" section of /projects. Blog,
 * Suggested Courses and Langara Free Software were dropped.
 */
const COLUMNS: {
  heading: string;
  links: { href: string; label: string }[];
}[] = [
  {
    heading: "Navigation",
    links: [
      { href: "/", label: "Home" },
      { href: "/build", label: "Build" },
      { href: "/events", label: "Events" },
      { href: "/projects", label: "Projects" },
      { href: "/resources", label: "Resources" },
      { href: "/join", label: "Join the club" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: LINKS.transferInfo, label: "Transfer Information" },
      { href: LINKS.coursePlanner, label: "Langara Course Planner" },
      { href: LINKS.coursesApi, label: "Langara Courses API" },
      { href: LINKS.langaraCs, label: "Langara Computer Science" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: `mailto:${SITE.email}`, label: "Contact" },
      { href: LINKS.rules, label: "Club Rules" },
      { href: "/projects#contribute", label: "Contribute" },
      { href: SITE.github, label: "GitHub" },
    ],
  },
];

const LINK_CLASS =
  "text-[13px] font-semibold whitespace-nowrap underline-offset-4 transition-colors underline decoration-transparent decoration-2 hover:decoration-red";

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  // Internal routes use next/link; web URLs open in a new tab and carry the
  // external icon. A mailto is neither: it hands off to the mail client, so it
  // gets no new tab and no icon.
  const kind = linkKind(href);
  if (kind === "internal") {
    return (
      <Link href={href} className={LINK_CLASS}>
        {label}
      </Link>
    );
  }
  if (kind === "mailto") {
    return (
      <a href={href} className={LINK_CLASS}>
        {label}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${LINK_CLASS} inline-flex items-center gap-1`}
    >
      {label}
      <ExternalIcon />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function SiteFooter() {
  return (
    // Panel in both themes. In dark mode the page is ink and the always-dark
    // bands that end some pages lift to panel too, so a dark-mode hairline on
    // the footer's top edge keeps it from merging with the section above.
    // `--ring` is pinned to paper: the light theme's red focus ring is under
    // 3:1 on the panel.
    <footer className="bg-panel text-paper dark:border-border [--ring:var(--color-paper)] dark:border-t">
      {/*
        Three-track grid from `xl` up. The outer tracks are equal `1fr`, so the
        `auto` middle track is centred on the screen no matter how wide the
        lockup or the link columns are. `justify-between` on a flex row can't do
        that: it splits the leftover space, so the middle item lands halfway
        between two unequal neighbours rather than at the page's centre.

        Below `xl` the three link columns don't fit in a 1fr track, so the
        footer stacks: lockup, socials, then the columns side by side.
      */}
      <div
        className={`${GUTTER} flex flex-col gap-6 py-8 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-start`}
      >
        <div className="flex flex-col gap-md">
          <div className="flex flex-row gap-6">
            <LcsMark variant="onDark" />
            <Label>
              Langara <br />
              Computer Science Club
            </Label>
          </div>
          {/*
            Land acknowledgement. The wording follows Langara's own: the college
            sits on Musqueam land and carries the Musqueam name snəw̓eyəɬ leləm̓
            ("house of teachings"), gifted in 2016. `lang="hur"` marks the
            hən̓q̓əmin̓əm̓ words so screen readers don't read them as English.
          */}
          <P size="small" tone="onDarkMuted" className="max-w-[36ch]">
            The Langara Computer Science Club meets at{" "}
            <span lang="hur">snəw̓eyəɬ leləm̓</span> Langara College, on the
            unceded, traditional, ancestral, and present-day territory of the{" "}
            <span lang="hur">xʷməθkʷəy̓əm</span> (Musqueam) people, who have
            stewarded this land since time immemorial.
          </P>
        </div>
        {/*
          Social links. Icon-only, so the accessible name lives on the anchor.

          The hover is an opacity step, not a colour step, because Luma's mark
          is a full-colour raster (there is no monochrome version) and can't be
          tinted like the three SVGs. Dimming to 70% and back reads the same as
          the footer's onDarkMuted → onDark move on a flat panel, and treats all
          four the same. `xl:self-center` floats the row to the vertical middle
          of the band while the lockup and columns stay top-aligned.
        */}
        <ul className="flex items-center gap-md xl:self-center" aria-label="Social">
          {SOCIAL.map(({ href, label, Logo }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="text-paper block opacity-70 transition-opacity hover:opacity-100"
              >
                <Logo className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-lg sm:grid-cols-[repeat(3,auto)] sm:justify-start sm:gap-12 xl:justify-self-end">
          {COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-labelledby={`footer-${column.heading.toLowerCase()}`}
            >
              <Micro as="h2" id={`footer-${column.heading.toLowerCase()}`} tone="onDark">
                {column.heading}
              </Micro>
              <ul className="mt-2 flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
