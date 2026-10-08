/** Production domain (confirmed 2026-10-08). */
export const ORIGIN = "https://lcsc.ca";

export const SITE = {
  // Luma moved from lu.ma to luma.com; the old host 301s here.
  lumaCalendar: "https://luma.com/lcsc",
  discordInvite: "https://discord.gg/TStBK3QRwG",
  email: "langaracompsciclub@gmail.com",
  instagram: "https://www.instagram.com/langaracpsc",
  github: "https://github.com/langaracpsc",
} as const;

/**
 * From the previous club site (github.com/langaracpsc/langaracpsc-next), checked
 * to load on 2026-10-07. Its `*.langaracs.ca` planner and API hosts no longer
 * resolve, so both point at langaracourses.ca.
 */
export const LINKS = {
  rules:
    "https://langaracs.notion.site/LCSC-Rules-393da1457d784fa19c98d1d3c32ae829",
  transferInfo:
    "https://langaracs.notion.site/Transfer-Information-a0548da4b3084681868381310c604c34",
  feedbackForm: "https://forms.gle/jaYbdo6KWbGFvJJG8",
  coursePlanner: "https://langaracourses.ca",
  /** The API root serves its interactive (Scalar) docs page. */
  coursesApi: "https://api.langaracourses.ca",
  githubStudentPack: "https://education.github.com/pack",
  langaraHacks2025: "https://github.com/langaracpsc/lhacks2025",
  /** Public (checked 2026-10-08) but unlicensed, so copy shouldn't call it "open source". */
  siteRepo: "https://github.com/langaracpsc/lcsc.ca",
  langaraCs: "https://langara.ca/departments/computer-science",
} as const;

/** The Figma's 80px on the 1440 frame and 24px on the 390 frame. */
export const GUTTER = "px-[clamp(24px,5.56vw,80px)]";

/** Same curve, capped at the Figma nav's 56px. */
export const NAV_GUTTER = "px-[clamp(24px,5.56vw,56px)]";

/**
 * Panel in dark mode, where the page is already ink. The ring is paper because
 * the light theme's red ring is under 3:1 on ink.
 */
export const INK_BAND = "bg-ink text-paper dark:bg-panel [--ring:var(--color-paper)]";

/** A red ring would vanish on the strip, so it is white. */
export const RED_STRIP = "bg-red text-white [--ring:var(--color-white)]";

/**
 * In nav order. The desktop nav shows the middle four (Join is its button); the
 * mobile menu and the footer show all six.
 */
export const PAGES = [
  { href: "/", label: "Home" },
  { href: "/build", label: "Build" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/join", label: "Join the club" },
] as const;
