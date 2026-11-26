import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { TiltCard } from "@/components/ui/TiltCard";
import { JOURNEY, LEAD_PROJECT, PROOF, VOTING_REPOS, VOTING_SECTIONS, type Step } from "@/lib/constants";
import { VoteDemo } from "./VoteDemo";
import { VoteFlow } from "./VoteFlow";

const lead = LEAD_PROJECT;

// .galInner, .galH, .galP, .jCard and .jBody get their size and spacing from motion.css, which compacts them
// while the gallery is pinned, so no utility here sets their padding, gap, min-height, font size or line height.
const JourneyCard = ({ step }: { step: Step }) => (
  <TiltCard className="jCard box-border flex w-[clamp(270px,28vw,360px)] shrink-0 flex-col rounded-[22px] border border-rule bg-paper">
    <span className="font-sans text-[15px] font-bold tabular-nums text-accent">{step.n}</span>
    <h3 className="m-0 font-sans text-2xl font-bold leading-[1.15] [font-stretch:112%]">{step.title}</h3>
    <p className="jBody m-0 whitespace-pre-line">{step.body}</p>
    <p className="m-0 mt-auto font-sans text-[13px] text-muted">{step.tech}</p>
  </TiltCard>
);

/** The lead project's story: pinned while the cards slide sideways on large screens, a swipeable row elsewhere */
const Gallery = () => (
  <section id="projects" aria-labelledby="projects-title" className="gal bg-plate">
    <div className="galInner box-border flex flex-col">
      <div className="mx-auto box-border flex w-full max-w-[calc(1180px_+_2*clamp(20px,4vw,48px))] flex-col gap-3.5 px-[clamp(20px,4vw,48px)]">
        <p className="m-0 font-sans text-sm uppercase tracking-[0.14em] text-muted">
          {VOTING_SECTIONS.galleryLabel} · {lead.period} · {lead.stack}
        </p>
        <h2 id="projects-title" className="galH m-0 max-w-[18ch] font-sans font-bold leading-[1.04] [font-stretch:120%]">
          {lead.title}
        </h2>
        <p className="galP m-0 max-w-[60ch] text-muted">
          {lead.summary} {VOTING_SECTIONS.galleryCue}
        </p>
      </div>
      <div className="trackBox">
        <div className="track box-border flex w-max gap-5 px-[max(clamp(20px,4vw,48px),calc((100%_-_1180px)/2))] pb-3 pt-1">
          {JOURNEY.map((step) => (
            <JourneyCard key={step.n} step={step} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Eyebrow = ({ text, accent = false }: { text: string; accent?: boolean }) => (
  <p className={`m-0 font-sans text-sm uppercase tracking-[0.14em] ${accent ? "text-accent" : "text-muted"}`}>{text}</p>
);

const DemoSection = () => (
  <section
    aria-labelledby="demo-title"
    className="bg-plate px-[clamp(20px,4vw,48px)] pb-[clamp(80px,10vw,120px)] pt-[clamp(40px,6vw,80px)]"
  >
    <div className="mx-auto flex max-w-[1180px] flex-col gap-7">
      <div className="rise flex flex-col gap-2.5">
        <Eyebrow text={VOTING_SECTIONS.demoEyebrow} accent />
        <h2 id="demo-title" className="m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-bold [font-stretch:118%]">
          {VOTING_SECTIONS.demoHeading}
        </h2>
        <p className="m-0 max-w-[64ch] text-lg leading-[1.65] text-muted">{VOTING_SECTIONS.demoIntro}</p>
      </div>
      <VoteDemo />
    </div>
  </section>
);

// The entrance and the tilt both set `transform`, so the list item rises and the card inside it tilts
const ProofCards = () => (
  <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4 p-0">
    {PROOF.map((proof) => (
      <li key={proof.title} className="rise flex">
        <TiltCard className="flex flex-1 flex-col gap-2.5 rounded-[22px] border border-rule bg-plate p-7">
          <span className="font-sans text-[34px] font-bold leading-[1.05] text-accent [font-stretch:118%]">{proof.figure}</span>
          <h3 className="m-0 font-sans text-lg font-bold">{proof.title}</h3>
          <p className="m-0 text-[16.5px] leading-[1.65] text-muted">{proof.body}</p>
        </TiltCard>
      </li>
    ))}
  </ul>
);

const RepoLinks = () => (
  <ul className="rise m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-2 p-0">
    {VOTING_REPOS.map((repo) => (
      <li key={repo.link} className="flex">
        <a
          href={repo.link}
          target="_blank"
          rel="noreferrer"
          className="rowlink flex min-h-[52px] flex-1 items-center justify-between rounded-xl border border-rule px-4 font-sans text-[15px] text-ink"
        >
          {repo.name}
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </li>
    ))}
  </ul>
);

const ProofSection = () => (
  <section aria-labelledby="proof-title" className="px-[clamp(20px,4vw,48px)] py-[clamp(80px,10vw,140px)]">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-9">
      <div className="rise flex flex-col gap-3">
        <Eyebrow text={VOTING_SECTIONS.proofEyebrow} />
        <h2 id="proof-title" className="m-0 font-sans text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.05] [font-stretch:120%]">
          {VOTING_SECTIONS.proofHeading}
        </h2>
      </div>
      <ProofCards />
      <div className="rise flex">
        <a
          href={lead.link}
          target="_blank"
          rel="noreferrer"
          className="press inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-[22px] font-sans font-semibold text-paper no-underline hover:text-paper"
        >
          {VOTING_SECTIONS.codeButton}
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>
      <RepoLinks />
    </div>
  </section>
);

/** The voting system: the journey of one vote, its architecture, a live demo and the proof */
export const VotingProject = () => (
  <>
    <Gallery />
    <VoteFlow />
    <DemoSection />
    <ProofSection />
  </>
);
