import { ABOUT_LABEL, ABOUT_STATEMENT, ABOUT_STORY } from "@/lib/constants";

// Fill classes from motion.css, one per statement part; the story paragraph fills last (s7)
const PART_CLASSES = ["s1", "s2", "s3", "s4", "s5", "s6"];
// From the fourth part on ("I care about...") the statement is in the accent colour
const FIRST_ACCENT_PART = 3;

// Motion classes (st, stInner, stCol, stBig, stPara) own position, height, padding-block, align-items, gap,
// font-size and the paragraph's line-height, so no utility here sets those properties on them.
export const AboutSection = () => {
  return (
    <section id="about" className="st" aria-label={ABOUT_LABEL}>
      <div className="stInner box-border flex px-[clamp(20px,4vw,48px)]">
        <div className="stCol mx-auto flex w-full max-w-[1080px] flex-col">
          <p className="m-0 font-sans text-sm uppercase tracking-[0.14em] text-muted">{ABOUT_LABEL}</p>
          <p className="stBig m-0 font-sans font-[650] leading-[1.12] tracking-[-0.01em] [font-stretch:108%]">
            {ABOUT_STATEMENT.map((part, i) => (
              <span key={part} className={`${PART_CLASSES[i]} ${i >= FIRST_ACCENT_PART ? "text-accent" : ""}`}>
                {part}
              </span>
            ))}
          </p>
          <p className="s7 stPara m-0 max-w-[62ch] text-muted">{ABOUT_STORY}</p>
        </div>
      </div>
    </section>
  );
};
