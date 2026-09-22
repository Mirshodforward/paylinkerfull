import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Cta() {
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
              Bugun boshlang — 10 kun bepul
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/70">
              Karta ma&apos;lumotisiz. Yoqmasa hech narsa to&apos;lamaysiz.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/signup" size="lg" variant="inverse" className="w-full sm:w-auto">
                Saytimni yaratish
              </Button>
              <Button href="/demo" size="lg" variant="outline" className="w-full sm:w-auto">
                Namunani ko&apos;rish
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
