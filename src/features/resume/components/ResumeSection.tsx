import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  CERTIFICATIONS,
  EDUCATION,
  EDUCATION_SECTION,
  SKILLS_SECTION,
  type Certification,
  type EducationItem,
} from "@/lib/constants";
import { SkillFilter } from "./SkillFilter";

const SECTION_PAD = "px-[clamp(20px,4vw,48px)]";
const SUB_HEADING = "rise m-0 font-sans text-[clamp(32px,4vw,48px)] font-bold [font-stretch:120%]";

export const SkillsSection = () => (
  <section id="skills" aria-labelledby="skills-title" className={`${SECTION_PAD} py-[clamp(80px,10vw,140px)]`}>
    <div className="mx-auto flex max-w-[1180px] flex-col gap-9">
      <SkillFilter
        heading={
          <div className="flex flex-col gap-3">
            <p className="m-0 font-sans text-sm uppercase tracking-[0.14em] text-muted">{SKILLS_SECTION.label}</p>
            <h2
              id="skills-title"
              className="m-0 font-sans text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] [font-stretch:120%]"
            >
              {SKILLS_SECTION.heading}
            </h2>
          </div>
        }
      />
      <p className="m-0 font-sans text-sm text-muted">{SKILLS_SECTION.legend}</p>
    </div>
  </section>
);

const EducationCard = ({ item }: { item: EducationItem }) => (
  <article className="rise flex flex-col gap-2 rounded-[18px] bg-paper p-6">
    <h3 className="m-0 font-sans text-[19px] font-bold">{item.degree}</h3>
    <p className="m-0 text-base text-muted">
      {[item.institution, item.period, item.grade].filter(Boolean).join(" · ")}
    </p>
    {item.note && <p className="m-0 text-base leading-[1.6]">{item.note}</p>}
    {item.modules && (
      <ul className="m-0 mt-1 flex list-none flex-wrap gap-1.5 p-0">
        {item.modules.map((module) => (
          <li key={module} className="rounded-full bg-tint px-2.5 py-[5px] font-sans text-[13px]">
            {module}
          </li>
        ))}
      </ul>
    )}
  </article>
);

const CertificationRow = ({ cert }: { cert: Certification }) => {
  const text = (
    <span>
      {cert.name} <span className="text-muted">· {[cert.issuer, cert.date].filter(Boolean).join(", ")}</span>
    </span>
  );
  const row = "flex min-h-[60px] items-center justify-between gap-3 border-b border-rule px-2 py-2";

  return (
    <li>
      {cert.link ? (
        <a href={cert.link} target="_blank" rel="noreferrer" className={`rowlink text-ink ${row}`}>
          {text}
          <span className="sr-only">, {EDUCATION_SECTION.certificateLink}</span>
          <ArrowUpRight aria-hidden="true" size={16} className="shrink-0" />
        </a>
      ) : (
        <div className={row}>{text}</div>
      )}
    </li>
  );
};

export const EducationSection = () => (
  <section id="education" aria-labelledby="education-title" className={`${SECTION_PAD} bg-plate py-[clamp(80px,10vw,130px)]`}>
    <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-10">
      <div className="flex flex-col gap-5">
        <h2 id="education-title" className={SUB_HEADING}>
          {EDUCATION_SECTION.heading}
        </h2>
        {EDUCATION.map((item) => (
          <EducationCard key={item.degree} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <h2 className={SUB_HEADING}>{EDUCATION_SECTION.certificationsHeading}</h2>
        <ul className="rise m-0 flex list-none flex-col border-t border-rule p-0">
          {CERTIFICATIONS.map((cert) => (
            <CertificationRow key={cert.name} cert={cert} />
          ))}
        </ul>
      </div>
    </div>
  </section>
);
