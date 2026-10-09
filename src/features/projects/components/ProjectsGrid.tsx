import { Section } from "@/components/layout/Section";
import { LEAD_PROJECT, MINOR_PROJECTS, PROJECTS, type Project } from "@/lib/constants";
import { VotingDiagram } from "./VotingDiagram";

const ProjectBody = ({ project }: { project: Project }) => (
  <>
    <ul className="mt-5 max-w-[68ch] list-disc space-y-3 pl-5 marker:text-muted">
      {project.bullets.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
    <p className="mt-5 max-w-[68ch] font-sans text-sm leading-relaxed text-muted">
      <span className="font-semibold text-ink">Built with</span> {project.stack}
    </p>
  </>
);

export const ProjectsGrid = () => {
  const lead = LEAD_PROJECT;

  return (
    <Section id="projects" title="Projects" intro="Where I build with Java and Spring Boot outside work.">
      {/* Lead project */}
      <article>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="font-sans text-2xl font-semibold [font-stretch:112%] md:text-[1.75rem]">{lead.title}</h3>
          <p className="shrink-0 font-sans text-sm tabular-nums text-muted">{lead.period}</p>
        </div>
        <p className="mt-3 max-w-[62ch] text-[1.125rem] leading-[1.75]">{lead.summary}</p>

        <VotingDiagram />
        <ProjectBody project={lead} />
        {lead.status && <p className="mt-3 font-sans text-sm text-muted">{lead.status}</p>}

        <div className="mt-6 font-sans text-sm">
          <a href={lead.link} target="_blank" rel="noreferrer" className="link font-medium">
            Overview and architecture on GitHub
          </a>
          {lead.repos && (
            <p className="mt-3 leading-loose text-muted">
              One repository per service:{" "}
              {lead.repos.map((repo, i) => (
                <span key={repo.link}>
                  <a href={repo.link} target="_blank" rel="noreferrer" className="link text-ink">
                    {repo.name}
                  </a>
                  {i < lead.repos!.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
      </article>

      {/* Other main projects */}
      {PROJECTS.map((project) => (
        <article key={project.title} className="mt-16 border-t border-rule pt-12">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="font-sans text-xl font-semibold [font-stretch:112%]">{project.title}</h3>
            <p className="shrink-0 font-sans text-sm tabular-nums text-muted">{project.period}</p>
          </div>
          <p className="mt-2 max-w-[62ch]">{project.summary}</p>
          <ProjectBody project={project} />
          <a href={project.link} target="_blank" rel="noreferrer" className="link mt-5 inline-block font-sans text-sm font-medium">
            Code on GitHub
          </a>
        </article>
      ))}

      {/* Smaller projects */}
      <div className="mt-16 border-t border-rule pt-12">
        <h3 className="font-sans text-base font-semibold">Smaller projects from training</h3>
        <ul className="mt-4 divide-y divide-rule">
          {MINOR_PROJECTS.map((project) => (
            <li key={project.name} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr_auto] sm:gap-6">
              <span className="font-sans font-medium">{project.name}</span>
              <span className="text-muted">{project.description}</span>
              <span className="flex gap-4 font-sans text-sm">
                {project.links.map((link) => (
                  <a key={link.link} href={link.link} target="_blank" rel="noreferrer" className="link">
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
