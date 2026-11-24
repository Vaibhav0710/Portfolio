"use client";

import { useState, type FormEvent } from "react";
import { WarningCircle } from "@phosphor-icons/react";
import { CONTACT_FORM, PERSON } from "@/lib/constants";

type Status = "idle" | "sending" | "sent" | "error";

// `.field` (globals.css) owns the input look and its 3px focus outline; no utility may override it
const CARD = "rise flex flex-col gap-4 rounded-[22px] border border-rule bg-plate p-7 font-sans";
const FIELD_WRAP = "flex flex-col gap-1.5";
const LABEL = "text-sm font-semibold";

// Messages go through Web3Forms (https://web3forms.com). Its access key is designed to be public;
// it decides which inbox receives the messages.
export const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Hidden spam trap: people never tick it, bots often do
    if (data.get("botcheck")) return;

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio message from ${data.get("name")}`,
          from_name: "Portfolio contact form",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error(result.message || `HTTP ${response.status}`);

      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("Contact form failed:", error);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={CARD} role="status">
        <h3 className="m-0 text-[22px] font-bold">{CONTACT_FORM.sentHeading}</h3>
        <p className="m-0 rounded-[14px] bg-tint p-[18px] text-base leading-[1.6]">{CONTACT_FORM.sentBody}</p>
        <button type="button" onClick={() => setStatus("idle")} className="link inline-flex min-h-11 items-center self-start text-sm">
          {CONTACT_FORM.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-labelledby="contact-form-title" className={CARD}>
      <h3 id="contact-form-title" className="m-0 text-[22px] font-bold">
        {CONTACT_FORM.heading}
      </h3>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className={FIELD_WRAP}>
        <label htmlFor="contact-name" className={LABEL}>
          {CONTACT_FORM.name}
        </label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" className="field" />
      </div>
      <div className={FIELD_WRAP}>
        <label htmlFor="contact-email" className={LABEL}>
          {CONTACT_FORM.email}
        </label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className="field" />
      </div>
      <div className={FIELD_WRAP}>
        <label htmlFor="contact-message" className={LABEL}>
          {CONTACT_FORM.message}
        </label>
        <textarea id="contact-message" name="message" required rows={4} className="field resize-y" />
      </div>

      {status === "error" && (
        <p role="alert" className="m-0 flex gap-2.5 rounded-[14px] bg-tint px-3.5 py-3 text-sm">
          <WarningCircle aria-hidden="true" size={20} weight="fill" className="shrink-0 text-accent" />
          <span>
            {CONTACT_FORM.error}{" "}
            <a href={`mailto:${PERSON.email}`} className="link">
              {PERSON.email}
            </a>
            .
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="press min-h-[50px] cursor-pointer rounded-full border-0 bg-ink text-base font-semibold text-paper"
      >
        {status === "sending" ? CONTACT_FORM.sending : CONTACT_FORM.send}
      </button>
    </form>
  );
};
