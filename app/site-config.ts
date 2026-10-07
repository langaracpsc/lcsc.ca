export const SITE = {
  lumaCalendar: "https://lu.ma/lcsc",
  discordInvite: "https://discord.gg/TStBK3QRwG",
  email: "langaracompsciclub@gmail.com",
  instagram: "https://www.instagram.com/langaracpsc",
  github: "https://github.com/langaracpsc",
} as const;

/**
 * Real destinations the club already runs or links to, gathered from the
 * previous club site (github.com/langaracpsc/langaracpsc-next) and checked to
 * load on 2026-10-07.
 *
 * The old site still points at `*.langaracs.ca` hosts for the planner and the
 * courses API. Those no longer resolve; both tools now live on
 * langaracourses.ca, which is what is used here.
 */
export const LINKS = {
  /** The club rules, kept on the club's Notion. */
  rules:
    "https://langaracs.notion.site/LCSC-Rules-393da1457d784fa19c98d1d3c32ae829",
  /** Transfer guides compiled by Langara alumni. */
  transferInfo:
    "https://langaracs.notion.site/Transfer-Information-a0548da4b3084681868381310c604c34",
  /** The club's general feedback form. */
  feedbackForm: "https://forms.gle/jaYbdo6KWbGFvJJG8",
  coursePlanner: "https://langaracourses.ca",
  /** The API root serves its interactive (Scalar) docs page. */
  coursesApi: "https://api.langaracourses.ca",
  githubStudentPack: "https://education.github.com/pack",
  /** The club's repository for the Langara Hacks 2025 website. */
  langaraHacks2025: "https://github.com/langaracpsc/lhacks2025",
  langaraCs: "https://langara.ca/departments/computer-science",
} as const;

/**
 * The page gutter: the Figma's "80 / 24 px outer gutters" — 80px on the
 * 1440 desktop frame, 24px on the 390 mobile frame, fluid in between.
 *
 * Note this is the PAGE gutter. The nav does NOT use it — the nav component
 * specifies 56px of its own horizontal padding, which is a different value and
 * a common source of "why doesn't the nav line up" confusion.
 */
export const GUTTER = "px-[clamp(24px,5.56vw,80px)]";
