"use client";

import { type FormEvent, useState } from "react";
import { SplitButton } from "@/components/split-button";

/*
 * This demo has no backend, so both forms open the visitor's email app with the
 * message filled in. Nothing is sent until the visitor sends that email.
 */
const INBOX = "hello@olivelab.tech";
const EMAIL_APP_NOTE = "Your email app should now be open with this message ready to send.";

function openEmail(subject: string, body: string) {
  window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const labelClass = "mb-2 block text-small";

export function ContactForm() {
  const [note, setNote] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const company = String(form.get("company"));
    openEmail(
      company ? `Enquiry from ${company}` : "Website enquiry",
      `${form.get("message")}\n\n${form.get("name")}\n${form.get("email")}${company ? `\n${company}` : ""}`,
    );
    setNote(EMAIL_APP_NOTE);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 px-5 pb-8 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Full name
            </label>
            <input id="contact-name" name="name" type="text" required autoComplete="name" className="field" />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Work email
            </label>
            <input id="contact-email" name="email" type="email" required autoComplete="email" className="field" />
          </div>
        </div>
        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Company
          </label>
          <input id="contact-company" name="company" type="text" autoComplete="organization" className="field" />
        </div>
        <div>
          <label htmlFor="contact-message" className={labelClass}>
            How can we help?
          </label>
          <textarea id="contact-message" name="message" required rows={5} className="field resize-y" />
        </div>
        <p role="status" className="text-small text-muted">
          {note || "We respond to every message within one business day."}
        </p>
        <SplitButton type="submit">Send message</SplitButton>
      </div>
    </form>
  );
}

export function NewsletterForm() {
  const [note, setNote] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openEmail("Newsletter signup", `Please add ${form.get("email")} to the Olive Labs newsletter.`);
    setNote(EMAIL_APP_NOTE);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          className="field"
        />
        <SplitButton type="submit" className="shrink-0">
          Subscribe
        </SplitButton>
      </div>
      <p role="status" className="mt-3 text-small text-muted empty:mt-0">
        {note}
      </p>
    </form>
  );
}
