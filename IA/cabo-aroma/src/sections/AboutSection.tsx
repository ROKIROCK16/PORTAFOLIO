import Image from "next/image";
import type { Home } from "@/types/content";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection({ about }: { about: Home["about"] }) {
  return (
    <section id="nosotros" className="bg-brand-beige/70 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1fr_1.1fr_0.6fr]">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-sm">
            <Image src={about.image} alt="Interior de la cafetería" fill sizes="33vw" className="object-cover" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 text-center lg:text-left">
          <p className="font-serif text-xl leading-relaxed text-brand-copper sm:text-2xl">{about.intro}</p>
          <p className="text-sm leading-relaxed text-brand-dark/70 sm:text-base">{about.body}</p>
          <p className="font-serif text-lg text-brand-copper">{about.highlight}</p>
        </Reveal>

        <Reveal delay={0.2} className="hidden justify-center lg:flex">
          <Image src={about.sideImage} alt="Vaso de café" width={260} height={320} className="w-full max-w-[240px]" />
        </Reveal>
      </div>
    </section>
  );
}
