import Link from "next/link";
import { P, typography } from "../typography";
import { ButtonLink } from "../text-link";
import { GUTTER } from "../../site-config";

/**
 * Figma 4:44, 4:46 (mobile 15:267, 15:268). Join uses the `contrast` tone so
 * it shows in light mode too. `lg:-mt-20` pulls it up into the stage padding.
 */
export function HeroSupport() {
  return (
    // A div, not a section: a second landmark would duplicate "About" below.
    <div
      className={`${GUTTER} relative z-10 flex flex-col items-center gap-md pb-lg text-center lg:-mt-20 lg:pb-xl`}
    >
      <P size="lead" className="max-w-[580px]">
        A student-run club at Langara College for people who want to build
        things and get better at it together.
      </P>

      {/* A grid on phones so both buttons take the wider one's width. */}
      <div className="grid gap-sm text-center sm:flex sm:justify-center">
        {/* The Figma's arrow, kept on an internal link until that's decided. */}
        <Link href="/join" className={typography.button({ tone: "contrast" })}>
          Join the club&nbsp;&nbsp;<span aria-hidden="true">↗</span>
        </Link>
        <ButtonLink href="/build">Explore Build</ButtonLink>
      </div>
    </div>
  );
}
