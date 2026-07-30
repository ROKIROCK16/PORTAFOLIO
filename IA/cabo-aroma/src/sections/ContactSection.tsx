import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Contact } from "@/types/content";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export function ContactSection({ contact }: { contact: Contact }) {
  const details = [
    { icon: MapPin, label: "Dirección", value: contact.address },
    { icon: Phone, label: "Teléfono", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: Mail, label: "Correo", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2">
      <Reveal className="space-y-6">
        <div className="space-y-4">
          {details.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="rounded-full bg-brand-green/10 p-2.5 text-brand-green">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-copper">{label}</p>
                {href ? (
                  <a href={href} className="text-sm text-brand-dark/80 hover:text-brand-green">{value}</a>
                ) : (
                  <p className="text-sm text-brand-dark/80">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-brand-beige/70 p-6">
          <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-brand-copper">
            <Clock size={16} /> Horario
          </p>
          <ul className="space-y-2 text-sm text-brand-dark/80">
            {contact.schedule.map((slot) => (
              <li key={slot.day} className="flex justify-between gap-4 border-b border-brand-green/10 pb-2 last:border-0">
                <span>{slot.day}</span>
                <span className="font-medium">{slot.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
          {contact.mapEmbed ? (
            <iframe src={contact.mapEmbed} title="Mapa" className="h-full w-full border-0" loading="lazy" />
          ) : (
            <Image src={contact.mapPlaceholder} alt="Mapa" fill className="object-cover" />
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ContactForm form={contact.form} />
      </Reveal>
    </div>
  );
}
