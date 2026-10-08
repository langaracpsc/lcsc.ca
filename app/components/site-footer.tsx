import { P, Label, Micro } from "./typography";
import { SITE, LINKS, GUTTER, PAGES } from "../site-config";
import { LcsMark } from "./lcs-mark";
import { DiscordLogo, GithubLogo, InstagramLogo, LumaLogo } from "./platform-logos";
import { NEW_TAB_TEXT, TextLink } from "./text-link";

const SOCIAL = [
  { href: SITE.instagram, label: "Instagram", Logo: InstagramLogo },
  { href: SITE.discordInvite, label: "Discord", Logo: DiscordLogo },
  { href: SITE.github, label: "GitHub", Logo: GithubLogo },
  { href: SITE.lumaCalendar, label: "Luma", Logo: LumaLogo },
];

// Resources goes last: its nowrap labels take a full row on phones, and last
// keeps reading order matching visual order at every width.
const COLUMNS: {
  heading: string;
  className?: string;
  links: readonly { href: string; label: string }[];
}[] = [
  { heading: "Pages", links: PAGES },
  {
    heading: "About",
    links: [
      { href: `mailto:${SITE.email}`, label: "Contact" },
      { href: LINKS.rules, label: "Club rules" },
      { href: "/projects#contribute", label: "Contribute" },
      { href: SITE.github, label: "GitHub" },
    ],
  },
  {
    heading: "Resources",
    className: "max-sm:col-span-2",
    links: [
      { href: LINKS.transferInfo, label: "Transfer information" },
      { href: LINKS.coursePlanner, label: "Course Planner" },
      { href: LINKS.coursesApi, label: "Courses API" },
      { href: LINKS.langaraCs, label: "Langara CS department" },
    ],
  },
];

// Paper, since red is 2.4:1 on the panel. min-h-6 gives a 24px target, and the
// li is flex so that box sets the row height and keeps the 28px pitch.
const LINK_CLASS =
  "inline-flex min-h-6 items-center text-[13px] font-semibold whitespace-nowrap underline-offset-4 transition-colors underline decoration-transparent decoration-2 hover:decoration-current active:decoration-current";

export function SiteFooter() {
  return (
    // In dark mode some pages end on a panel band, so a hairline keeps the
    // footer apart. The ring is paper because light red is under 3:1 here.
    <footer className="bg-panel text-paper dark:border-border [--ring:var(--color-paper)] dark:border-t">
      {/* Equal 1fr outer tracks at xl keep the socials at the page's centre
          whatever the sides' widths. */}
      <div
        className={`${GUTTER} flex flex-col gap-6 py-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start xl:grid-cols-[1fr_auto_1fr]`}
      >
        <div className="flex flex-col gap-md">
          <div className="flex items-center gap-4">
            <LcsMark variant="onDark" />
            <Label>
              Langara <br />
              Computer Science Club
            </Label>
          </div>
          {/* Wording follows Langara's own acknowledgement; snəw̓eyəɬ leləm̓
              ("house of teachings") is the college's Musqueam name, gifted in 2016.
              lang="hur" stops screen readers reading hən̓q̓əmin̓əm̓ as English. */}
          <P size="small" tone="onDarkMuted" className="max-w-[36ch]">
            The Langara Computer Science Club meets at{" "}
            <span lang="hur">snəw̓eyəɬ leləm̓</span> Langara College, on the
            unceded, traditional, ancestral, and present-day territory of the{" "}
            <span lang="hur">xʷməθkʷəy̓əm</span> (Musqueam) people, who have
            stewarded this land since time immemorial.
          </P>
        </div>
        {/* Hover is opacity because Luma's mark is a raster that can't be
            tinted. p-3 -m-3 makes a 44px target without moving the icon. */}
        <ul className="flex items-center gap-md xl:self-center" aria-label="Social">
          {SOCIAL.map(({ href, label, Logo }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label}${NEW_TAB_TEXT}`}
                className="text-paper -m-3 block p-3 opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100 active:opacity-100"
              >
                <Logo className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
        {/* One landmark: a nav per column read "Resources navigation", the
            same as the Resources page. */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-lg sm:grid-cols-[repeat(3,auto)] sm:justify-start lg:col-start-2 lg:row-start-1 lg:row-end-3 lg:justify-self-end xl:col-auto xl:row-auto"
        >
          {COLUMNS.map((column) => (
            <div key={column.heading} className={column.className}>
              <Micro as="h2" tone="onDark">
                {column.heading}
              </Micro>
              <ul className="mt-2 flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.label} className="flex">
                    <TextLink href={link.href} tone="inherit" className={LINK_CLASS}>
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
