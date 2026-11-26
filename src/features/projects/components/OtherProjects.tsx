import { COURIER_PROJECT, MINOR_PROJECTS, OTHER_PROJECTS, type MinorProject } from "@/lib/constants";

const courier = COURIER_PROJECT;

// `.rise` and `.lift` both set `transform`, so the wrapper rises in and the card inside it lifts on hover
const CourierCard = () => (
  <div className="rise flex">
    <article className="lift flex flex-1 flex-col gap-3 rounded-[22px] bg-paper p-8">
      <p className="m-0 font-sans text-sm text-muted">
        {courier.period} · {courier.stack}
      </p>
      <h2 className="m-0 font-sans text-[30px] font-bold [font-stretch:112%]">{courier.title}</h2>
      <p className="m-0 text-[17px] leading-[1.65]">{courier.summary}</p>
      <a
        href={courier.link}
        target="_blank"
        rel="noreferrer"
        className="link mt-auto inline-flex min-h-11 items-center self-start font-sans font-semibold"
      >
        {OTHER_PROJECTS.courierLink}
      </a>
    </article>
  </div>
);

const MinorRow = ({ project }: { project: MinorProject }) => (
  <li className="flex flex-col gap-1 border-b border-rule px-2 py-3">
    <span className="font-sans text-base font-bold">{project.name}</span>
    <span className="text-[15px] leading-normal text-muted">{project.description}</span>
    <span className="flex flex-wrap gap-x-5 font-sans text-sm">
      {project.links.map((link) => (
        <a key={link.link} href={link.link} target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center">
          {link.name}
        </a>
      ))}
    </span>
  </li>
);

/** The Courier system beside the smaller training projects */
export const OtherProjects = () => (
  <section aria-label={OTHER_PROJECTS.label} className="bg-plate px-[clamp(20px,4vw,48px)] py-[clamp(72px,9vw,120px)]">
    <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-8">
      <CourierCard />
      <div className="rise flex flex-col gap-3.5">
        <h2 className="m-0 font-sans text-xl font-bold">{OTHER_PROJECTS.earlierHeading}</h2>
        <ul className="m-0 flex list-none flex-col border-t border-rule p-0">
          {MINOR_PROJECTS.map((project) => (
            <MinorRow key={project.name} project={project} />
          ))}
        </ul>
      </div>
    </div>
  </section>
);
