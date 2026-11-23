import { WHY, WHY_SECTION } from "@/lib/constants";
import { entranceClass } from "@/lib/motion";
import { TiltCard } from "./TiltCard";

// The entrance animation and the tilt both set `transform`, so they sit on different elements:
// the list item pops in on scroll and the card inside it tilts under the pointer.
export const WhyHire = () => {
  return (
    <section aria-label={WHY_SECTION.label} className="px-[clamp(20px,4vw,48px)] pt-[clamp(80px,10vw,140px)]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-9">
        <div className="rise flex flex-col gap-3">
          <p className="m-0 font-sans text-sm uppercase tracking-[0.14em] text-muted">{WHY_SECTION.eyebrow}</p>
          <h2 className="m-0 max-w-[20ch] font-sans text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] [font-stretch:120%]">
            {WHY_SECTION.heading}
          </h2>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4 p-0">
          {WHY.map((pitch, i) => (
            <li key={pitch.n} className={`${entranceClass(i)} flex`}>
              <TiltCard className="flex flex-1 flex-col gap-3 rounded-[22px] border border-rule bg-plate p-[30px]">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-xl bg-tint font-sans font-bold text-accent"
                >
                  {pitch.n}
                </span>
                <h3 className="m-0 font-sans text-2xl font-bold leading-[1.2] [font-stretch:112%]">{pitch.title}</h3>
                <p className="m-0 text-[17px] leading-[1.65] text-muted">{pitch.body}</p>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
