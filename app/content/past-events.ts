/**
 * Row tags name the source: Luma (the club calendar as listed on 2026-10-07),
 * the lhacks2025 repo, or the club Drive. Months only, because Luma stores UTC
 * and an evening event can land on the next day.
 */
export type PastEvent = { when: string; name: string };

export const PAST_EVENTS: PastEvent[] = [
  { when: "Sep 2025", name: "Langara Hacks 2025" }, // lhacks2025
  { when: "Mar 2025", name: "Project 0 Hackathon" }, // Luma
  { when: "Mar 2025", name: "Project 0: Collaboration and Pair Programming Workshop" }, // Luma
  { when: "Jan 2025", name: "Build Nights" }, // Luma
  { when: "Nov 2024", name: "SFU/UBC Transfer Panel" }, // Luma
  { when: "Oct 2024", name: "Halloween Social" }, // Luma
  { when: "Sep 2024", name: "Langara Hacks 2024" }, // Luma
  { when: "Sep 2024", name: "Workshops: Figma, web dev, React, AI and the Defang API" }, // Luma
  // "Tech Talks: Hiring and Recruitment" (Sep 2024) is left out: Luma lists it
  // as a cross-listing with no club host.
  { when: "Sep 2024", name: "Clubs Day" }, // Luma
  { when: "Jun 2024", name: "Ice Skating Social" }, // Luma
  { when: "Fall 2023", name: "SFU/UBC Transfer Panel" }, // Drive folder "202330 FALL UBC/SFU TRANSFER PANEL"
  { when: "Sep 2023", name: "Langara Hacks 2023" }, // Drive
];
