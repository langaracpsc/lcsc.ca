"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

/**
 * Adapted from Magic UI's Dia Text Reveal, minus `motion` (about 45 KB gzipped
 * for one gradient tween). The server renders the first phrase fully drawn so
 * it shows without JavaScript.
 */

const BAND_HALF = 17;
const SWEEP_START = -BAND_HALF;
const SWEEP_END = 100 + BAND_HALF;

const sweepEase = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

function buildGradient(pos: number, colors: readonly string[], textColor: string) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;
  if (bandStart >= 100) return `linear-gradient(90deg, ${textColor}, ${textColor})`;

  const n = colors.length;
  const parts: string[] = [];
  if (bandStart > 0) parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);
  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2;
    parts.push(`${c} ${pct.toFixed(2)}%`);
  });
  if (bandEnd < 100) parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`);
  return `linear-gradient(90deg, ${parts.join(", ")})`;
}

export function DiaTextReveal({
  text,
  colors,
  textColor = "var(--foreground)",
  duration = 1.5,
  hold = 0.5,
  className = "",
}: {
  text: readonly string[];
  colors: readonly string[];
  textColor?: string;
  /** Seconds. */
  duration?: number;
  /** Seconds. */
  hold?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();
  /** Starts fully drawn to match the server render. */
  const posRef = useRef(SWEEP_END);
  const count = text.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paint = (pos: number) => {
      posRef.current = pos;
      el.style.backgroundImage = buildGradient(pos, colors, textColor);
    };
    if (reducedMotion) {
      paint(SWEEP_END);
      return;
    }
    if (!inView || count < 2) return;

    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const sweep = () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        paint(SWEEP_START + (SWEEP_END - SWEEP_START) * sweepEase(t));
        if (t < 1) frame = requestAnimationFrame(step);
        else timer = setTimeout(next, hold * 1000);
      };
      frame = requestAnimationFrame(step);
    };
    // Swap while the band is still ahead of the text, so the change is invisible.
    const next = () => {
      paint(SWEEP_START);
      setIndex((i) => (i + 1) % count);
      sweep();
    };

    // A phrase that is already drawn (the server's, or one reduced motion
    // stopped on) is held, not swept again.
    if (posRef.current >= SWEEP_END) timer = setTimeout(next, hold * 1000);
    else sweep();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [inView, reducedMotion, count, colors, textColor, duration, hold]);

  return (
    // Print drops the gradient so the text falls back to the heading colour.
    <span
      ref={ref}
      className={`inline-block -translate-y-0.5 whitespace-nowrap text-transparent print:bg-none! print:text-inherit ${className}`}
      style={{
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        backgroundImage: buildGradient(SWEEP_END, colors, textColor),
      }}
    >
      {text[index]}
    </span>
  );
}
