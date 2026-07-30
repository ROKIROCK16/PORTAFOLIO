import Link from "next/link";
import { Camera, Mail, MapPin, Phone, ThumbsUp, Video } from "lucide-react";
import type { Settings } from "@/types/content";

export function Footer({ settings }: { settings: Settings }) {
  const socials = [
    { href: settings.social.instagram, icon: Camera, label: "Instagram" },
    { href: settings.social.facebook, icon: ThumbsUp, label: "Facebook" },
    { href: settings.social.tiktok, icon: Video, label: "TikTok" },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="mt-24 bg-brand-green text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-serif text-xl tracking-[0.18em] text-brand-gold">
            {settings.businessName.toUpperCase()}
          </p>
          <p className="text-sm text-brand-cream/70">{settings.tagline}</p>
        </div>

        <div className="space-y-2 text-sm text-brand-cream/80">
          <p className="mb-3 font-medium text-brand-cream">Contacto</p>
          <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" />{settings.address}</p>
          <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-white"><Phone size={16} />{settings.phone}</a>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-white"><Mail size={16} />{settings.email}</a>
        </div>

        <div className="space-y-2 text-sm text-brand-cream/80">
          <p className="mb-3 font-medium text-brand-cream">Navegación</p>
          {settings.nav.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-brand-cream">Síguenos</p>
          <div className="flex gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-cream/25 p-2.5 transition-colors hover:bg-brand-cream hover:text-brand-green"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <Link
            href="/menu"
            className="inline-flex rounded-full bg-brand-cream px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-brand-green transition-transform hover:scale-105"
          >
            {settings.footer.note}
          </Link>
        </div>
      </div>

      <div className="border-t border-brand-cream/15 px-5 py-5 text-center text-xs text-brand-cream/60">
        {settings.footer.copyright}
      </div>
    </footer>
  );
}
