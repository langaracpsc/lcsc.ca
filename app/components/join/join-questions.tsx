import type { ReactNode } from "react";
import { H2, H3, P } from "../typography";
import { SITE, GUTTER } from "../../site-config";
import { TextLink } from "../text-link";

/** Links inside an answer: red on paper, the lightened red on ink. */
const LINK = "text-brand font-medium";

/**
 * The Figma's FAQ rows, in order. The questions are the design's; the answers
 * were shortened into plain words, and the Luma-first membership (D4) changes
 * one destination: the design sent people to Discord for event details, which
 * now live on Luma. Discord stays
 * where the design uses it for conversation.
 */
const QUESTIONS: { q: string; a: ReactNode }[] = [
  {
    q: "Do I need to be good at coding?",
    a: "No. All experience levels are welcome.",
  },
  {
    q: "What should I come to first?",
    a: (
      <>
        Start with the next{" "}
        <TextLink href="/build#build-nights" className={LINK}>
          Build Night
        </TextLink>{" "}
        or a beginner-friendly workshop. Check the event details on{" "}
        <TextLink href={SITE.lumaCalendar} className={LINK}>
          Luma
        </TextLink>{" "}
        before you go.
      </>
    ),
  },
  {
    q: "Can I bring my own project?",
    a: "Yes. That’s what Build Nights are for.",
  },
  {
    q: "How can I help the club?",
    a: (
      <>
        Say so in{" "}
        <TextLink href={SITE.discordInvite} className={LINK}>
          Discord
        </TextLink>
        . You can help run an event or join a{" "}
        <TextLink href="/projects#contribute" className={LINK}>
          club project
        </TextLink>
        .
      </>
    ),
  },
];

/**
 * `Join / Questions` (Figma 12:263 desktop, 15:761 mobile).
 *
 * Desktop: the H2, then four rows, each a question in the H3 face beside its
 * answer in Body large — the frame's 460px and 740px columns with 80px
 * between, kept as a 23:37 ratio so the pair scales with the page instead of
 * overflowing it. Mobile: question over answer, 24px apart.
 *
 * Rows are spaced, not ruled: both frames set them 32px (desktop) and 24px
 * (mobile) apart with no divider between them.
 *
 * Each question is a real `<h3>` under the section's `<h2>`, so the rows show
 * up in a screen reader's heading list and the outline stays in order. The
 * hairline above the section is not in the frame: it separates the FAQ from
 * the consent note, which sits on the same surface just above it.
 */
export function JoinQuestions() {
  return (
    <section
      aria-labelledby="join-questions"
      className={`${GUTTER} border-border border-t py-12 md:py-xl`}
    >
      <H2 id="join-questions" className="max-w-[1100px]">
        Common questions
      </H2>

      <div className="mt-md flex flex-col gap-md lg:mt-8 lg:gap-8">
        {QUESTIONS.map(({ q, a }) => (
          <div
            key={q}
            className="grid gap-md lg:grid-cols-[23fr_37fr] lg:gap-x-20"
          >
            <H3>{q}</H3>
            <P size="lead" tone="muted">
              {a}
            </P>
          </div>
        ))}
      </div>
    </section>
  );
}
