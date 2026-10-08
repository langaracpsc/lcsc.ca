import type { ReactNode } from "react";
import { H2, H3, P } from "../typography";
import { SITE, GUTTER } from "../../site-config";
import { buildAnchor } from "../../content/programs";
import { TextLink } from "../text-link";

/**
 * The Figma's questions with shorter answers. Event details point to Luma
 * rather than Discord, since events live there.
 */
const QUESTIONS: { q: string; a: ReactNode }[] = [
  {
    q: "Do I need to be good at coding?",
    // Claims only what the program cards say ("Beginner friendly", "Peer
    // support"); the page note already says all levels are welcome.
    a: "No. Build Labs are beginner friendly, and at Build Nights the people around you can help.",
  },
  {
    q: "What should I come to first?",
    a: (
      <>
        Start with the next{" "}
        <TextLink href={buildAnchor("build-nights")}>
          Build Night
        </TextLink>{" "}
        or{" "}
        <TextLink href={buildAnchor("build-labs")}>
          Build Lab
        </TextLink>
        . Check the event details on{" "}
        <TextLink href={SITE.lumaCalendar}>
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
        <TextLink href={SITE.discordInvite}>
          Discord
        </TextLink>
        . You can help run an event or join a{" "}
        <TextLink href="/projects#contribute">
          club project
        </TextLink>
        .
      </>
    ),
  },
];

/**
 * Figma 12:263 (mobile 15:761). 23fr/37fr is the frame's 460:740 split. Each
 * question is an `<h3>` so it shows up in a screen reader's heading list.
 */
export function JoinQuestions() {
  return (
    <section
      aria-labelledby="join-questions"
      className={`${GUTTER} border-border border-t py-lg md:py-xl`}
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
