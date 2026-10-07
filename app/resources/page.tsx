import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { H2 } from "../components/typography";
import { ResourceDirectory } from "../components/resources/resource-directory";
import { RESOURCES } from "../components/resources/resource-data";
import { GUTTER } from "../site-config";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Course planning and transfer guides, plus tools the club recommends.",
};

/**
 * /resources — the Figma's `Resources / Desktop` (7:84) and
 * `Resources / Mobile` (15:637): the page intro, then the directory.
 *
 * The route owns the composition; the directory (search, filter chips and
 * the six resource rows) lives in `components/resources/`, and is the only
 * client component on the page.
 */
export default function Resources() {
  return (
    <PageShell>
      {/* `resources / Intro` (8:147), in plainer words. */}
      <PageIntro
        eyebrow="Your head start"
        title="Links worth bookmarking."
        description="Course planning and transfer guides, plus tools the club recommends."
      />

      {/*
        `Resources / Directory` (11:218): 80px top and bottom on desktop, 48px
        on mobile. The Figma draws no heading here, but the rows are H3s, so a
        visually hidden H2 keeps the outline in order (H1 → H2 → H3).
      */}
      <section
        aria-labelledby="resource-directory-heading"
        className={`${GUTTER} py-lg md:py-xl`}
      >
        <H2 id="resource-directory-heading" className="sr-only">
          Resource directory
        </H2>
        <ResourceDirectory resources={RESOURCES} />
      </section>
    </PageShell>
  );
}
