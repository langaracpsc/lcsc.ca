import { P } from "../typography";
import { SITE } from "../../site-config";
import { TextLink } from "../text-link";

/**
 * Consent note. CASL requires the club to identify itself and provide a
 * contact for a mailing list, and the membership is what puts someone on it.
 * Luma handles the unsubscribe mechanism; this is the site-side disclosure
 * that tells people what they are agreeing to before they click through.
 *
 * It sits directly under the Luma "Join the club" button, inside the
 * membership column, and names the membership. Lower down the page it read as
 * if joining the Discord server put you on an email list. The address is
 * spelled out rather than hidden behind "Get in touch": a contact that can be
 * read and copied is the point of the disclosure.
 */
export function ConsentNote() {
  return (
    <P size="small" tone="muted" className="max-w-[52ch]">
      Becoming an LCSC Member means you&rsquo;ll get a club email now and then:
      event announcements and session reminders. Every
      email includes an unsubscribe link. Questions? Email{" "}
      <TextLink
        href={`mailto:${SITE.email}`}
        className="text-brand font-semibold break-words"
      >
        {SITE.email}
      </TextLink>
      .
    </P>
  );
}
