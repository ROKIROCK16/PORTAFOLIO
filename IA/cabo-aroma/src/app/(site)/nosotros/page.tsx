import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { getContent } from "@/lib/content";

export const metadata = { title: "Nosotros · Cabo Aroma" };

export default async function AboutPage() {
  const about = await getContent("about");

  return (
    <>
      <PageHero title={about.hero.title} subtitle={about.hero.subtitle} image={about.hero.image} />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={about.history.image} alt={about.history.title} fill sizes="50vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-4">
          <SectionTitle align="left" kicker="Desde 2019" title={about.history.title} />
          <p className="text-sm leading-relaxed text-brand-dark/70 sm:text-base">{about.history.text}</p>
        </Reveal>
      </section>

      <section className="bg-brand-beige/70 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
          {[about.mission, about.vision].map((block, index) => (
            <Reveal key={block.title} delay={index * 0.1}>
              <Card className="h-full p-8">
                <h3 className="font-serif text-2xl text-brand-green">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/70">{block.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-5 py-16">
        <Reveal><SectionTitle kicker="Lo que nos mueve" title="Valores" /></Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08}>
              <Card className="h-full p-6">
                <h4 className="font-serif text-lg text-brand-copper">{value.title}</h4>
                <p className="mt-2 text-sm text-brand-dark/70">{value.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-brand-beige/70 py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-5">
          <Reveal><SectionTitle kicker="Equipo" title="Las personas detrás de la barra" /></Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {about.team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.08}>
                <Card className="h-full">
                  <div className="relative aspect-[4/5] w-full">
                    <Image src={member.image} alt={member.name} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="font-serif text-lg text-brand-green">{member.name}</h4>
                    <p className="text-xs uppercase tracking-widest text-brand-copper">{member.role}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
