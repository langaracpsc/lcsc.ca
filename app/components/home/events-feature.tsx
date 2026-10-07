import Link from "next/link";
import { H2, H3, Mono, P, typography } from "../typography";
import { GUTTER, SITE } from "../../site-config";
import { TextLink } from "../text-link";

/**
 * Events feature — the Figma's "Events feature" (desktop 7:48, mobile
 * 15:300): an always-dark band with the events pitch on the left and the
 * "Schedule note" panel on the right.
 *
 * ── Copy ───────────────────────────────────────────────────────────────────
 * Verbatim from the frame except the Schedule note body. The Figma sends
 * people to Discord for dates; the club has since moved events, sessions and
 * sign-ups to Luma, with Discord kept for announcements and conversation. The
 * body says that, at the Figma's length, and names both places as links.
 * No dates are given — the design's own rule is "Event dates stay
 * unannounced until confirmed."
 *
 * ── Layout ─────────────────────────────────────────────────────────────────
 * Desktop: two equal columns 80px apart, 80px of padding, the note aligned to
 * the top of the story. Mobile: stacked, 24px apart, 48px of padding; the note
 * is inset 24px at the sides and 40px top and bottom, as the mobile frame has.
 *
 * ── Theme ──────────────────────────────────────────────────────────────────
 * Ink in light mode, as drawn. In dark mode the page is already ink, so the
 * band lifts to panel and the note drops to ink — the same one-step contrast
 * the Figma has, inverted. The action is the `Style=Light` button ("Light
 * actions on dark surfaces") and the focus ring is pointed at paper, since
 * the default light-mode ring is red and would not hold up on ink.
 *
 * The site footer is `bg-panel` in both themes, so in dark mode this band and
 * the footer are the same colour; the footer draws a dark-mode hairline along
 * its top edge to keep them two blocks instead of one.
 */
export function EventsFeature() {
  return (
    <section
      aria-labelledby="events-heading"
      className={`${GUTTER} bg-ink text-paper dark:bg-panel grid gap-md py-lg [--ring:var(--color-paper)] md:py-xl lg:grid-cols-2 lg:items-start lg:gap-20`}
    >
      <div className="flex flex-col items-start gap-md">
        <H2 id="events-heading" tone="inherit">
          Your next
          <br /> &ldquo;glad I went.&rdquo;
        </H2>
        <P size="lead" tone="onDark" className="max-w-[550px]">
          Workshops and hackathons, outside of class.
        </P>
        <Link href="/events" className={typography.button({ tone: "onDark" })}>
          Explore events&nbsp;&nbsp;<span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="bg-panel dark:bg-ink flex flex-col gap-md px-md py-10 md:p-10">
        <Mono tone="onDark">Coming up</Mono>
        <H3 tone="inherit">Dates go up on Luma.</H3>
        <P tone="inherit">
          When the next event is set, it&rsquo;s posted on{" "}
          <TextLink href={SITE.lumaCalendar} className="font-semibold">
            Luma
          </TextLink>{" "}
          and announced in{" "}
          <TextLink href={SITE.discordInvite} className="font-semibold">
            Discord
          </TextLink>
          .
        </P>
      </div>
    </section>
  );
}
