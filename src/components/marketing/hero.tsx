import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getDict } from "@/lib/i18n/server";

export async function Hero() {
  const { t } = await getDict();
  return (
    <section className="relative isolate flex min-h-[min(88dvh,46rem)] items-center overflow-hidden">
      {/* Fon: nozik brend to'ri + ikkita yumshoq nur */}
      <div aria-hidden className="pl-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pl-glow -z-10 left-1/2 top-[-12%] h-[34rem] w-[34rem] -translate-x-1/2"
        style={{ background: "var(--brand-from)", opacity: 0.16 }}
      />
      <div
        aria-hidden
        className="pl-glow -z-10 bottom-[-18%] right-[-6%] h-[28rem] w-[28rem]"
        style={{ background: "var(--brand-to)", opacity: 0.14 }}
      />

      <Container className="w-full py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="pl-rise pl-rise-1 mx-auto inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1.5 text-[13px] font-medium text-brand-700 shadow-[var(--shadow-sm)] backdrop-blur">
            <span className="pl-gradient h-1.5 w-1.5 rounded-full" aria-hidden />
            {t.hero.badge}
          </p>

          <h1 className="pl-rise pl-rise-2 mt-6 text-balance text-5xl font-semibold leading-[1.04] tracking-tight text-[color:var(--foreground)] sm:text-6xl md:text-7xl">
            <span className="pl-gradient-text">{t.hero.titleAccent}</span>{" "}
            {t.hero.titleRest}
          </h1>

          <p className="pl-rise pl-rise-3 mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-[color:var(--muted-foreground)] sm:text-xl">
            {t.hero.lead}
          </p>

          <div className="pl-rise pl-rise-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/signup" size="lg" className="w-full sm:w-auto">
              {t.hero.start}
            </Button>
            <Button
              href="/demo"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.hero.demo}
            </Button>
          </div>

          <ul className="pl-rise pl-rise-4 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[color:var(--muted-foreground)]">
            {t.hero.points.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <CheckDot />
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm text-[color:var(--muted-foreground)]">
            {t.hero.trust}
          </p>
        </div>
      </Container>
    </section>
  );
}

function CheckDot() {
  return (
    <span
      aria-hidden
      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-100"
    >
      <svg
        className="h-2.5 w-2.5 text-brand-700"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7.5L6 10.5L11 4.5" />
      </svg>
    </span>
  );
}
