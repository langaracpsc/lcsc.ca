import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { JoinStart } from "../components/join/join-start";
import { JoinQuestions } from "../components/join/join-questions";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Membership is free. Sign up on Luma, then say hi in Discord. All experience levels welcome.",
};

/**
 * /join — the Figma's `Join / Desktop` (7:85) and `Join / Mobile` (15:743),
 * re-cut for the Luma-first membership (D4): Luma is the first stop, Discord
 * is where the conversation happens after.
 *
 * The route file owns the composition; each section lives in
 * `components/join/`.
 */
export default function Join() {
  return (
    <PageShell>
      {/*
        `join / Intro` (8:171): the design's label and note, with the page's
        own approved title and lead in place of the Figma's "You don't need to
        know it all. / You just need somewhere to start. …" — the approved
        title is the second half of that same line.
      */}
      <PageIntro
        eyebrow="Membership"
        title="Somewhere to start."
        description={
          <>
            Membership is free. Sign up on Luma to get event emails, then come
            say hi in Discord.
          </>
        }
        note="All experience levels welcome"
      />
      <JoinStart />
      <JoinQuestions />
    </PageShell>
  );
}
