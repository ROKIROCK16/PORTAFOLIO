"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Settings } from "@/types/content";
import { cn } from "@/lib/utils";

export function Navbar({ settings }: { settings: Settings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-brand-cream/95 shadow-sm backdrop-blur" : "bg-brand-cream"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src={settings.logo} alt={settings.businessName} width={48} height={48} className="h-11 w-11" />
          <span className="font-serif text-lg tracking-[0.18em] text-brand-gold sm:text-xl">
            {settings.businessName.toUpperCase()}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-brand-green px-3 py-2 md:flex">
          {settings.nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm text-brand-cream/80 transition-colors hover:text-white",
                  active && "bg-brand-cream/15 text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-brand-green p-2.5 text-brand-cream md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <nav className="mx-5 mb-3 flex flex-col overflow-hidden rounded-2xl bg-brand-green p-2 md:hidden">
          {settings.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-brand-cream/90 transition-colors hover:bg-brand-cream/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
