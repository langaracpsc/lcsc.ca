import type { ReactNode } from "react";
import { H1, Mono, P } from "./typography";
import { GUTTER } from "../site-config";

/** Figma build / Intro and its siblings. title is a node so it can carry a <br />. */
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
      className={`${GUTTER} border-border flex flex-col gap-md border-b py-lg md:pt-18 md:pb-16`}
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
