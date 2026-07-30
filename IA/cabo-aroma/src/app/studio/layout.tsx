import Link from "next/link";
import { ArrowLeft, Coffee } from "lucide-react";

export const metadata = { title: "Studio · Cabo Aroma" };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="sticky top-0 z-40 border-b border-brand-green/10 bg-brand-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2 font-serif text-lg text-brand-green">
            <Coffee size={20} /> Studio
          </div>
          <Link href="/" className="flex items-center gap-2 text-sm text-brand-dark/70 hover:text-brand-green">
            <ArrowLeft size={16} /> Ver sitio
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
