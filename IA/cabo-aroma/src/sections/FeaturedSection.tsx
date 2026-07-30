import type { Home } from "@/types/content";
import { ProductCard } from "@/components/cards/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedSection({ featured }: { featured: Home["featured"] }) {
  return (
    <section className="bg-brand-beige/70 pb-20">
      <div className="mx-auto max-w-7xl space-y-10 px-5">
        <Reveal>
          <SectionTitle kicker="Destacados" title={featured.title} subtitle={featured.subtitle} />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.items.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
