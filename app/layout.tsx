import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { RouteAnnouncer } from "./components/route-announcer";
import "./globals.css";

/**
 * The Figma file states its type stack explicitly:
 *   "TYPE / Space Grotesk · DM Sans · IBM Plex Mono"
 *
 * Two faces are substituted, by decision rather than by accident:
 *   - Display: Space Grotesk is one of the most recognisable
 *     AI-generated-site tells, so Archivo (a variable grotesque built for
 *     display work, same geometric-grotesque role) stands in for it.
 *   - Body/UI: IBM Plex Sans in place of DM Sans, so the body sits in the
 *     same family as the design's own mono labels.
 * IBM Plex Mono is used exactly as the design specifies.
 *
 * NOTE: `shadcn init` adds a Geist import here and points `--font-sans` at it.
 * That was removed deliberately — Geist is not in this design's stack, and
 * leaving it in silently replaced the body font across the whole site.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/** UI and body — the design's `LCSC/Button` and body text are set in this. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

/** The nav's club name: IBM Plex Mono Medium 10px / 15px, letter-spacing 0. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Each route exports its own `title`; the template turns "Build" into
  // "Build | Langara Computer Science Club". The home page uses the default.
  title: {
    default: "Langara Computer Science Club",
    template: "%s | Langara Computer Science Club",
  },
  description:
    "A student-run computer science club at Langara College. All experience levels welcome.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning is required here: next-themes sets the theme
    // class on <html> in a pre-paint script, so the server and client markup
    // legitimately differ on that one attribute.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          defaultTheme="dark" — dark is the site's default, not the visitor's OS
          preference. `enableSystem` is kept so a stored "system" value still
          resolves if one is ever set, but it no longer decides the first paint:
          next-themes only falls back to the OS when defaultTheme is "system".

          An explicit toggle still wins and persists, so this sets the default
          rather than forcing anything.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <RouteAnnouncer />
        </ThemeProvider>
      </body>
    </html>
  );
}
