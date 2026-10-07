import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { ProjectsDirectory } from "../components/projects/directory";
import { ProjectsContribute } from "../components/projects/contribute";

/** The intro's lead; it doubles as the meta description. */
const DESCRIPTION =
  "Free tools for Langara students. Use them, or help improve them.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
};

/**
 * Projects route — the Figma's `Projects / Desktop` (7:83) and
 * `Projects / Mobile` (15:552): intro, directory, contribute strip.
 *
 * The route owns the composition only; each section's copy and layout notes
 * live in its own file under `components/projects/`.
 */
export default function Projects() {
  return (
    <PageShell>
      {/* `projects / Intro` (8:123), in plainer words. */}
      <PageIntro
        eyebrow="Built by the community"
        title="Things the club has built."
        description={DESCRIPTION}
      />
      <ProjectsDirectory />
      <ProjectsContribute />
    </PageShell>
  );
}
