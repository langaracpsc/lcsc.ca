import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Typography — one definition per text ROLE, so the same role is never drawn
 * twice with slightly different numbers.
 *
 * Before this existed the app had four eyebrows (`10px` vs `11px`), five body
 * variants (`13px`/`15px`, `leading-[1.6]`/`[1.55]`, three different
 * `max-w`s), and three section headings that disagreed on weight. None of that
 * drift was a design decision; it was the natural result of typing Tailwind by
 * hand in five files. Each role below is the canonical version.
 *
 * ── Usage ──────────────────────────────────────────────────────────────────
 *
 *   import { H1, H2, P, Eyebrow, Micro } from "@/app/components/typography";
 *
 *   <Eyebrow>Your first stop</Eyebrow>
 *   <H1>You don't need to know it all.</H1>
 *   <P>You just need somewhere to start.</P>
 *
 * ── Role is independent of element ─────────────────────────────────────────
 * Every component takes `as`. The visual role and the semantic element are
 * different concerns: the Langara Hacks title on /events is an `<h3>` in the
 * outline but set at H2 size (`<H2 as="h3">`). Default elements are the
 * sensible ones, so most call sites never set it.
 *
 * ── Overriding ─────────────────────────────────────────────────────────────
 * `className` is merged with `cn`, which resolves Tailwind conflicts — so
 * `<P className="text-[13px]">` genuinely replaces the size rather than
 * emitting two competing `text-*` classes. Layout classes (`mt-*`, `max-w-*`)
 * are deliberately NOT baked into any role: spacing belongs to the layout that
 * places the text, not to the text itself, and pinning it here is how the
 * old `max-w-[46ch]`/`[52ch]`/`[62ch]` mess happened.
 *
 * ── Tone ───────────────────────────────────────────────────────────────────
 * Text colour is the one styling axis that legitimately varies per role AND
 * per surface (an eyebrow is brand-red on paper but paper-white on the dark
 * panel). It is a variant, not a hardcoded value, so a role keeps its size and
 * tracking while the surface picks the colour. `tone="inherit"` lets the
 * parent decide, which is what the dark panel wants.
 */

// ── Shared tone scale ────────────────────────────────────────────────────────

const TONE = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  brand: "text-brand",
  /** For text sitting on the dark `bg-panel` surface. */
  onDark: "text-paper",
  /** Softened text on the dark surface — the panel's own "muted". */
  onDarkMuted: "text-paper/70",
  /** Let the surrounding element decide. */
  inherit: "",
} as const;

type Tone = keyof typeof TONE;

// ── Roles ────────────────────────────────────────────────────────────────────

/**
 * Display heading. The only role set in the display face (Archivo); everything
 * else is IBM Plex Sans. Sized fluidly between 36px and 72px.
 */
const h1 = cva(
  "font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em]",
  { variants: { tone: TONE }, defaultVariants: { tone: "default" } }
);

/**
 * Section heading — the Figma's `LCSC / H2`: the display face, bold, 48/54 on
 * desktop and 32px on mobile, no tracking. Fluid between the two so it never
 * sits at an in-between size the design didn't draw.
 */
const h2 = cva(
  "font-display text-[clamp(2rem,3.33vw,3rem)] leading-[1.125] font-bold tracking-normal",
  { variants: { tone: TONE }, defaultVariants: { tone: "default" } }
);

/**
 * Sub-heading — the Figma's `LCSC / H3`: a card title, a resource row title,
 * a list item. The display face, bold: 28/34 on desktop, 24px on the mobile
 * frames, fluid in between.
 */
const h3 = cva(
  "font-display text-[clamp(1.5rem,1.95vw,1.75rem)] leading-[1.2] font-bold tracking-normal",
  { variants: { tone: TONE }, defaultVariants: { tone: "default" } }
);

/**
 * Small heading — a column heading, a group label in a list. The bottom of the
 * heading scale: one step under H3, one step over body, and the only heading
 * that is NOT fluid. It stays 15px on every viewport because it labels a
 * column rather than leading a section, and a column heading that grows with
 * the screen pulls away from the links beneath it.
 */
const h4 = cva("text-[15px] leading-[1.3] font-semibold tracking-[-0.01em]", {
  variants: { tone: TONE },
  defaultVariants: { tone: "default" },
});

/**
 * Body copy. `size` is the one axis body legitimately needs: `lead` for the
 * intro paragraph under a heading, `base` for ordinary prose, `small` for
 * notes and captions.
 */
// Each size carries its own leading: `cn` treats a later font-size class as
// overriding an earlier line-height, so a leading in the base would be
// dropped for any size that doesn't restate it.
const p = cva("", {
  variants: {
    tone: TONE,
    size: {
      /** Figma `Body large`: 20/30 on desktop, 18/27 on mobile. */
      lead: "text-[clamp(1.125rem,1.4vw,1.25rem)] leading-[1.5]",
      /** Figma `Body`: 16/25. */
      base: "text-[16px] leading-[25px]",
      small: "text-[13px] leading-[1.6]",
    },
  },
  defaultVariants: { tone: "default", size: "base" },
});

