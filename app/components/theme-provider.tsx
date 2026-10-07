"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme provider — a thin client boundary around next-themes.
 *
 * next-themes writes the theme class onto <html> before paint via an inline
 * script, which is what stops a light flash on first load. It needs a client
 * component because it holds state, so the provider lives here and the root
 * layout (a server component) just wraps its children in it.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
