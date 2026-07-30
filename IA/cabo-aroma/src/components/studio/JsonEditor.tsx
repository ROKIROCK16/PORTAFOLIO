"use client";

import { Plus, Trash2 } from "lucide-react";
import { FieldInput } from "@/components/studio/FieldInput";
import { blankLike } from "@/lib/object-path";

type Path = (string | number)[];

type Props = {
  value: unknown;
  path?: Path;
  label?: string;
  onChange: (path: Path, value: unknown) => void;
  depth?: number;
};

const humanize = (key: string | number) =>
  String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .trim();

/** Recursive editor: renders any JSON shape as a form. */
export function JsonEditor({ value, path = [], label, onChange, depth = 0 }: Props) {
  if (typeof value === "string" || typeof value === "number") {
    return <FieldInput label={humanize(label ?? path.at(-1) ?? "")} value={value} onChange={(v) => onChange(path, v)} />;
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(path, e.target.checked)} />
        {humanize(label ?? path.at(-1) ?? "")}
      </label>
    );
  }

  if (Array.isArray(value)) {
    const template = value[0];
    return (
      <section className="space-y-3 rounded-2xl border border-brand-green/10 bg-brand-beige/40 p-4">
        <header className="flex items-center justify-between">
          <h4 className="font-serif text-base capitalize text-brand-green">{humanize(label ?? path.at(-1) ?? "")}</h4>
          {template !== undefined ? (
            <button
              type="button"
              onClick={() => onChange(path, [...value, blankLike(template)])}
              className="flex items-center gap-1 rounded-full bg-brand-green px-3 py-1.5 text-xs text-brand-cream hover:bg-brand-dark"
            >
              <Plus size={14} /> Agregar
            </button>
          ) : null}
        </header>

        <div className="space-y-3">
          {value.map((item, index) => (
            <div key={index} className="relative rounded-xl border border-brand-green/10 bg-white/70 p-3 pr-11">
              <button
                type="button"
                aria-label="Eliminar"
                onClick={() => onChange(path, value.filter((_, i) => i !== index))}
                className="absolute right-2 top-2 rounded-lg p-1.5 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={15} />
              </button>
              <JsonEditor
                value={item}
                path={[...path, index]}
                label={`#${index + 1}`}
                onChange={onChange}
                depth={depth + 1}
              />
            </div>
          ))}
          {value.length === 0 ? <p className="text-xs text-brand-dark/50">Sin elementos.</p> : null}
        </div>
      </section>
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const scalars = entries.filter(([, v]) => v === null || typeof v !== "object");
    const groups = entries.filter(([, v]) => v !== null && typeof v === "object");

    return (
      <div className="space-y-4">
        {label && depth > 0 ? (
          <h4 className="font-serif text-base capitalize text-brand-copper">{humanize(label)}</h4>
        ) : null}

        {scalars.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {scalars.map(([key, v]) => (
              <JsonEditor
                key={key}
                value={v as string | number}
                path={[...path, key]}
                label={key}
                onChange={onChange}
                depth={depth + 1}
              />
            ))}
          </div>
        ) : null}

        {groups.map(([key, v]) => (
          <div key={key} className="rounded-2xl border border-brand-green/10 bg-white/60 p-4">
            <JsonEditor value={v} path={[...path, key]} label={key} onChange={onChange} depth={depth + 1} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
