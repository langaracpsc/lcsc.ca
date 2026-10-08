import type { Metadata } from "next";
import { PageShell } from "./components/page-shell";
import { Hero } from "./components/home/hero";
import { HeroSupport } from "./components/home/hero-support";
import { WhatWeDoStrip } from "./components/home/what-we-do-strip";
import { AboutTheClub } from "./components/home/about-the-club";
import { CommunityPhotoBand } from "./components/home/community-photo-band";
import { BuildOverview } from "./components/home/build-overview";
import { EventsFeature } from "./components/home/events-feature";

// No title, so the layout's default is used; the description is the hero's intro.
export const metadata: Metadata = {
  description:
    "A student-run club at Langara College for people who want to build things and get better at it together.",
  alternates: { canonical: "/" },
};

/** Figma "Home / Desktop" (4:20) and "Home / Mobile" (15:260). */
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
