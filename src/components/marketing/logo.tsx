import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME, LOGO_SRC } from "@/lib/brand";
import { cn } from "@/lib/cn";

/** @deprecated Logo endi bitta rasm — variantlar saqlanib qolgan (chaqiruvchilar buzilmasin uchun) */
export type LogoVariantKey = "v1" | "v2" | "v3";

type LogoProps = {
  className?: string;
  variant?: "default" | "inverse";
  mark?: LogoVariantKey;
  /** Belgi o'lchami (px) */
  size?: number;
  /** Faqat belgi — yozuvsiz */
  markOnly?: boolean;
};

export function Logo({
  className,
  variant = "default",
  size = 26,
  markOnly = false,
}: LogoProps) {
  const inverse = variant === "inverse";
  return (
    <Link
      href="/"
      aria-label={`${BRAND_NAME} bosh sahifa`}
      className={cn(
        "inline-flex items-center gap-2 text-[16px] font-semibold tracking-tight",
        inverse ? "text-white" : "text-[color:var(--foreground)]",
        className,
      )}
    >
      <LogoMark size={size} />
      {markOnly ? null : <span>{BRAND_NAME}</span>}
    </Link>
  );
}

export function LogoMark({
  size = 24,
  className,
}: {
  /** @deprecated endi ta'sir qilmaydi */
  variant?: LogoVariantKey;
  /** @deprecated logo rangli — inversiya shart emas */
  inverse?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={cn("shrink-0 object-contain", className)}
      priority
      aria-hidden
    />
  );
}
