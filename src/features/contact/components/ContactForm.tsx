"use client";

import { useState, type FormEvent } from "react";
import { PERSON } from "@/lib/constants";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-sm border border-rule bg-plate px-3.5 py-2.5 font-sans text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none";

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
      <div className="rounded-md bg-plate p-6 ring-1 ring-rule sm:p-8" role="status">
        <p className="font-sans text-lg font-semibold">Message sent</p>
        <p className="mt-2 text-muted">Thanks for writing. I&apos;ll reply to the email address you gave.</p>
        <button type="button" onClick={() => setStatus("idle")} className="link mt-5 font-sans text-sm">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-md bg-plate p-6 ring-1 ring-rule sm:p-8">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="font-sans text-sm font-medium">
            Your name
          </label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="font-sans text-sm font-medium">
            Your email
          </label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="font-sans text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="A role you're hiring for, a question about my work, or just hello."
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-sm border-l-2 border-accent bg-tint px-3.5 py-2.5 font-sans text-sm">
          The message couldn&apos;t be sent. Please try again, or email me at{" "}
          <a href={`mailto:${PERSON.email}`} className="link">
            {PERSON.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-sm bg-ink px-6 py-3 font-sans text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
};
