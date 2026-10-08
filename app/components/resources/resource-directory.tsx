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
} from "../../content/resources";

type Filter = "all" | ResourceCategory;

const FILTERS: readonly { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...RESOURCE_CATEGORIES,
];

const LABELS = Object.fromEntries(
  RESOURCE_CATEGORIES.map((c) => [c.id, c.label])
) as Record<ResourceCategory, string>;

/** A typed straight apostrophe should match the copy's curly one. */
const normalize = (s: string) => s.toLowerCase().replace(/[‘’]/g, "'");

// The pressed chip (Figma Style=Dark) keeps its fill on hover since it's
// already selected. Forced colors drop fills, so it uses SelectedItem there.
const chip = (pressed: boolean) =>
  cn(
    typography.button({ tone: "contrast" }),
    pressed
      ? "hover:bg-foreground active:bg-foreground forced-colors:forced-color-adjust-none forced-colors:bg-[SelectedItem] forced-colors:text-[SelectedItemText]"
      : "text-foreground hover:bg-secondary active:bg-secondary bg-transparent"
  );

/**
 * Figma 11:218. The server render holds every row so the list works without
 * JavaScript. Filters are local state only, not kept in the URL or storage.
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

  // One live region that stays mounted so every change is announced; it
  // doubles as the visible empty state.
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
    // The button unmounts with the empty state, so focus would drop to the page.
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-md lg:gap-8">
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
          {/* Greyscale on Chrome's native clear button, which is drawn in an
              off-palette blue. */}
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
