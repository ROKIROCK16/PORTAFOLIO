import { cn } from "@/lib/utils";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({ kicker, title, subtitle, align = "center", className }: Props) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {kicker ? (
        <span className="text-xs uppercase tracking-[0.35em] text-brand-copper">{kicker}</span>
      ) : null}
      <h2 className="font-serif text-3xl leading-tight text-brand-green sm:text-4xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-sm text-brand-dark/70 sm:text-base">{subtitle}</p> : null}
      <span className="mt-1 h-px w-16 bg-brand-copper/50" />
    </header>
  );
}
