import { EXPERIENCE, WORK_LABEL, type Role } from "@/lib/constants";

// `.rise` animates `transform` and `.lift` moves the card on hover with `transform` too, so they sit
// on different elements: the list item rises in on scroll and the card inside it lifts.
const RoleBlock = ({ role }: { role: Role }) => (
  <li className="flex flex-col gap-5">
    <div className="rise relative flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span
        aria-hidden="true"
        className="absolute -left-10 top-1.5 size-3 rounded-full border-2 border-accent bg-paper"
      />
      <h3 className="m-0 font-sans text-[26px] font-bold [font-stretch:112%]">{role.title}</h3>
      <p className="m-0 font-sans text-[15px] tabular-nums text-muted">
        {role.type} · {role.period}
      </p>
    </div>
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4 p-0">
      {role.bullets.map((bullet) => (
        <li key={bullet.title} className="rise flex">
          <div className="lift flex flex-1 flex-col gap-2 rounded-[18px] bg-plate p-6">
            <h4 className="m-0 font-sans text-lg font-bold">{bullet.title}</h4>
            <p className="m-0 text-[17px] leading-[1.65]">{bullet.text}</p>
          </div>
        </li>
      ))}
    </ul>
  </li>
);

export const WorkSection = () => {
  const company = EXPERIENCE;

  return (
    <section
      id="work"
      aria-labelledby="work-label work-title"
      className="px-[clamp(20px,4vw,48px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-12">
        <div className="rise flex flex-col gap-3">
          <p id="work-label" className="m-0 font-sans text-sm uppercase tracking-[0.14em] text-muted">
            {WORK_LABEL}
          </p>
          <h2
            id="work-title"
            className="m-0 font-sans text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] [font-stretch:120%]"
          >
            {company.name}
          </h2>
          <p className="m-0 text-lg text-muted">
            {company.description} · {company.location} · {company.period}
          </p>
          <p className="m-0 font-sans text-sm text-muted">{company.stack}</p>
        </div>

        {/* The two roles form a sequence; the accent rule over the grey one draws in as Work scrolls by */}
        <div className="wl relative pl-10">
          <div aria-hidden="true" className="absolute inset-y-2 left-[7px] w-0.5 bg-rule" />
          <div aria-hidden="true" className="draw absolute inset-y-2 left-[7px] w-0.5 origin-top bg-accent" />
          <ol className="relative m-0 flex list-none flex-col gap-14 p-0">
            {company.roles.map((role) => (
              <RoleBlock key={role.title} role={role} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
