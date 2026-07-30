"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
};

const IMAGE_KEYS = /(image|logo|src|placeholder|photo|icon)$/i;
const COLOR_KEYS = /(color|primary|secondary|beige|cream|dark|gold)$/i;
const LONG_KEYS = /(text|body|description|message|intro|highlight|subtitle)$/i;

const baseInput =
  "w-full rounded-xl border border-brand-green/15 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-brand-copper";

export function FieldInput({ label, value, onChange }: Props) {
  const isNumber = typeof value === "number";
  const isColor = COLOR_KEYS.test(label) && typeof value === "string" && value.startsWith("#");
  const isImage = IMAGE_KEYS.test(label) && typeof value === "string";
  const isLong = LONG_KEYS.test(label) && typeof value === "string" && value.length > 60;

  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-brand-dark/50">{label}</span>

      {isColor ? (
        <span className="flex items-center gap-2">
          <input
            type="color"
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded-lg border border-brand-green/15"
          />
          <input className={baseInput} value={String(value)} onChange={(e) => onChange(e.target.value)} />
        </span>
      ) : isLong ? (
        <textarea
          rows={4}
          className={cn(baseInput, "resize-y")}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span className="flex items-center gap-2">
          {isImage && value ? (
            <Image
              src={String(value)}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-lg object-cover"
            />
          ) : null}
          <input
            className={baseInput}
            type={isNumber ? "number" : "text"}
            value={String(value)}
            onChange={(e) => onChange(isNumber ? Number(e.target.value) : e.target.value)}
          />
        </span>
      )}
    </label>
  );
}
