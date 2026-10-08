import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { PageIntro } from "../components/page-intro";
import { EventsUpcoming } from "../components/events/events-upcoming";
import { EventsArchive } from "../components/events/events-archive";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops and hackathons run by the Langara Computer Science Club. Dates and sign-ups are on the club’s Luma calendar.",
};

/** Figma "Events / Desktop" (7:82) and "Events / Mobile" (15:476). */
export default function Events() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Events"
        title={
          <>
            Worth closing
            <br />
            your tabs for.
          </>
        }
        description="Workshops and hackathons run by the club."
      />
      <EventsUpcoming />
      <EventsArchive />
    </PageShell>
  );
}
