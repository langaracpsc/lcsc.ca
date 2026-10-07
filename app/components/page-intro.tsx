import type { ReactNode } from "react";
import { H1, Mono, P } from "./typography";
import { GUTTER } from "../site-config";

/**
 * Page intro — the block every inner page opens with in the Figma
 * (`build / Intro`, `events / Intro`, `projects / Intro`, `resources / Intro`,
 * `join / Intro`), followed by the full-bleed hairline divider those frames
 * draw beneath it.
 *
 * Desktop: 72px top, 64px bottom, 24px between the four lines; the
 * description is capped at the frame's 760px text box. Mobile: 48px top and
 * bottom. The title is the display H1, so it scales with the same clamp as
 * every other H1 on the site.
 *
 * `title` takes a node so a two-line title can carry its own `<br />`, which
 * is how the Figma sets them ("Make progress. / Together.").
 */
export function PageIntro({
  eyebrow,
  title,
  description,
  note,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  note?: string;
}) {
  return (
    <section
      className={`${GUTTER} border-border flex flex-col gap-md border-b pt-12 pb-12 md:pt-18 md:pb-16`}
    >
      <Mono>{eyebrow}</Mono>
      <H1 className="max-w-[1000px]">{title}</H1>
      <P size="lead" tone="muted" className="max-w-[760px]">
        {description}
      </P>
      {note ? <Mono tone="default">{note}</Mono> : null}
    </section>
  );
}
