import { MenuCard } from "@/components/cards/MenuCard";
import { PageHero } from "@/components/layout/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getContent } from "@/lib/content";

export const metadata = { title: "Menú · Cabo Aroma" };

export default async function MenuPage() {
  const menu = await getContent("menu");

  return (
    <>
      <PageHero title={menu.title} subtitle={menu.subtitle} image="/images/hero.svg" />

      <div className="mx-auto max-w-7xl px-5 py-12">
        <nav className="mb-12 flex flex-wrap justify-center gap-2">
          {menu.categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-brand-green/20 px-5 py-2 text-sm text-brand-dark/75 transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-cream"
            >
              {category.name}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {menu.categories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-28 space-y-8">
              <Reveal><SectionTitle align="left" title={category.name} /></Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                {category.products.map((product, index) => (
                  <Reveal key={product.id} delay={index * 0.05}>
                    <MenuCard product={product} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
