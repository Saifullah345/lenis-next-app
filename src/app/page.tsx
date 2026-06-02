import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import VelocitySkewText from "@/components/VelocitySkewText";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import StairCards from "@/components/StairCards";
import GsapShowcase from "@/components/GsapShowcase";
import GsapReveal from "@/components/GsapReveal";
import StackingCards from "@/components/StackingCards";

export default function Home() {
  return (
    <main className="relative">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <Parallax speed={0.15} className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18),transparent_60%)]" />
        </Parallax>

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-emerald-300/80">
          Next.js × Lenis
        </p>
        <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          Every scroll,
          <br />
          buttery smooth.
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/60 md:text-lg">
          One Lenis instance wraps the whole app, so the page scroll, the
          progress bar, parallax, reveals, velocity skew and the horizontal
          gallery are all driven by the same smooth animation loop.
        </p>
        <div className="mt-10 animate-bounce text-white/40">↓ scroll</div>
      </section>

      {/* ──────────────────────── PARALLAX ─────────────────────── */}
      <section
        id="parallax"
        className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 py-32"
      >
        <Reveal>
          <h2 className="text-center text-4xl font-bold md:text-6xl">
            Parallax depth
          </h2>
        </Reveal>

        <div className="relative grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <Parallax speed={0.35}>
            <Card title="Layer A" subtitle="speed 0.35" tint="bg-emerald-500/10" />
          </Parallax>
          <Parallax speed={0.15}>
            <Card title="Layer B" subtitle="speed 0.15" tint="bg-cyan-500/10" />
          </Parallax>
          <Parallax speed={0.55}>
            <Card title="Layer C" subtitle="speed 0.55" tint="bg-violet-500/10" />
          </Parallax>
        </div>
        <p className="max-w-md text-center text-sm text-white/50">
          Each card translates at its own rate against the Lenis scroll value —
          watch the telemetry HUD in the corner.
        </p>
      </section>

      {/* ───────────────────────── REVEAL ──────────────────────── */}
      <section
        id="reveal"
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-32"
      >
        <Reveal>
          <h2 className="text-center text-4xl font-bold md:text-6xl">
            Reveal on scroll
          </h2>
        </Reveal>
        <div className="mt-8 grid w-full max-w-3xl gap-4">
          {[
            "Gated by the smooth Lenis position",
            "Fades + slides into place",
            "Staggered with per-item delays",
            "No separate scroll listener needed",
          ].map((text, i) => (
            <Reveal key={text} delay={i * 120}>
              <div className="rounded-2xl border border-white/10 bg-white/3 p-6 text-lg">
                {text}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ──────────────────────── VELOCITY ─────────────────────── */}
      <section
        id="velocity"
        className="flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden px-6 py-32"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-white/40">
          Scroll fast — it bends
        </p>
        <VelocitySkewText text="Velocity reactive" />
        <VelocitySkewText text="Driven by Lenis" />
      </section>

      {/* ──────────────────── GSAP REVEAL ──────────────────────── */}
      <section
        id="gsap-reveal"
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-32"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-white/40">
          Powered by GSAP ScrollTrigger
        </p>
        <GsapReveal className="mt-8 grid w-full max-w-3xl gap-4">
          {[
            "ScrollTrigger synced to the Lenis loop",
            "One GSAP ticker drives the smooth scroll",
            "Staggered with a power3 ease",
            "Plays in, reverses out",
          ].map((text) => (
            <div
              key={text}
              className="rounded-2xl border border-white/10 bg-white/3 p-6 text-lg"
            >
              {text}
            </div>
          ))}
        </GsapReveal>
      </section>

      {/* ─────────────────── GSAP PINNED SHOWCASE ───────────────── */}
      <GsapShowcase />

      {/* ──────────────────── STACKING CARDS ────────────────────── */}
      <StackingCards />

      {/* ─────────────────────── STAIRCASE ─────────────────────── */}
      <StairCards />

      {/* ─────────────────────── HORIZONTAL ────────────────────── */}
      <HorizontalScrollSection />

      {/* ───────────────────────── OUTRO ───────────────────────── */}
      <section
        id="outro"
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-32 text-center"
      >
        <Reveal>
          <h2 className="text-4xl font-bold md:text-6xl">That&apos;s the loop.</h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="max-w-lg text-white/60">
            Smooth scroll · progress bar · live telemetry · scrollTo navigation ·
            pause / resume · parallax · reveal · velocity skew · horizontal
            scroll — every one powered by a single Lenis instance.
          </p>
        </Reveal>
      </section>
    </main>
  );
}

function Card({
  title,
  subtitle,
  tint,
}: {
  title: string;
  subtitle: string;
  tint: string;
}) {
  return (
    <div
      className={`flex h-64 flex-col justify-between rounded-3xl border border-white/10 ${tint} p-6`}
    >
      <span className="font-mono text-xs text-white/40">{subtitle}</span>
      <span className="text-2xl font-bold">{title}</span>
    </div>
  );
}
