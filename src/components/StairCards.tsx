"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

const CARDS = [
  { n: "01", title: "Wheel", tint: "from-emerald-500/30" },
  { n: "02", title: "Touch", tint: "from-cyan-500/30" },
  { n: "03", title: "Easing", tint: "from-sky-500/30" },
  { n: "04", title: "scrollTo", tint: "from-violet-500/30" },
  { n: "05", title: "Velocity", tint: "from-fuchsia-500/30" },
];

// Vertical gap (px) between each step of the staircase when fully collapsed.
const STEP = 90;
// How much of the scroll each card waits before it starts rising (0..1).
const STAGGER = 0.12;

/**
 * "Staircase → single line" gallery driven by the Lenis scroll loop.
 *
 * The section is tall; while its inner viewport is pinned we map how far we've
 * scrolled *through* the section onto a 0→1 progress value. At progress 0 the
 * cards sit in a descending staircase (each one stepped down from the previous);
 * as progress climbs, each card — on its own staggered window — slides up until
 * they all align into one horizontal row.
 */
export default function StairCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLenis(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    // 0 when the section's top hits the viewport top, 1 when fully scrolled.
    const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      // Each card gets its own slice of the timeline so they line up one by one.
      const start = i * STAGGER;
      const local = Math.max(0, Math.min(1, (progress - start) / (1 - STAGGER * (CARDS.length - 1))));
      // Ease-out so the rise decelerates as it settles into the row.
      const eased = 1 - Math.pow(1 - local, 3);

      // Descending staircase: card 0 stays on top, each later card steps further
      // down — collapsing to 0 (one line) as `eased` → 1.
      const offset = i * STEP * (1 - eased);
      card.style.transform = `translate3d(0, ${offset}px, 0)`;
      card.style.opacity = `${0.3 + eased * 0.7}`;
    });
  });

  return (
    <section
      id="staircase"
      ref={sectionRef}
      className="relative h-[300vh] bg-neutral-950"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <p className="mb-12 text-sm uppercase tracking-[0.3em] text-white/40">
          Scroll — the staircase lines up
        </p>
        <div className="flex items-end gap-4 sm:gap-6">
          {CARDS.map((card, i) => (
            <div
              key={card.n}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`flex h-[40vh] w-[16vw] min-w-30 flex-col justify-between rounded-3xl border border-white/10 bg-linear-to-br ${card.tint} to-transparent p-5 will-change-transform`}
            >
              <span className="font-mono text-sm text-white/50">{card.n}</span>
              <h3 className="text-xl font-bold text-white md:text-3xl">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
