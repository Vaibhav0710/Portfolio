import { Section } from "@/components/layout/Section";
import { ABOUT_PARAGRAPHS, PERSON } from "@/lib/constants";

export const AboutSection = () => {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-14">
        <div className="max-w-[62ch] space-y-5 text-[1.125rem] leading-[1.75]">
          {ABOUT_PARAGRAPHS.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <figure className="order-first max-w-[16rem] lg:order-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PERSON.photo}
            alt={`Portrait of ${PERSON.name}`}
            width={256}
            height={320}
            className="aspect-[4/5] w-full rounded-md object-cover ring-1 ring-rule"
            referrerPolicy="no-referrer"
          />
          <figcaption className="mt-3 font-sans text-sm text-muted">{PERSON.name}, {PERSON.location}</figcaption>
        </figure>
      </div>
    </Section>
  );
};
