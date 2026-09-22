import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium tracking-tight " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-200 " +
  "disabled:pointer-events-none disabled:opacity-50 select-none " +
  "active:translate-y-px";

const variants: Record<Variant, string> = {
  /** Asosiy CTA — logo gradienti, ustida oq matn */
  primary:
    "pl-gradient text-white border border-transparent shadow-[var(--shadow-brand)] " +
    "hover:brightness-[1.06] hover:shadow-[0_14px_36px_-10px_rgba(91,69,240,0.55)]",
  /** Ikkilamchi — oq karta, brend chegara va matn */
  secondary:
    "bg-white text-brand-700 border border-brand-200 shadow-[var(--shadow-sm)] " +
    "hover:border-brand-400 hover:bg-brand-50",
  /** Chegarasiz — ro'yxat va ikkinchi darajali amallar */
  ghost:
    "bg-transparent text-[color:var(--muted-foreground)] border border-transparent " +
    "hover:bg-brand-50 hover:text-brand-700",
  /** To'q fon ustida — oq to'ldirilgan */
  inverse:
    "bg-white text-brand-700 border border-white hover:bg-brand-50",
  /** To'q fon ustida — faqat chegara */
  outline:
    "bg-white/8 text-white border border-white/25 backdrop-blur-sm hover:bg-white/16",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-[var(--radius-control)]",
  md: "h-11 px-5 text-[15px] rounded-[var(--radius-control)]",
  lg: "h-12 px-7 text-base rounded-[var(--radius-control)] sm:h-[3.25rem]",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
