import type { Home } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function MenuPreviewSection({ menuPreview }: { menuPreview: Home["menuPreview"] }) {
  return (
    <section className="bg-brand-beige/70 pb-24 text-center">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-5">
        <span className="text-2xl text-brand-green/50">✦ ❦ ✦</span>
        <h2 className="font-serif text-3xl text-brand-green sm:text-4xl">{menuPreview.title}</h2>
        <p className="text-sm text-brand-dark/70">{menuPreview.subtitle}</p>
        <ButtonLink href={menuPreview.cta.href} size="lg">
          {menuPreview.cta.label}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
