import { ACTION_LABELS, CLOSING_LINE, CONTACT_LINKS, CONTACT_SECTION, PERSON, type ContactLink } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

// Web links open in a new tab; mailto: and tel: hand off to the visitor's own apps
const linkTarget = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

const ContactCard = ({ link }: { link: ContactLink }) => (
  <a
    href={link.href}
    {...linkTarget(link.href)}
    className="rowlink flex min-h-16 flex-col justify-center rounded-2xl border border-rule px-[18px] py-2 text-ink"
  >
    <span className="text-[13px] text-muted">{link.label}</span>
    <span className="text-[17px] font-semibold [overflow-wrap:anywhere]">{link.value}</span>
  </a>
);

export const ContactSection = () => (
  <section
    id="contact"
    aria-labelledby="contact-title"
    className="overflow-x-clip px-[clamp(20px,4vw,48px)] py-[clamp(100px,12vw,170px)]"
  >
    <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-7 text-center">
        <p className="m-0 font-sans text-sm uppercase tracking-[0.14em] text-muted">{CONTACT_SECTION.label}</p>
        <h2
          id="contact-title"
          className="grow-in m-0 max-w-[16ch] origin-center font-sans text-[clamp(40px,6.6vw,100px)] font-bold leading-[1.02] [font-stretch:118%]"
        >
          {CLOSING_LINE}
        </h2>
        <p className="m-0 max-w-[60ch] text-[17px] leading-[1.7] text-muted">{CONTACT_SECTION.notice}</p>
      </div>

      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-6">
        <div className="rise flex flex-col gap-2.5 font-sans">
          {CONTACT_LINKS.map((link) => (
            <ContactCard key={link.label} link={link} />
          ))}
          <a
            href={PERSON.cv}
            className="press mt-1.5 inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink text-base font-semibold text-paper no-underline"
          >
            {ACTION_LABELS.cv}
          </a>
        </div>
        <ContactForm />
      </div>
    </div>
  </section>
);
