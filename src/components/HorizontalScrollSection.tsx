"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

const CARDS = [
  { n: "01", title: "Smooth wheel", tint: "from-emerald-500/30" },
  { n: "02", title: "Synced touch", tint: "from-cyan-500/30" },
  { n: "03", title: "Custom easing", tint: "from-sky-500/30" },
  { n: "04", title: "scrollTo()", tint: "from-violet-500/30" },
  { n: "05", title: "Velocity", tint: "from-fuchsia-500/30" },
];

/**
 * A horizontal scroll gallery powered by Lenis' (vertical) scroll value.
 *
 * The outer section is tall; while its sticky inner viewport is pinned we map
 * how far we've scrolled *through* the section onto a horizontal translate of
 * the track. All computed inside the Lenis frame callback so it stays in sync
 * with the smooth scroll.
 */
export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLenis(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const rect = section.getBoundingClientRect();
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    // 0 when the section's top hits the viewport top, 1 when fully scrolled.
    const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
    const distance = track.scrollWidth - window.innerWidth;
    track.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
  });

  return (
    <section
      id="horizontal"
      ref={sectionRef}
      className="relative h-[300vh] bg-neutral-950"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <p className="mb-8 px-8 text-sm uppercase tracking-[0.3em] text-white/40">
          Horizontal scroll · driven by Lenis
        </p>
        <div
          ref={trackRef}
          className="flex gap-6 px-8 will-change-transform"
          style={{ width: "max-content" }}
        >
          {CARDS.map((card) => (
            <div
              key={card.n}
              className={`flex h-[60vh] w-[80vw] flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br ${card.tint} to-transparent p-10 sm:w-[55vw] md:w-[40vw]`}
            >
              <span className="font-mono text-sm text-white/50">{card.n}</span>
              <h3 className="text-4xl font-bold text-white md:text-6xl">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
