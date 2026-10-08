import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { JoinStart } from "../components/join/join-start";
import { JoinQuestions } from "../components/join/join-questions";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Membership is free. Sign up on the club’s Luma calendar, then say hi in Discord. All experience levels welcome.",
};

/** Figma "Join / Desktop" (7:85) and "Join / Mobile" (15:743). */
export default function Join() {
  return (
    <PageShell>
      {/* The Figma's label and note; the approved title is the second half
          of the frame's own two-line title. */}
      <PageIntro
        eyebrow="Membership"
        title="Somewhere to start."
        description={
          <>
            Membership is free. Sign up on Luma, the club&rsquo;s event
            calendar, to get event emails. Then come say hi in Discord.
          </>
        }
        note="All experience levels welcome"
      />
      <JoinStart />
      <JoinQuestions />
    </PageShell>
  );
}
