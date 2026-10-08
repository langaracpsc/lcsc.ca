import { P } from "../typography";
import { SITE } from "../../site-config";
import { TextLink } from "../text-link";

/**
 * CASL disclosure for the members' mailing list; the address is spelled out so
 * it can be copied. Keep it under the Luma button so it can't read as part of
 * joining Discord.
 */
export function ConsentNote() {
  return (
    <P size="small" tone="muted" className="max-w-[52ch]">
      Becoming an LCSC Member means you&rsquo;ll get a club email now and then:
      event announcements and session reminders. Every
      email includes an unsubscribe link. Questions? Email{" "}
      <TextLink
        href={`mailto:${SITE.email}`}
        className="break-words"
      >
        {SITE.email}
      </TextLink>
      .
    </P>
  );
}
