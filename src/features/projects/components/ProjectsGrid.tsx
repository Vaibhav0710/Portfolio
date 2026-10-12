import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/layout/Section";
import { LEAD_PROJECT, MINOR_PROJECTS, PROJECTS, type Project, type RepoLink } from "@/lib/constants";
import { VotingDiagram } from "./VotingDiagram";

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="max-w-[68ch] list-disc space-y-3 pl-5 marker:text-muted">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const BuiltWith = ({ stack }: { stack: string }) => (
  <p className="font-sans text-sm leading-relaxed text-muted">
    <span className="block font-semibold text-ink">Built with</span>
    {stack}
  </p>
);

/** A link list whose rows are full-height tap targets */
const LinkList = ({ links }: { links: RepoLink[] }) => (
  <ul className="divide-y divide-rule border-y border-rule font-sans text-sm">
    {links.map((link) => (
      <li key={link.link}>
        <a href={link.link} target="_blank" rel="noreferrer" className="group flex min-h-11 items-center justify-between gap-3">
          <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent">{link.name}</span>
          <ArrowUpRight aria-hidden="true" size={16} className="shrink-0 text-muted" />
        </a>
      </li>
    ))}
  </ul>
);

const ProjectHeader = ({ project, large = false }: { project: Project; large?: boolean }) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
    <h3 className={`font-sans font-semibold [font-stretch:112%] ${large ? "text-2xl md:text-[2rem]" : "text-xl md:text-2xl"}`}>
      {project.title}
    </h3>
    <p className="shrink-0 font-sans text-sm tabular-nums text-muted">{project.period}</p>
  </div>
);

export const ProjectsGrid = () => {
  const lead = LEAD_PROJECT;

  return (
    <Section id="projects" title="Projects" intro="Where I build with Java and Spring Boot outside work." layout="stacked">
      {/* Lead project: full-width diagram, then details beside a side column */}
      <article>
        <ProjectHeader project={lead} large />
        <p className="mt-3 max-w-[62ch] text-[1.125rem] leading-[1.75]">{lead.summary}</p>

        <VotingDiagram />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_17rem] lg:gap-14">
          <Bullets items={lead.bullets} />
          <aside className="space-y-6">
            <BuiltWith stack={lead.stack} />
            {lead.status && <p className="font-sans text-sm text-muted">{lead.status}</p>}
            <LinkList links={[{ name: "Overview and architecture", link: lead.link }, ...(lead.repos ?? [])]} />
          </aside>
        </div>
      </article>

      {/* Other main projects */}
      {PROJECTS.map((project) => (
        <article key={project.title} className="mt-14 grid gap-10 border-t border-rule pt-10 lg:grid-cols-[1fr_17rem] lg:gap-14">
          <div>
            <ProjectHeader project={project} />
            <p className="mt-2 max-w-[62ch]">{project.summary}</p>
            <div className="mt-5">
              <Bullets items={project.bullets} />
            </div>
          </div>
          <aside className="space-y-6">
            <BuiltWith stack={project.stack} />
            <LinkList links={[{ name: "Code on GitHub", link: project.link }]} />
          </aside>
        </article>
      ))}

      {/* Smaller projects */}
      <div className="mt-14 border-t border-rule pt-10">
        <h3 className="font-sans text-base font-semibold">Smaller projects from training</h3>
        <ul className="mt-4 divide-y divide-rule">
          {MINOR_PROJECTS.map((project) => (
            <li key={project.name} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6">
              <span className="font-sans font-medium">{project.name}</span>
              <span className="text-muted">{project.description}</span>
              <span className="flex gap-5 font-sans text-sm">
                {project.links.map((link) => (
                  <a key={link.link} href={link.link} target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center">
                    {link.name}
                  </a>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
