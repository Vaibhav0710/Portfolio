import { NODES, VOTING_SECTIONS } from "@/lib/constants";

// motion.css lights each node in turn (.n1 to .n6) while the dot travels the rail; without scroll
// timelines every node shows lit and the dot rests at the result service.
const nodeClass = (index: number) => `n${index + 1}`;

const Rail = () => (
  <div aria-hidden="true" className="absolute inset-x-[75px] top-1/2 -mt-[1.5px] h-[3px] rounded-[3px] bg-rule">
    <div className="railFill absolute inset-0 origin-left rounded-[3px] bg-accent" />
    <div className="dot absolute left-full top-1/2 -ml-[9px] -mt-[9px] size-[18px] rounded-full bg-accent shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_18%,transparent),0_0_24px_var(--accent)]" />
  </div>
);

/** The path of one vote, client to result service, drawn as a rail the dot travels on scroll */
export const VoteFlow = () => (
  <section
    aria-labelledby="flow-title"
    className="dg bg-plate px-[clamp(20px,4vw,48px)] py-[clamp(40px,6vw,80px)]"
  >
    <div className="mx-auto flex max-w-[1180px] flex-col gap-7">
      <div className="rise flex flex-col gap-2.5">
        <h2 id="flow-title" className="m-0 font-sans text-[clamp(28px,3.6vw,44px)] font-bold [font-stretch:118%]">
          {VOTING_SECTIONS.flowHeading}
        </h2>
        <p className="m-0 max-w-[62ch] text-lg leading-[1.65] text-muted">{VOTING_SECTIONS.flowIntro}</p>
      </div>
      <div role="img" aria-label={VOTING_SECTIONS.flowDescription} className="overflow-x-auto pb-4 pt-2">
        <div className="relative min-w-[980px] py-3">
          <Rail />
          <div className="relative flex justify-between">
            {NODES.map((node, i) => (
              <div
                key={node.title}
                className={`${nodeClass(i)} box-border flex min-h-[120px] w-[150px] flex-col justify-center gap-1.5 rounded-2xl border-[1.5px] border-ink bg-paper p-3.5 text-center font-sans`}
              >
                <span className="text-base font-bold">{node.title}</span>
                <span className="text-[12.5px] leading-[1.4] text-muted">{node.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
