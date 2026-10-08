import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { BuildPrograms } from "../components/build/build-programs";
import { FirstSession } from "../components/build/first-session";

const DESCRIPTION =
  "Build Nights are drop-in sessions where you work on your own project. Build Labs are guided workshops.";

// Search results and link previews show the title without the site around
// it, where the nav label "Build" says nothing.
export const metadata: Metadata = {
  title: "Build Nights and Build Labs",
  description: DESCRIPTION,
  alternates: { canonical: "/build" },
};

/** Figma "Build / Desktop" (7:81) and "Build / Mobile" (15:386). */
export default function Build() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="The Build Series"
        title="Build Nights and Build Labs"
        description={DESCRIPTION}
      />
      <BuildPrograms />
      <FirstSession />
    </PageShell>
  );
}
