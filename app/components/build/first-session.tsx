import type { ReactNode } from "react";
import { H2, Mono, P } from "../typography";
import { GUTTER, INK_BAND, SITE } from "../../site-config";
import { TextLink } from "../text-link";

/** Step 01 says Luma, not the Figma's Discord: sessions are listed there. */
const STEPS: { n: string; text: ReactNode }[] = [
  {
    n: "01",
    text: (
      <>
        Find the next session on{" "}
        <TextLink href={SITE.lumaCalendar} tone="inherit">
          Luma
        </TextLink>.
      </>
    ),
  },
  { n: "02", text: "Bring a laptop, plus a project or a question if you have one." },
  { n: "03", text: "Work on it with the people around you." },
];

/**
 * Figma 10:166 (mobile 15:403). 27fr/33fr is the frame's 540:660 split. Step
 * numbers are separate so wrapped text hangs, and aria-hidden because the
 * `<ol>` already numbers the steps.
 */
export function FirstSession() {
  return (
    <section
      aria-labelledby="first-session-heading"
      className={`${GUTTER} ${INK_BAND} grid gap-md py-lg md:py-xl lg:grid-cols-[27fr_33fr] lg:gap-xl`}
    >
      <div className="flex flex-col gap-md">
        <Mono tone="onDark">New here</Mono>
        <H2 id="first-session-heading" tone="inherit">
          Your first session
        </H2>
        <P size="lead" tone="inherit" className="max-w-[510px]">
          You don&rsquo;t need a project yet.
        </P>
      </div>

      <ol className="flex flex-col gap-md lg:gap-8">
        {STEPS.map((step) => (
          <P key={step.n} as="li" size="lead" tone="inherit" className="flex gap-sm">
            <span aria-hidden="true" className="shrink-0 tabular-nums">
              {step.n}
            </span>
            <span>{step.text}</span>
          </P>
        ))}
      </ol>
    </section>
  );
}
