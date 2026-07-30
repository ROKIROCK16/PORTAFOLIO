"use client";

import { useState } from "react";
import { Check, Loader2, RotateCcw, Save } from "lucide-react";
import { JsonEditor } from "@/components/studio/JsonEditor";
import { Button } from "@/components/ui/Button";
import { useContentEditor } from "@/hooks/useContentEditor";
import type { ContentKey } from "@/types/content";
import { cn } from "@/lib/utils";

const TABS: { key: ContentKey; label: string }[] = [
  { key: "settings", label: "Ajustes" },
  { key: "home", label: "Inicio" },
  { key: "about", label: "Nosotros" },
  { key: "gallery", label: "Galería" },
  { key: "menu", label: "Menú" },
  { key: "contact", label: "Contacto" },
];

export function StudioPanel() {
  const [active, setActive] = useState<ContentKey>("settings");
  const { data, status, error, update, save, reload } = useContentEditor(active);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm transition-colors",
              active === tab.key
                ? "border-brand-green bg-brand-green text-brand-cream"
                : "border-brand-green/20 text-brand-dark/70 hover:border-brand-green/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="sticky top-[73px] z-30 flex items-center gap-3 rounded-2xl border border-brand-green/10 bg-white/90 px-4 py-3 backdrop-blur">
        <Button onClick={() => void save()} disabled={status === "saving" || !data}>
          {status === "saving" ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Guardar cambios
        </Button>
        <Button variant="ghost" onClick={() => void reload()}>
          <RotateCcw size={16} /> Descartar
        </Button>
        {status === "saved" ? (
          <span className="flex items-center gap-1.5 text-sm text-brand-green">
            <Check size={16} /> Guardado en data/{active}.json
          </span>
        ) : null}
        {error ? <span className="text-sm text-red-600">{error}</span> : null}
      </div>

      {status === "loading" || !data ? (
        <p className="py-16 text-center text-sm text-brand-dark/50">Cargando…</p>
      ) : (
        <JsonEditor value={data} onChange={update} />
      )}
    </div>
  );
}
