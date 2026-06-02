"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PANELS = [
  { title: "Pinned", tint: "from-emerald-500/30", body: "The section pins while the timeline scrubs." },
  { title: "Scrubbed", tint: "from-cyan-500/30", body: "Every property is tied to scroll progress." },
  { title: "Synced", tint: "from-violet-500/30", body: "GSAP shares one clock with Lenis." },
];

/**
 * A pinned, scrubbed GSAP section. While the section is pinned, a single
 * ScrollTrigger timeline slides the panels horizontally and scales each one as
 * it reaches centre — all scrubbed by scroll progress. ScrollTrigger is synced
 * to Lenis through GsapLenisBridge, so the pin tracks the smooth scroll exactly.
 */
export default function GsapShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".gsap-panel", track.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + (track.current?.scrollWidth ?? 0),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Slide the whole track so the last panel ends flush with the viewport.
      tl.to(track.current, {
        x: () => -((track.current?.scrollWidth ?? 0) - window.innerWidth),
        ease: "none",
      });

      // Pop each panel as it crosses the centre.
      panels.forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { scale: 0.9, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left center",
              end: "center center",
              scrub: true,
            },
          }
        );
        gsap.set(panel, { zIndex: PANELS.length - i });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="gsap"
      ref={root}
      className="relative h-screen overflow-hidden bg-neutral-950"
    >
      <p className="absolute left-8 top-10 z-10 text-sm uppercase tracking-[0.3em] text-white/40">
        GSAP ScrollTrigger · pinned + scrubbed
      </p>
      <div
        ref={track}
        className="flex h-full items-center gap-8 px-[10vw]"
        style={{ width: "max-content" }}
      >
        {PANELS.map((panel) => (
          <div
            key={panel.title}
            className={`gsap-panel flex h-[60vh] w-[70vw] flex-col justify-between rounded-3xl border border-white/10 bg-linear-to-br ${panel.tint} to-transparent p-10 will-change-transform sm:w-[48vw] md:w-[34vw]`}
          >
            <h3 className="text-4xl font-bold text-white md:text-6xl">
              {panel.title}
            </h3>
            <p className="max-w-xs text-lg text-white/60">{panel.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
