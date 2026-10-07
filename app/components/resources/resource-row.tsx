import { H3, Mono, P } from "../typography";
import type { Resource } from "./resource-data";

/**
 * Resource row — the Figma's `Row / Resource` (11:242) on desktop and
 * `Row / Resource / Mobile` (17:475) below `md`.
 *
 * "Entire row is a link. Underline the title on hover and show a visible
 * keyboard focus outline." (the component's own Figma note). So the anchor is
 * the row: one tab stop, and the global `:focus-visible` outline draws around
 * the whole thing. The title underline is always present but transparent, and
 * only its colour changes on hover / keyboard focus, so nothing shifts.
 *
 * Desktop: a 200px category column, the copy, and a 40px ↗ column, 32px apart,
 * vertically centred, 28px top and bottom, hairline beneath.
 * Mobile: the category sits above the copy, 24px apart. The mobile frame drops
 * the ↗; it is kept here, small, on the category line, because every row
 * opens a new tab and the arrow is the only thing that says so to a sighted
 * reader.
 */
export function ResourceRow({
  resource,
  categoryLabel,
}: {
  resource: Resource;
  categoryLabel: string;
}) {
  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noreferrer"
      className="group border-border grid grid-cols-[minmax(0,1fr)_auto] gap-y-md border-b py-7 md:grid-cols-[200px_minmax(0,1fr)_40px] md:items-center md:gap-x-8"
    >
      <Mono className="col-start-1 row-start-1">{categoryLabel}</Mono>

      {/* A div, not a span: it holds an h3 and a p, which phrasing content can't. */}
      <div className="col-span-2 row-start-2 flex flex-col gap-xs md:col-span-1 md:col-start-2 md:row-start-1">
        <H3 className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-current group-focus-visible:decoration-current">
          {resource.title}
        </H3>
        <P tone="muted">{resource.description}</P>
      </div>

      <span
        aria-hidden="true"
        className="font-display col-start-2 row-start-1 justify-self-end text-[20px] leading-[18px] font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:col-start-3 md:justify-self-start md:text-[28px] md:leading-[34px]"
      >
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
