"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

/** No-op subscribe: `mounted` flips once, on hydration, and never again. */
const subscribe = () => () => {};

/**
 * True after hydration, false during SSR — without a setState-in-effect, which
 * `react-hooks/set-state-in-effect` (correctly) rejects. React provides exactly
 * this discriminator: the server snapshot is `false`, the client snapshot `true`.
 */
function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

/**
 * Theme toggle — Magic UI's `AnimatedThemeToggler` driven by next-themes.
 *
 * The toggler is used in its CONTROLLED mode (`theme` + `onThemeChange`) rather
 * than letting it own the theme. Uncontrolled it writes to localStorage under a
 * plain `theme` key and mutates the <html> class directly, which would race with
 * next-themes doing the same thing. Handing it next-themes' resolved value keeps
 * one owner of the theme state.
 *
 * The `mounted` gate is load-bearing, not ceremony. `resolvedTheme` is undefined
 * during SSR, so the server renders the "light" branch — the Moon icon — while
 * the client's first render sees the real theme and renders the Sun. Those two
 * markups disagree, and React reports a hydration mismatch, throws away the
 * server tree and re-renders the whole page on the client. Holding the light
 * branch until after mount makes the first client render match the server
 * exactly, and the correct icon then arrives as an ordinary state update.
 *
 * Reading `resolvedTheme` rather than `theme` matters too: `theme` is "system"
 * when following the OS, which matches neither branch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      // The circular wipe is a 400ms full-screen animation run through the
      // Web Animations API, which the global reduced-motion CSS can't reach.
      // With reduced motion on, the switch is instant.
      duration={reducedMotion ? 0 : 400}
      // A toggle button: its name is the setting, its pressed state the value.
      // Unset until mounted, because the server can't know the theme.
      aria-label="Dark mode"
      aria-pressed={mounted ? theme === "dark" : undefined}
      className={className}
    />
  );
}
