import Link from "next/link";
import { H3, Mono, P, typography } from "./typography";
import { NewTabCue, linkKind } from "./text-link";
import type { Program } from "../content/programs";

/**
 * Figma 5:38, mobile 17:469. The whole card is the link, per the Figma notes, so
 * aria-labelledby names it by title and action instead of every line.
 */
export function ProgramCard({
  program,
  href,
}: {
  program: Program;
  href: string;
}) {
  const kind = linkKind(href);
  const ids = {
    title: `${program.id}-title`,
    description: `${program.id}-description`,
    action: `${program.id}-action`,
  };
  const linkProps = {
    className:
      "group bg-card text-card-foreground border-border hover:border-foreground focus-visible:border-foreground active:border-foreground flex h-full flex-col gap-5 border p-6 transition-colors md:gap-md md:p-8",
    "aria-labelledby": `${ids.title} ${ids.action}`,
    "aria-describedby": ids.description,
  };

  const body = (
    <>
      <Mono>{program.category}</Mono>
      <H3 id={ids.title}>{program.title}</H3>
      <P id={ids.description} tone="muted">
        {program.description}
      </P>
      {/* mt-auto lines up meta and action across a row whatever the description's length. */}
      <Mono tone="muted" className="mt-auto">
        {program.meta}
      </Mono>
      <span
        id={ids.action}
        className={typography.ui({
          className:
            "underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-current group-focus-visible:decoration-current group-active:decoration-current",
        })}
      >
        {program.action}
        {kind === "external" ? (
          <NewTabCue spaced />
        ) : kind === "internal" ? (
          <>
            &nbsp;&nbsp;<span aria-hidden="true">→</span>
          </>
        ) : null}
      </span>
    </>
  );

  if (kind === "internal") {
    return (
      <Link href={href} {...linkProps}>
        {body}
      </Link>
    );
  }
  return kind === "external" ? (
    <a href={href} target="_blank" rel="noreferrer" {...linkProps}>
      {body}
    </a>
  ) : (
    <a href={href} {...linkProps}>
      {body}
    </a>
  );
}
