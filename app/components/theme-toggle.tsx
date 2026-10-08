"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "../hooks/use-mounted";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

/**
 * Controlled by next-themes so one thing owns the theme. Dark until mounted to
 * match the server's default; resolvedTheme because theme can be "system".
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  const theme = !mounted || resolvedTheme === "dark" ? "dark" : "light";

  // The server sends an ink theme-color for the dark default. The toggle
  // remounts with every page's nav, so this keeps the toolbar in sync everywhere.
  useEffect(() => {
    if (!resolvedTheme) return;
    const meta = document.querySelector('meta[name="theme-color"]');
    const token = resolvedTheme === "light" ? "--color-paper" : "--color-ink";
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(token)
      .trim();
    if (meta && color) meta.setAttribute("content", color);
  }, [resolvedTheme]);

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      // The wipe uses the Web Animations API, which the global reduced-motion
      // CSS can't reach.
      duration={reducedMotion ? 0 : 400}
      // Named for the setting, with aria-pressed as its value. Unset until
      // mounted because the server can't know the theme.
      aria-label="Dark mode"
      aria-pressed={mounted ? theme === "dark" : undefined}
      className={className}
    />
  );
}
