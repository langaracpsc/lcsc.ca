import type { ReactNode } from "react";
import { H2, Mono, P } from "../typography";
import { GUTTER, SITE } from "../../site-config";
import { cn } from "@/lib/utils";
import { TextLink } from "../text-link";

/**
 * The checklist, from the Figma's "First session checklist". Step 01 is
 * adapted: the Figma says "Find the next session in Discord.", but sessions
 * are listed (and registered) on Luma, so that is where it points.
 */
const STEPS: { n: string; text: ReactNode }[] = [
  {
    n: "01",
    text: (
      <>
        Find the next session on{" "}
        <TextLink href={SITE.lumaCalendar} className="font-semibold">
          Luma
        </TextLink>.
      </>
    ),
  },
  { n: "02", text: <>Bring what you&rsquo;re working on, or a question.</> },
  { n: "03", text: "Work on it with the people around you." },
];

/**
 * Build / First session — the Figma's always-dark band (10:166; mobile
 * 15:403). An introduction on the left (label, two-line H2, lead) and the
 * three-step checklist on the right.
 *
 * ── Surface ────────────────────────────────────────────────────────────────
 * Ink in light mode, as drawn. In dark mode the page itself is already ink,
 * so the band lifts to panel to stay a distinct band. Everything on it takes
 * its colour from the band (`text-paper`), so no child needs a dark: variant.
 * The focus ring is pointed at paper: the light-mode ring is red, which sits
 * under 3:1 on ink. The site footer is panel in both themes; in dark mode it
 * draws a hairline along its own top edge to keep the band and the footer
 * apart.
 *
 * ── Layout ─────────────────────────────────────────────────────────────────
 * Desktop: 80px padding, columns of 540 and 660 with 80px between them — the
 * 27fr/33fr split is that ratio, so the columns keep the Figma proportions at
 * any width from `lg` up. Below `lg` the columns stack with 24px between them,
 * as the mobile frame does; the padding is the mobile 48px on phones and the
 * desktop 80px from `md`, matching the programs section above. The checklist
 * steps are 32px apart on desktop and 24px on mobile.
 *
 * The step number and its text are separate flex items so a wrapped step
 * hangs under its own text rather than under the number.
 */
export function FirstSession() {
  return (
    <section
      aria-labelledby="first-session-heading"
      className={cn(
        GUTTER,
        "bg-ink text-paper dark:bg-panel grid gap-md py-12 [--ring:var(--color-paper)] md:py-xl lg:grid-cols-[27fr_33fr] lg:gap-xl"
      )}
    >
      <div className="flex flex-col gap-md">
        <Mono tone="onDark">First time?</Mono>
        <H2 id="first-session-heading" tone="inherit">
          Here&rsquo;s how your first session goes.
        </H2>
        <P size="lead" tone="inherit" className="max-w-[510px]">
          Come with a laptop and a question. A project can come later.
        </P>
      </div>

      <ol className="flex flex-col gap-md lg:gap-8">
        {STEPS.map((step) => (
          <P key={step.n} as="li" size="lead" tone="inherit" className="flex gap-sm">
            <span className="shrink-0 tabular-nums">{step.n}</span>
            <span>{step.text}</span>
          </P>
        ))}
      </ol>
    </section>
  );
}
