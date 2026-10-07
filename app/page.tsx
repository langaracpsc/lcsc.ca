import type { Metadata } from "next";
import { PageShell } from "./components/page-shell";
import { Hero } from "./components/home/hero";
import { HeroSupport } from "./components/home/hero-support";
import { WhatWeDoStrip } from "./components/home/what-we-do-strip";
import { AboutTheClub } from "./components/home/about-the-club";
import { CommunityPhotoBand } from "./components/home/community-photo-band";
import { BuildOverview } from "./components/home/build-overview";
import { EventsFeature } from "./components/home/events-feature";

/**
 * No `title`: the home page keeps the root layout's default ("Langara Computer
 * Science Club") rather than "Home | Langara Computer Science Club". The
 * description is the hero's intro line.
 */
export const metadata: Metadata = {
  description:
    "A student-run club at Langara College for people who want to build things and get better at it together.",
};

/**
 * Home route: the shell, and the sections in page order.
 *
 * The route file owns the composition and nothing else — each section's
 * markup, copy and layout notes live in its own file under `components/home/`.
 * Order follows the Figma "Home / Desktop" frame (4:20) below the hero.
 */
export default function Home() {
  return (
    <PageShell>
      <Hero />
      <HeroSupport />
      <WhatWeDoStrip />
      <AboutTheClub />
      <CommunityPhotoBand />
      <BuildOverview />
      <EventsFeature />
    </PageShell>
  );
}
