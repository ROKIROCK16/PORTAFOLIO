"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/types/content";
import { cn } from "@/lib/utils";

export function Gallery({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(
    () => ["Todo", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [active, setActive] = useState("Todo");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const visible = active === "Todo" ? items : items.filter((i) => i.category === active);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm transition-colors",
              active === category
                ? "border-brand-green bg-brand-green text-brand-cream"
                : "border-brand-green/20 text-brand-dark/70 hover:border-brand-green/50"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              onClick={() => setLightbox(item)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="group relative aspect-square overflow-hidden rounded-3xl"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 3}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/80 to-transparent p-4 text-left text-sm text-brand-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.alt}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-dark/85 p-6"
          >
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              className="relative h-[70vh] w-full max-w-4xl overflow-hidden rounded-3xl"
            >
              <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
