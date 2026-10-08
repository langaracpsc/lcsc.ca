import type { Metadata } from "next";
import { PageShell } from "./components/page-shell";
import { H1, P } from "./components/typography";
import { ButtonLink } from "./components/text-link";
import { GUTTER } from "./site-config";

// vinext reads metadata from this boundary module and adds the 404 status and
// `noindex` itself.
export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Without this, vinext's default 404 ignores the site theme and has no way
 * back. Not `PageIntro`: its hairline would sit right on the footer.
 */
export default function NotFound() {
  return (
    <PageShell>
      <section className={`${GUTTER} flex flex-col items-start gap-md py-lg md:py-xl`}>
        <H1 className="max-w-[1000px]">Page not found</H1>
        <P size="lead" tone="muted" className="max-w-[760px]">
          The link may be old, or the address may have a typo.
        </P>
        <ButtonLink href="/" tone="primary">
          Go to the home page
        </ButtonLink>
      </section>
    </PageShell>
  );
}
