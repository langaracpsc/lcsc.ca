/**
 * Past club events, newest first, for the archive on /events.
 *
 * Every entry is sourced; nothing here is from memory or the Figma:
 *   - Luma: the club's public calendar (lu.ma/lcsc), past events as listed on
 *     2026-10-07. Months are given rather than days, because Luma stores start
 *     times in UTC and an evening event can land on the next day.
 *   - lhacks2025: the club's Langara Hacks 2025 site (github.com/langaracpsc/
 *     lhacks2025), which gives September 20-21, 48 hours, T Gallery.
 *   - Drive: the club's Google Drive. Langara Hacks 2023 from the dates on its
 *     photo folder; the Fall 2023 transfer panel from its folder name
 *     ("202330 FALL UBC/SFU TRANSFER PANEL").
 *
 * To add an event, add it here with its source. Upcoming events don't belong
 * here: they live on Luma.
 */
export type PastEvent = { when: string; name: string };

export const PAST_EVENTS: PastEvent[] = [
  { when: "Sep 2025", name: "Langara Hacks 2025" }, // lhacks2025
  { when: "Mar 2025", name: "Project0 Hackathon" }, // Luma
  { when: "Mar 2025", name: "Project0: Collaboration & Pair Programming Workshop" }, // Luma
  { when: "Jan 2025", name: "Build Nights" }, // Luma
  { when: "Nov 2024", name: "SFU/UBC Transfer Panel" }, // Luma
  { when: "Oct 2024", name: "Halloween Social" }, // Luma
  { when: "Sep 2024", name: "Tech Talks: Hiring and Recruitment" }, // Luma
  { when: "Sep 2024", name: "Langara Hacks 2024" }, // Luma
  { when: "Sep 2024", name: "Workshops: Figma, web dev, React, AI and the Defang API" }, // Luma
  { when: "Sep 2024", name: "Clubs Day" }, // Luma
  { when: "Jun 2024", name: "Ice Skating Social" }, // Luma
  { when: "Fall 2023", name: "UBC/SFU Transfer Panel" }, // Drive
  { when: "Sep 2023", name: "Langara Hacks 2023" }, // Drive
];
