import Image from "next/image";
import type { Home } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = { hero: Home["hero"]; fallbackLogo: string };

export function HeroSection({ hero, fallbackLogo }: Props) {
  const logo = hero.logo || fallbackLogo;

  return (
    <section className="relative mx-auto max-w-[1600px] px-3 pt-3">
      <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden rounded-3xl">
        <Image src={hero.image} alt={hero.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-brand-dark/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-10 text-center sm:pb-14">
          <Reveal>
            {logo ? (
              <Image
                src={logo}
                alt={hero.logoAlt}
                width={96}
                height={96}
                priority
                className="mx-auto mb-5 h-20 w-20 drop-shadow-lg sm:h-24 sm:w-24"
              />
            ) : null}
            <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">{hero.kicker}</p>
            <h1 className="mt-3 font-serif text-4xl text-brand-cream sm:text-6xl">{hero.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-brand-cream/85 sm:text-base">{hero.subtitle}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href={hero.primaryCta.href} variant="secondary" size="lg">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={hero.secondaryCta.href}
                size="lg"
                className="bg-brand-cream/10 text-brand-cream backdrop-blur hover:bg-brand-cream hover:text-brand-green"
              >
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
