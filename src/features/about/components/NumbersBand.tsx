import { NUMBERS_LABEL, STATS } from "@/lib/constants";
import { entranceClass } from "@/lib/motion";
import { CountUp } from "./CountUp";

export const NumbersBand = () => {
  return (
    <section
      id="numbers"
      aria-label={NUMBERS_LABEL}
      className="bg-band px-[clamp(20px,4vw,48px)] py-[clamp(72px,9vw,120px)] text-on-band"
    >
      <ul className="mx-auto my-0 grid max-w-[1180px] list-none grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5 p-0">
        {STATS.map((stat, i) => (
          <li
            key={stat.label}
            className={`${entranceClass(i)} flex flex-col gap-2.5 rounded-[20px] border border-on-band/12 bg-on-band/6 p-7`}
          >
            <CountUp
              value={stat.value}
              decimals={stat.decimals}
              suffix={stat.suffix}
              className="font-sans text-[clamp(48px,6vw,76px)] font-bold leading-none tabular-nums [font-stretch:120%]"
            />
            <span className="text-[17px] leading-[1.55] text-on-band-muted">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
