"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS = [
  {
    n: "01",
    title: "Branding that drives conversion.",
    body: "We clarify your positioning, define a distinctive tone of voice, and build a visual system that works across acquisition and product.",
    bg: "bg-indigo-600",
  },
  {
    n: "02",
    title: "Product design people remember.",
    body: "From first wireframe to polished UI, every screen is crafted to feel inevitable — fast to ship, easy to extend, hard to forget.",
    bg: "bg-orange-500",
  },
  {
    n: "03",
    title: "Motion that earns attention.",
    body: "Scroll-driven storytelling, micro-interactions and transitions that guide the eye and make the whole product feel alive.",
    bg: "bg-emerald-600",
  },
  {
    n: "04",
    title: "Engineering that just ships.",
    body: "Production-grade front-ends wired to the same smooth scroll loop — performant, accessible, and ready to grow with you.",
    bg: "bg-rose-600",
  },
];

// Vertical fan (% of card height) between each card in the resting stack.
const FAN = 6;

/**
 * Peel-up stacking cards (GSAP ScrollTrigger, pinned, synced to Lenis).
 *
 * All cards are stacked and visible from the start — none slide in from the
 * bottom. The section pins, and as you scroll the front card moves straight up
 * and out while the rest shift up a slot, so the deck peels upward one card at a
 * time until the last card is left centred.
 */
export default function StackingCards() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card", root.current);
      const n = cards.length;

      // Resting state: fanned downward, front card (00) on top.
      gsap.set(cards, {
        yPercent: (i) => i * FAN,
        zIndex: (i) => n - i,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          // ~1.1 viewports of scroll per card → a quicker peel.
          end: () => "+=" + (n - 1) * 110 + "%",
          // Smoothing (in seconds) so the motion eases instead of snapping to scroll.
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Strictly one at a time: each card fully flies up and out before the
      // next one starts (tweens are appended sequentially, no overlap).
      for (let i = 0; i < n - 1; i++) {
        tl.to(cards[i], { yPercent: -150, opacity: 0, duration: 1 });
      }
    },
    { scope: root }
  );

  return (
    <section
      id="stack"
      ref={root}
      className="relative h-screen overflow-hidden bg-neutral-950"
    >
      <p className="absolute left-1/2 top-10 z-50 -translate-x-1/2 text-sm uppercase tracking-[0.3em] text-white/40">
        Stacking cards · scroll to peel the deck
      </p>

      <div className="grid h-full place-items-center px-4 sm:px-8">
        {CARDS.map((card) => (
          <div
            key={card.n}
            className="stack-card col-start-1 row-start-1 w-full max-w-5xl will-change-transform"
          >
            <div
              className={`${card.bg} flex min-h-[64vh] flex-col justify-between rounded-4xl p-8 shadow-2xl shadow-black/40 sm:p-12`}
            >
              <div className="flex items-start justify-between">
                <h3 className="max-w-2xl text-3xl font-black leading-tight text-white sm:text-5xl">
                  {card.title}
                </h3>
                <span className="font-mono text-lg text-white/60">
                  ({card.n})
                </span>
              </div>

              <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
                {card.body}
              </p>

              <div className="mt-10 flex gap-4 overflow-hidden">
                {[0, 1, 2, 3].map((k) => (
                  <div
                    key={k}
                    className="aspect-square w-1/4 flex-none rounded-2xl bg-white/15"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
