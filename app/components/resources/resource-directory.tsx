"use client";

import { useId, useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { P, typography } from "../typography";
import { ResourceRow } from "./resource-row";
import {
  RESOURCE_CATEGORIES,
  type Resource,
  type ResourceCategory,
} from "./resource-data";

type Filter = "all" | ResourceCategory;

const FILTERS: readonly { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...RESOURCE_CATEGORIES,
];

const LABELS = Object.fromEntries(
  RESOURCE_CATEGORIES.map((c) => [c.id, c.label])
) as Record<ResourceCategory, string>;

/** Case-insensitive, and a typed straight apostrophe matches the copy's ’. */
const normalize = (s: string) => s.toLowerCase().replace(/[‘’]/g, "'");

/*
  The Figma `Button` box (52px, 24px sides, 15/22 bold). The pressed chip is
  `Style=Dark` — ink on paper — which in dark mode has to flip to paper on ink
  to stay the high-contrast one: that is exactly the `contrast` tone. The
  others are `Style=Light`, which on a paper ground is just the label; they get
  a faint fill on hover so they still read as buttons. The pressed chip keeps
  its fill on hover — it is already the selection, so it shouldn't look like
  it is changing.
*/
const chip = (pressed: boolean) =>
  cn(
    typography.button({ tone: "contrast" }),
    pressed
      ? "hover:bg-foreground"
      : "text-foreground hover:bg-secondary bg-transparent"
  );

/**
 * The search box, filter chips and list of `Resources / Directory` (11:218).
 *
 * The only client component on the page: it receives the rows from the
 * server page, and the server render contains all six of them, so the list
 * works with JavaScript off — the controls just don't filter until it loads.
 *
 * Filtering is local state, nothing more: no URL syncing, no storage.
 */
export function ResourceDirectory({
  resources,
}: {
  resources: readonly Resource[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  const q = normalize(query.trim());
  const visible = resources.filter(
    (r) =>
      (filter === "all" || r.category === filter) &&
      (!q ||
        normalize(`${r.title} ${r.description} ${LABELS[r.category]}`).includes(q))
  );
  const empty = visible.length === 0;
  const filterLabel = filter === "all" ? null : LABELS[filter];

  // One persistent polite live region. It reads the result count while there
  // are results (visually hidden) and becomes the visible empty state when
  // there are none.
  const status = empty
    ? query.trim()
      ? `No resources match “${query.trim()}”${filterLabel ? ` in ${filterLabel}` : ""}.`
      : `No ${filterLabel ? `${filterLabel} ` : ""}resources to show.`
    : visible.length === resources.length
      ? `Showing all ${resources.length} resources.`
      : `Showing ${visible.length} of ${resources.length} resources.`;

  const reset = () => {
    setQuery("");
    setFilter("all");
    // The reset button unmounts with the empty state; put focus somewhere
    // useful instead of letting it fall back to the page.
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-md lg:gap-8">
      {/* ── Search and filters ── */}
      <div className="flex flex-col gap-xs lg:flex-row lg:items-start lg:gap-sm">
        <div className="relative w-full lg:max-w-[570px] lg:flex-1">
          <label htmlFor={searchId} className="sr-only">
            Search resources
          </label>
          <Search
            aria-hidden="true"
            strokeWidth={2.25}
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-3.5 -translate-y-1/2"
          />
          {/* Chrome draws the native clear (×) in its own blue, which the
              palette doesn't have; greyscale keeps the control, off-brand
              colour removed (grey on white, white on panel). */}
          <input
            ref={inputRef}
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources"
            autoComplete="off"
            spellCheck={false}
            className="bg-card text-card-foreground border-muted-foreground placeholder:text-muted-foreground hover:border-foreground w-full appearance-none border py-4 pr-4 pl-10 text-[16px] leading-[25px] transition-colors [&::-webkit-search-cancel-button]:[filter:grayscale(1)]"
          />
        </div>

        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-xs lg:gap-sm"
        >
          {FILTERS.map((f) => {
            const pressed = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(f.id)}
                className={chip(pressed)}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results ── */}
      <div>
        <div
          className={empty ? "border-border border-y py-lg" : undefined}
        >
          <P
            role="status"
            aria-live="polite"
            className={empty ? undefined : "sr-only"}
          >
            {status}
          </P>
          {empty ? (
            <button
              type="button"
              onClick={reset}
              className={typography.button({
                tone: "primary",
                className: "mt-md",
              })}
            >
              Show all resources
            </button>
          ) : null}
        </div>

        {empty ? null : (
          <ul>
            {visible.map((r) => (
              <li key={r.id}>
                <ResourceRow resource={r} categoryLabel={LABELS[r.category]} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
