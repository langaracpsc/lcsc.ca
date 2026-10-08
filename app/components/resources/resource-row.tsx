import { H3, Mono, P } from "../typography";
import type { Resource } from "../../content/resources";
import { NEW_TAB_TEXT } from "../text-link";

/**
 * Figma 11:242 (mobile 17:475). The whole row is the link, as the Figma notes,
 * named by its title and new-tab text rather than every line. The mobile frame
 * drops the arrow; it stays because it's the only visible new-tab cue.
 */
export function ResourceRow({
  resource,
  categoryLabel,
}: {
  resource: Resource;
  categoryLabel: string;
}) {
  const ids = {
    title: `resource-${resource.id}-title`,
    description: `resource-${resource.id}-description`,
    cue: `resource-${resource.id}-cue`,
  };
  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noreferrer"
      aria-labelledby={`${ids.title} ${ids.cue}`}
      aria-describedby={ids.description}
      className="group border-border grid grid-cols-[minmax(0,1fr)_auto] gap-y-md border-b py-7 md:grid-cols-[200px_minmax(0,1fr)_40px] md:items-center md:gap-x-8"
    >
      <Mono className="col-start-1 row-start-1">{categoryLabel}</Mono>

      {/* A div, not a span: phrasing content can't hold the h3 and p. */}
      <div className="col-span-2 row-start-2 flex flex-col gap-xs md:col-span-1 md:col-start-2 md:row-start-1">
        <H3
          id={ids.title}
          className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-current group-focus-visible:decoration-current group-active:decoration-current"
        >
          {resource.title}
        </H3>
        <P id={ids.description} tone="muted">
          {resource.description}
        </P>
      </div>

      <span
        aria-hidden="true"
        className="font-display col-start-2 row-start-1 justify-self-end text-[20px] leading-[18px] font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:col-start-3 md:justify-self-start md:text-[28px] md:leading-[34px]"
      >
        ↗
      </span>
      <span id={ids.cue} className="sr-only">
        {NEW_TAB_TEXT}
      </span>
    </a>
  );
}
