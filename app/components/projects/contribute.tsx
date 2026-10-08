import { H2, Mono, P } from "../typography";
import { GUTTER, RED_STRIP, SITE } from "../../site-config";
import { ButtonLink } from "../text-link";

/**
 * Figma 11:200 (mobile 15:566); `#contribute` is the footer link's target.
 * Finding teammates is a conversation, so this goes to Discord, not the club
 * feedback form. The Figma's "Find collaborators" became "Post in Discord".
 */
export function ProjectsContribute() {
  return (
    <section
      id="contribute"
      aria-labelledby="contribute-heading"
      className={`${GUTTER} ${RED_STRIP} flex scroll-mt-md flex-col gap-md py-lg md:py-xl lg:flex-row lg:items-center lg:gap-xl`}
    >
      <div className="flex min-w-0 flex-col gap-md lg:max-w-[890px] lg:flex-1">
        <Mono tone="inherit">Contribute</Mono>
        <H2 id="contribute-heading" tone="inherit">
          Start a project with other members
        </H2>
        <P size="lead" tone="inherit" className="max-w-[820px]">
          Post it in Discord to find a teammate or get feedback on a work in
          progress.
        </P>
      </div>
      {/* The Figma's Style=Light: a primary button would be red on red. */}
      <ButtonLink
        href={SITE.discordInvite}
        tone="onDark"
        className="self-start lg:shrink-0 lg:self-center"
      >
        Post in Discord
      </ButtonLink>
    </section>
  );
}
