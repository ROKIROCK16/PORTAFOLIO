import Image from "next/image";
import type { Product } from "@/types/content";
import { formatPrice } from "@/lib/utils";

export function MenuCard({ product }: { product: Product }) {
  return (
    <article className="group flex items-center gap-4 rounded-2xl border border-brand-green/10 bg-white/70 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h3 className="truncate font-serif text-base text-brand-green">{product.name}</h3>
          <span className="ml-auto shrink-0 text-sm font-semibold text-brand-copper">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-brand-dark/60">{product.description}</p>
      </div>
    </article>
  );
}
