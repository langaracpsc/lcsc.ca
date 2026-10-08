import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { ProjectsDirectory } from "../components/projects/directory";
import { ProjectsContribute } from "../components/projects/contribute";

const DESCRIPTION =
  "Free tools for Langara students. Use them, or help improve them.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
};

/** Figma "Projects / Desktop" (7:83) and "Projects / Mobile" (15:552). */
export default function Projects() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Projects"
        title="Things the club has built"
        description={DESCRIPTION}
      />
      <ProjectsDirectory />
      <ProjectsContribute />
    </PageShell>
  );
}
