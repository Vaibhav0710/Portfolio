import { Section } from "@/components/layout/Section";
import { PERSON } from "@/lib/constants";
import { CopyEmailButton } from "./CopyEmailButton";

export const ContactSection = () => {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-[56ch] text-[1.125rem] leading-[1.75]">
        I&apos;m looking for Java and Spring Boot backend roles in any city in India, remote, or with relocation. Email is the
        quickest way to reach me.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={`mailto:${PERSON.email}`}
          className="link break-all font-sans text-[clamp(1.25rem,4.2vw,2.25rem)] font-semibold tracking-tight [font-stretch:110%]"
        >
          {PERSON.email}
        </a>
        <CopyEmailButton email={PERSON.email} />
      </div>

      <dl className="mt-10 grid max-w-xl gap-x-8 gap-y-3 font-sans text-sm sm:grid-cols-[6rem_1fr]">
        <dt className="text-muted">LinkedIn</dt>
        <dd>
          <a href={PERSON.linkedin} target="_blank" rel="noreferrer" className="link">
            {PERSON.linkedinLabel}
          </a>
        </dd>
        <dt className="text-muted">GitHub</dt>
        <dd>
          <a href={PERSON.github} target="_blank" rel="noreferrer" className="link">
            {PERSON.githubLabel}
          </a>
        </dd>
        <dt className="text-muted">CV</dt>
        <dd>
          <a href={PERSON.cv} className="link">
            Vaibhav_Jain_Java_Backend_Developer_CV.pdf
          </a>
        </dd>
        <dt className="text-muted">Based in</dt>
        <dd>{PERSON.location}</dd>
      </dl>
    </Section>
  );
};
