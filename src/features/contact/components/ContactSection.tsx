import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { PERSON } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-muted">
    {children}
  </svg>
);

// Opens a new Gmail message to Vaibhav in the browser, for visitors without a mail app set up
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSON.email)}`;

const CHANNELS = [
  {
    label: "LinkedIn",
    value: PERSON.linkedinLabel,
    href: PERSON.linkedin,
    external: true,
    icon: (
      <Icon>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
      </Icon>
    ),
  },
  {
    label: "GitHub",
    value: PERSON.githubLabel,
    href: PERSON.github,
    external: true,
    icon: (
      <Icon>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </Icon>
    ),
  },
  {
    label: "CV",
    value: "Download PDF",
    href: PERSON.cv,
    external: false,
    icon: (
      <Icon>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M12 12v6M9 15l3 3 3-3" />
      </Icon>
    ),
  },
];

export const ContactSection = () => {
  return (
    <Section id="contact" title="Connect with me">
      <div className="grid items-start gap-12 xl:grid-cols-[1.1fr_1fr] xl:gap-14">
        <div>
          <p className="max-w-[46ch] text-[1.125rem] leading-[1.75]">
            I&apos;m looking for Java and Spring Boot backend roles. Send me a message here, or reach me wherever suits you.
          </p>

          <div className="mt-8">
            <p className="flex items-center gap-2 font-sans text-sm text-muted">
              <Icon>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </Icon>
              Email
            </p>
            <p className="mt-1.5 font-sans text-[clamp(1rem,4.6vw,1.2rem)] font-semibold tracking-tight [overflow-wrap:anywhere]">
              {PERSON.email}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-sm">
              <a href={`mailto:${PERSON.email}`} className="rounded-sm border border-ink px-4 py-2 font-medium transition-colors hover:bg-ink hover:text-paper">
                Send email
              </a>
              <a href={GMAIL_COMPOSE} target="_blank" rel="noreferrer" className="link">
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
                  className="group flex items-center gap-4 py-3.5 font-sans"
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
