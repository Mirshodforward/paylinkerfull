import { cn } from "@/lib/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  bordered?: boolean;
};

export function Section({
  id,
  bordered = true,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        bordered && "border-t border-[color:var(--border)]",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
      )}
    >
      {eyebrow ? (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-[color:var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
