import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { BuildPrograms } from "../components/build/build-programs";
import { FirstSession } from "../components/build/first-session";

/** The intro's lead; it doubles as the meta description. */
const DESCRIPTION =
  "Two kinds of sessions: Build Nights for working on your own project, and Build Labs for learning something new in a guided workshop.";

export const metadata: Metadata = {
  title: "Build",
  description: DESCRIPTION,
};

/**
 * /build — the Figma's "Build / Desktop" (7:81) and "Build / Mobile"
 * (15:386): the intro, the three Build programs with the schedule notice, and
 * the first-session band.
 *
 * The route file owns the composition only; each section lives in
 * `components/build/`.
 */
export default function BuildPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="The Build Series"
        title="Build things alongside other students."
        description={DESCRIPTION}
        note="Bring a laptop"
      />
      <BuildPrograms />
      <FirstSession />
    </PageShell>
  );
}
