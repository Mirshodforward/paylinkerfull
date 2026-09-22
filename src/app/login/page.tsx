import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { BRAND_NAME, LOGO_SRC } from "@/lib/brand";

export const metadata = {
  title: `Kirish — ${BRAND_NAME}`,
  description: "Telegram orqali tezkor kirish",
};

export default function LoginPage() {
  return (
    <div className="relative isolate flex min-h-full flex-1 items-center justify-center overflow-hidden px-4 py-12">
      <div aria-hidden className="pl-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pl-glow -z-10 left-1/2 top-[-10%] h-[30rem] w-[30rem] -translate-x-1/2"
        style={{ background: "var(--brand-from)", opacity: 0.14 }}
      />
      <div
        aria-hidden
        className="pl-glow -z-10 bottom-[-14%] right-[-6%] h-[24rem] w-[24rem]"
        style={{ background: "var(--brand-to)", opacity: 0.12 }}
      />

      <div className="pl-rise w-full max-w-md rounded-[var(--radius-panel)] border border-[color:var(--border)] bg-white/90 p-6 shadow-[var(--shadow-lg)] backdrop-blur-xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src={LOGO_SRC}
            alt={BRAND_NAME}
            width={72}
            height={72}
            className="h-[72px] w-[72px] object-contain"
            priority
          />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Kirish
          </h1>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
            Telegram bot — tezkor kirish
          </p>
        </div>
        <div className="mt-7">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
