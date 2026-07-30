import Image from "next/image";
import type { Product } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg text-brand-green">{product.name}</h3>
          <span className="shrink-0 rounded-full bg-brand-beige px-3 py-1 text-xs font-semibold text-brand-copper">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-brand-dark/65">{product.description}</p>
      </div>
    </Card>
  );
}