/**
 * Eyebrow — the small tracked uppercase label that sits above a heading.
 * ONE size. The old code had it at both 10px and 11px; 11px is canonical.
 */
const eyebrow = cva(
  "text-[11px] font-semibold tracking-[0.16em] uppercase",
  { variants: { tone: TONE }, defaultVariants: { tone: "brand" } }
);

/**
 * Micro — a tracked uppercase line used as a closing beat under a block, e.g.
 * "ALL EXPERIENCE LEVELS WELCOME". Smaller and wider-tracked than an eyebrow;
 * the two are different roles and should not be merged.
 */
const micro = cva(
  "text-[10px] font-semibold tracking-[0.18em] uppercase",
  { variants: { tone: TONE }, defaultVariants: { tone: "default" } }
);

/**
 * Mono — the Figma's `LCSC / Label`: IBM Plex Mono Medium 12/18, uppercase,
 * no tracking. Page eyebrows, card categories, card metadata lines and
 * closing notes are set in this.
 *
 * Not the same role as Eyebrow: Eyebrow is the sans, tracked label over the
 * home hero; Mono is the design's own label, used by every page built from
 * the Figma frames. Brand red by default, as in the Figma.
 */
const mono = cva("font-mono text-[12px] leading-[18px] font-medium uppercase", {
  variants: { tone: TONE },
  defaultVariants: { tone: "brand" },
});

/**
 * Button — a text role whose type is inseparable from its box. Padding,
 * background and hover are part of what makes it read as a button, so unlike
 * the prose roles it owns its own layout.
 *
 * `tone` follows the design's interaction rule, "red actions on light
 * surfaces, light actions on dark surfaces":
 *   primary  - the main action on a theme-following surface (red / paper)
 *   onDark   - the paper action on an always-dark band or the red strip
 *   contrast - ink on paper / paper on ink, the high-contrast secondary
 *   brand    - always red (the default)
 *
 * Text links (`hover:text-*` with no box) are NOT a Button. The nav link and
 * the footer link differ in size and weight for good reasons, so forcing them
 * into one role would just move the inconsistency somewhere harder to see.
 */
const button = cva(
  // The Figma `Button` component: one 52px box (24px sides, 15px top and
  // bottom, 15/22 bold) for every style. Only the colours vary by tone.
  "font-ui inline-block px-6 py-[15px] text-[15px] leading-[22px] font-bold whitespace-nowrap transition-colors",
  {
    variants: {
      tone: {
        /** `Style=Primary` — red action on a light surface. Hover is darker red. */
        brand: "bg-red hover:bg-red-hover text-white",
        /**
         * The primary action on a surface that FOLLOWS the theme. The Figma
         * draws the nav twice: on paper it carries the red `Style=Primary`
         * button, on ink the `Style=Light` one. This is that pair — red in light
         * mode, paper in dark — so the main action always obeys "red on light,
         * light on dark". Use it for the page's main action on `bg-background`.
         */
        primary:
          "bg-red hover:bg-red-hover text-white dark:bg-paper dark:hover:bg-line dark:text-ink",
        /** `Style=Light` — the high-contrast action on a surface that is always dark. */
        onDark: "bg-paper hover:bg-line text-ink",
        /**
         * The Light button for a surface that FOLLOWS the theme. In dark mode
         * this is paper on ink (`Style=Light`); in light mode it flips to ink
         * on paper (`Style=Dark`), so it stays the high-contrast action.
         */
        contrast: "bg-foreground hover:bg-muted-foreground text-background",
      },
    },
    defaultVariants: { tone: "brand" },
  }
);

/**
 * Small label — the club name lockup in the nav and footer (IBM Plex Mono
 * 10/15, read straight off the Figma text layer).
 */
const label = cva("font-mono text-[10px] leading-[15px] font-medium uppercase");

// ── Component factory ────────────────────────────────────────────────────────

type Variants<T extends (...args: never[]) => string> = VariantProps<T>;

/**
 * Builds a component from a cva role. `as` controls the element; `tone`
 * (and `size`, for P) control the visual variants; `className` merges last so
 * it always wins.
 */
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
export const H4 = role("h4", h4, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof h4>);
export const P = role("p", p, (r) => ({
  tone: r.tone as Tone | undefined,
  size: r.size as "lead" | "base" | "small" | undefined,
}) as Variants<typeof p>);
export const Eyebrow = role("p", eyebrow, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof eyebrow>);
export const Micro = role("p", micro, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof micro>);
export const Mono = role("p", mono, (r) => ({ tone: r.tone as Tone | undefined }) as Variants<typeof mono>);
export const Label = role("span", label, () => ({}) as Variants<typeof label>);

/**
 * The raw class builders. Use these where a role is needed on an element that
 * a component can't wrap — the main case is `next/link`, which needs its own
 * `href`/`prefetch` handling, so `<Link className={typography.button()}>` is
 * the idiom rather than a `<Button>` component.
 */
export const typography = { h1, h2, h3, h4, p, eyebrow, micro, mono, button, label } as const;
