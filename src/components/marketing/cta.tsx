import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getDict } from "@/lib/i18n/server";

export async function Cta() {
  const { t } = await getDict();
  return (
    <section className="border-t border-[color:var(--border)] bg-white py-20 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[var(--radius-panel)] bg-[color:var(--dark-surface)] px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pl-glow left-[8%] top-[-30%] h-[22rem] w-[22rem]"
            style={{ background: "var(--brand-from)", opacity: 0.4 }}
          />
          <div
            aria-hidden
            className="pl-glow bottom-[-40%] right-[4%] h-[22rem] w-[22rem]"
            style={{ background: "var(--brand-to)", opacity: 0.4 }}
          />

          <div className="relative">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/70">
              {t.cta.lead}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/signup" size="lg" variant="inverse" className="w-full sm:w-auto">
                {t.cta.primary}
              </Button>
              <Button href="/demo" size="lg" variant="outline" className="w-full sm:w-auto">
                {t.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
