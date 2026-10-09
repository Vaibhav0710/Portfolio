import { Section } from "@/components/layout/Section";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE, SKILL_GROUPS, type Skill } from "@/lib/constants";

export const WorkSection = () => {
  const company = EXPERIENCE;

  return (
    <Section id="work" title="Work" intro="One company so far: I joined as an intern and was taken on full-time.">
      <article>
        <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-sans text-2xl font-semibold [font-stretch:112%]">{company.name}</h3>
          <p className="font-sans text-sm tabular-nums text-muted">{company.period}</p>
        </header>
        <p className="mt-1 text-muted">
          {company.description}, {company.location}
        </p>
        <p className="mt-4 max-w-[68ch] rounded-sm bg-tint px-4 py-3 font-sans text-sm leading-relaxed">
          <span className="font-semibold">Stack at work:</span> {company.stack}
        </p>

        {/* The two roles form a sequence, so a timeline rule links them */}
        <ol className="mt-8 space-y-10 border-l border-rule">
          {company.roles.map((role) => (
            <li key={role.title} className="relative pl-6 sm:pl-8">
              <span aria-hidden="true" className="absolute -left-[5px] top-2.5 h-[9px] w-[9px] rounded-full border-2 border-accent bg-plate" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h4 className="font-sans text-lg font-semibold">{role.title}</h4>
                <p className="font-sans text-sm tabular-nums text-muted">{role.period}</p>
              </div>
              <p className="font-sans text-sm text-muted">{role.type}</p>
              <ul className="mt-4 max-w-[68ch] list-disc space-y-3 pl-5 marker:text-muted">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </article>
    </Section>
  );
};

const SkillMark = ({ where }: { where: Skill["where"] }) =>
  where === "work" ? (
    <span aria-hidden="true" className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-ink" />
  ) : (
    <span aria-hidden="true" className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full border-[1.5px] border-ink" />
  );

export const SkillsSection = () => {
  return (
    <Section
      id="skills"
      title="Skills"
      intro="Java and Spring Boot come from PG-DAC and my own projects. At work I write Python, Node.js and C#/.NET."
    >
      <p className="mb-8 flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink" /> Used in production at work
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full border-[1.5px] border-ink" /> Projects and training
        </span>
      </p>

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <h3 className="border-b border-rule pb-2 font-sans text-base font-semibold">{group.category}</h3>
            <ul className="mt-3 space-y-1.5 font-sans text-[0.95rem]">
              {group.items.map((skill) => (
                <li key={skill.name} className="flex gap-3">
                  <SkillMark where={skill.where} />
                  <span>
                    {skill.name}
                    <span className="sr-only">{skill.where === "work" ? " (used at work)" : " (projects and training)"}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export const EducationSection = () => {
  return (
    <Section id="education" title="Education">
      <ul className="space-y-10">
        {EDUCATION.map((item) => (
          <li key={item.degree}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-sans text-lg font-semibold">{item.degree}</h3>
              <p className="shrink-0 font-sans text-sm tabular-nums text-muted">{item.period}</p>
            </div>
            <p className="text-muted">{item.institution}</p>
            {item.note && <p className="mt-2 max-w-[68ch]">{item.note}</p>}
            {item.modules && (
              <>
                <p className="mt-4 font-sans text-sm font-medium">Modules</p>
                <ul className="mt-2 grid max-w-[68ch] gap-x-8 gap-y-1.5 font-sans text-[0.95rem] sm:grid-cols-2">
                  {item.modules.map((module) => (
                    <li key={module} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-muted" />
                      {module}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3 className="mt-12 border-b border-rule pb-2 font-sans text-base font-semibold">Certifications and achievements</h3>
      <ul className="mt-2 divide-y divide-rule">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.name} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
            <span>
              {cert.name}, <span className="text-muted">{cert.issuer}</span>
              {cert.detail && <span className="block font-sans text-sm text-muted">{cert.detail}</span>}
            </span>
            {cert.link && (
              <a href={cert.link} target="_blank" rel="noreferrer" className="link font-sans text-sm">
                View certificate
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
};
