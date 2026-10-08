import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma "LCSC /" text styles. No margins, so each caller owns its spacing.

const TONE = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  brand: "text-brand",
  /** For surfaces that stay dark in both themes. */
  onDark: "text-paper",
  onDarkMuted: "text-paper/70",
  inherit: "",
} as const;

type Tone = keyof typeof TONE;

/**
 * 11.28vw below 390px so a 12-letter word fits at 320. wrap-break-word stops a
 * longer word (or wider user text spacing) from scrolling the page sideways.
 */
const h1 = cva(
  "font-display text-[clamp(2.25rem,min(11.28vw,calc(2.1rem+2.667vw)),4.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance wrap-break-word",
  { variants: { tone: TONE }, defaultVariants: { tone: "default" } }
);

const h2 = cva(
  "font-display text-[clamp(2rem,3.33vw,3rem)] leading-[1.125] font-bold tracking-normal text-balance wrap-break-word",
  { variants: { tone: TONE }, defaultVariants: { tone: "default" } }
);

const h3 = cva(
  "font-display text-[clamp(1.5rem,1.95vw,1.75rem)] leading-[1.2] font-bold tracking-normal text-balance wrap-break-word",
  { variants: { tone: TONE }, defaultVariants: { tone: "default" } }
);

// Each size restates its leading: cn lets a later font-size class drop an
// earlier line-height, so a leading in the base would be lost.
const p = cva("", {
  variants: {
    tone: TONE,
    size: {
      /** Figma Body large. */
      lead: "text-[clamp(1.125rem,1.4vw,1.25rem)] leading-[1.5]",
      /** Figma Body. */
      base: "text-[16px] leading-[25px]",
      small: "text-[13px] leading-[1.6]",
    },
  },
  defaultVariants: { tone: "default", size: "base" },
});

const micro = cva(
  "text-[10px] font-semibold tracking-[0.18em] uppercase",
  { variants: { tone: TONE }, defaultVariants: { tone: "default" } }
);

/** Figma LCSC / Label. */
const mono = cva("font-mono text-[12px] leading-[18px] font-medium uppercase", {
  variants: { tone: TONE },
  defaultVariants: { tone: "brand" },
});

/** Figma Button text. nav-client.tsx repeats these classes by hand, so change both. */
const UI = "font-ui text-[15px] leading-[22px] font-bold";
const ui = cva(UI);

/**
 * Hover is repeated as active: because Tailwind's hover: only applies on
 * hover-capable devices. Forced colors drop the background, so a border keeps
 * the button from reading as plain text.
 */
const button = cva(
  `${UI} inline-block px-6 py-[15px] whitespace-nowrap transition-colors forced-colors:border forced-colors:border-[ButtonText]`,
  {
    variants: {
      tone: {
        /** Figma Style=Primary, red in both themes. */
        brand: "bg-red hover:bg-red-hover active:bg-red-hover text-white",
        /** For theme-following surfaces: red in light, paper in dark. */
        primary:
          "bg-red hover:bg-red-hover active:bg-red-hover text-white dark:bg-paper dark:hover:bg-line dark:active:bg-line dark:text-ink",
        /** Figma Style=Light, for always-dark bands and the red strip. */
        onDark: "bg-paper hover:bg-line active:bg-line text-ink",
        /** One hover with no dark: pair, so the /resources chips can override it with a plain hover:. */
        contrast:
          "bg-foreground hover:bg-foreground/85 active:bg-foreground/85 text-background",
      },
    },
    defaultVariants: { tone: "brand" },
  }
);

const label = cva("font-mono text-[10px] leading-[15px] font-medium uppercase");

type Variants<T extends (...args: never[]) => string> = VariantProps<T>;

/** className merges last, so a caller's classes beat the role's. */
function role<E extends keyof React.JSX.IntrinsicElements, V>(
  defaultElement: E,
  variants: (props: V) => string,
  pickVariants: (props: Record<string, unknown>) => V
) {
  type Props = React.ComponentPropsWithoutRef<E> &
    V & { as?: keyof React.JSX.IntrinsicElements };

  return function Role({ as, className, ...rest }: Props) {
    const Tag = (as ?? defaultElement) as React.ElementType;
    const picked = pickVariants(rest as Record<string, unknown>);
    // Strip the variant keys so they don't land on the DOM element.
    const domProps = Object.fromEntries(
      Object.entries(rest).filter(([k]) => !(k in (picked as object)))
    );
    return <Tag className={cn(variants(picked), className)} {...domProps} />;
  };
}

export const H1 = role("h1", h1, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof h1>);
export const H2 = role("h2", h2, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof h2>);
export const H3 = role("h3", h3, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof h3>);
export const P = role("p", p, (r) => ({
  tone: r.tone as Tone | undefined,
  size: r.size as "lead" | "base" | "small" | undefined,
}) as Variants<typeof p>);
export const Micro = role("p", micro, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof micro>);
export const Mono = role("p", mono, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof mono>);
export const Label = role("span", label, () => ({}) as Variants<typeof label>);

/** For elements a role can't wrap, such as next/link and <button>. */
export const typography = { h1, h2, h3, p, micro, mono, ui, button, label } as const;
