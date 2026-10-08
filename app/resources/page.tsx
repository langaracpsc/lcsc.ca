import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { H2 } from "../components/typography";
import { ResourceDirectory } from "../components/resources/resource-directory";
import { RESOURCES } from "../content/resources";
import { GUTTER } from "../site-config";

const DESCRIPTION =
  "Course planning and transfer guides, plus tools the club recommends.";

export const metadata: Metadata = {
  title: "Resources",
  description: DESCRIPTION,
  alternates: { canonical: "/resources" },
};

/** Figma "Resources / Desktop" (7:84) and "Resources / Mobile" (15:637). */
export default function Resources() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Resources"
        title="Useful links"
        description={DESCRIPTION}
      />

      {/* The rows are H3s, so a hidden H2 keeps the outline in order. The
          Figma has no visible heading here. */}
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
