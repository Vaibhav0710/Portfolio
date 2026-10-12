import type { ReactNode } from "react";
import { EnvelopeSimple, FileArrowDown, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/layout/Section";
import { PERSON } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

// Opens a new Gmail message to Vaibhav in the browser, for visitors without a mail app set up
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSON.email)}`;

const ICON_PROPS = { size: 20, "aria-hidden": true, className: "shrink-0 text-muted" } as const;

const CHANNELS: { label: string; value: string; href: string; external: boolean; icon: ReactNode }[] = [
  { label: "LinkedIn", value: PERSON.linkedinLabel, href: PERSON.linkedin, external: true, icon: <LinkedinLogo {...ICON_PROPS} /> },
  { label: "GitHub", value: PERSON.githubLabel, href: PERSON.github, external: true, icon: <GithubLogo {...ICON_PROPS} /> },
  { label: "CV", value: "Download CV", href: PERSON.cv, external: false, icon: <FileArrowDown {...ICON_PROPS} /> },
];

export const ContactSection = () => {
  return (
    <Section id="contact" title="Connect with me" layout="stacked">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="max-w-[46ch] text-[1.125rem] leading-[1.75]">
            I&apos;m looking for Java and Spring Boot backend roles. Send me a message here, or reach me wherever suits you.
          </p>

          <div className="mt-8">
            <p className="flex items-center gap-2 font-sans text-sm text-muted">
              <EnvelopeSimple {...ICON_PROPS} />
              Email
            </p>
            <p className="mt-1.5 font-sans text-[clamp(1rem,4.6vw,1.2rem)] font-semibold tracking-tight [overflow-wrap:anywhere]">
              {PERSON.email}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-sm">
              <a
                href={`mailto:${PERSON.email}`}
                className="pressable inline-flex min-h-11 items-center rounded-sm border border-ink px-5 font-medium hover:bg-ink hover:text-paper"
              >
                Email me
              </a>
              <a href={GMAIL_COMPOSE} target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center">
                Open in Gmail
              </a>
            </div>
          </div>

          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {CHANNELS.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex min-h-12 items-center gap-4 font-sans"
                >
                  {channel.icon}
                  <span className="w-16 shrink-0 text-sm text-muted sm:w-20">{channel.label}</span>
                  <span className="min-w-0 text-[0.95rem] underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-accent">
                    {channel.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid gap-x-6 gap-y-2 font-sans text-sm sm:grid-cols-[7rem_1fr]">
            <dt className="text-muted">Notice period</dt>
            <dd>{PERSON.noticePeriod}</dd>
            <dt className="text-muted">Open to</dt>
            <dd>{PERSON.openTo}</dd>
            <dt className="text-muted">Based in</dt>
            <dd>{PERSON.location}</dd>
          </dl>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
};
