import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

type Props = { title: string; subtitle?: string; image: string };

export function PageHero({ title, subtitle, image }: Props) {
  return (
    <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden">
      <Image src={image} alt={title} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-brand-dark/55" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-end gap-2 px-5 pb-10">
        <Reveal>
          <h1 className="font-serif text-4xl text-brand-cream sm:text-5xl">{title}</h1>
          {subtitle ? <p className="mt-2 max-w-xl text-sm text-brand-cream/80 sm:text-base">{subtitle}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
