import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RouteAnnouncer } from "./components/route-announcer";
import "./globals.css";

/**
 * The Figma's stack is Space Grotesk / DM Sans / IBM Plex Mono; Archivo and
 * Plex Sans stand in by choice. Keep out the Geist import `shadcn init` adds.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/** No 500: nothing sets sans text at Medium. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Langara Computer Science Club",
    template: "%s | Langara Computer Science Club",
  },
  description:
    "A student-run computer science club at Langara College. All experience levels welcome.",
  // Routes' titles and descriptions fill og:* and twitter:* on their own.
  // metadataBase, og:image, og:url, canonical and a sitemap wait for the
  // production domain; without metadataBase vinext writes localhost URLs.
  openGraph: {
    siteName: "Langara Computer Science Club",
    type: "website",
  },
};

/**
 * `--color-ink` as a literal, since a meta tag can't read CSS variables.
 * ThemeToggle switches it to paper when light is chosen.
 */
export const viewport: Viewport = {
  themeColor: "#181818",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `dark` is rendered by the server so the page is dark before any script
    // runs (or when none does). next-themes swaps it for a stored "light"
    // before paint; suppressHydrationWarning covers that difference.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} dark h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="flex min-h-full flex-col">
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
