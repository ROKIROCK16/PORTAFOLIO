"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { Contact } from "@/types/content";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sent";

const inputClass =
  "w-full rounded-2xl border border-brand-green/15 bg-white/80 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-copper";

export function ContactForm({ form }: { form: Contact["form"] }) {
  const [status, setStatus] = useState<Status>("idle");

  // Local-only submit: no external API. Swap for a server action later.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-brand-beige/60 p-6 sm:p-8">
      <h3 className="font-serif text-2xl text-brand-green">{form.title}</h3>
      <input required name="name" placeholder={form.fields.name} className={inputClass} />
      <input required type="email" name="email" placeholder={form.fields.email} className={inputClass} />
      <textarea required name="message" rows={5} placeholder={form.fields.message} className={inputClass} />
      <Button type="submit" variant="secondary" className="w-full sm:w-auto">
        <Send size={16} />
        {form.submitLabel}
      </Button>
      {status === "sent" ? (
        <p className="text-sm font-medium text-brand-green">{form.successMessage}</p>
      ) : null}
    </form>
  );
}
