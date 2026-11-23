import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { HERO, PERSON } from "@/lib/constants";
import { LensChart } from "./LensChart";

const PHOTO_SIZE = 104;
const ICON_SIZE = 20;

// Motion classes (hero, heroInner, away, hCol, hPhoto, hName, hPara, hint) own position, height, padding-block,
// align-items, gap, font-size and the photo size, so no utility here sets those properties on them.
const PILL_BUTTON = "press inline-flex min-h-[50px] items-center rounded-full px-[26px] text-base font-semibold no-underline";
const ICON_BUTTON =
  "press inline-flex size-[50px] items-center justify-center rounded-full border border-rule text-ink hover:text-accent";

const Intro = () => (
  <>
    <div className="flex items-center gap-[18px]">
      {/* The photo comes from our own /api route and is small, so next/image would add nothing */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PERSON.photo}
        alt={`Portrait of ${PERSON.name}`}
        width={PHOTO_SIZE}
        height={PHOTO_SIZE}
        className="hPhoto shrink-0 rounded-[28px] object-cover shadow-card"
      />
      <p className="m-0 inline-flex items-center gap-2.5 rounded-full border border-rule bg-plate px-3.5 py-2 font-sans text-sm font-semibold">
        <span aria-hidden="true" className="live size-[9px] shrink-0 rounded-full bg-ok" />
        {HERO.badge}
      </p>
    </div>
    <h1 className="hName m-0 font-sans font-[750] leading-[0.98] tracking-[-0.015em] [font-stretch:122%]">
      {PERSON.name}
      <span className="mt-2.5 block text-[0.42em] font-[650] text-muted [font-stretch:110%]">{PERSON.role}</span>
    </h1>
    <p className="hPara m-0 max-w-[54ch]">{HERO.pitch}</p>
  </>
);

const Locations = () => (
  <ul className="m-0 flex list-none flex-wrap gap-2 p-0 font-sans text-sm text-muted">
    {HERO.locations.map((place) => (
      <li key={place} className="rounded-full bg-tint px-3 py-1.5">
        {place}
      </li>
    ))}
  </ul>
);

const Actions = () => (
  <div className="flex flex-wrap items-center gap-3 font-sans">
    <a href={`mailto:${PERSON.email}`} className={`${PILL_BUTTON} bg-ink text-paper hover:text-paper`}>
      Email me
    </a>
    <a
      href={PERSON.cv}
      className={`${PILL_BUTTON} border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper`}
    >
      Download CV
    </a>
    <a href={PERSON.linkedin} aria-label="LinkedIn profile" className={ICON_BUTTON}>
      <LinkedinLogo size={ICON_SIZE} aria-hidden="true" />
    </a>
    <a href={PERSON.github} aria-label="GitHub profile" className={ICON_BUTTON}>
      <GithubLogo size={ICON_SIZE} aria-hidden="true" />
    </a>
  </div>
);

export const ProfileSection = () => {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="heroInner flex px-[clamp(20px,4vw,48px)]">
        <div className="away mx-auto grid w-full max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <div className="hCol flex flex-col">
            <Intro />
            <Locations />
            <Actions />
          </div>
          <div className="flex flex-col gap-3.5">
            <p aria-hidden="true" className="hint m-0 text-center font-sans text-sm text-muted">
              {HERO.chartHint}
            </p>
            <LensChart />
          </div>
        </div>
      </div>
    </section>
  );
};
