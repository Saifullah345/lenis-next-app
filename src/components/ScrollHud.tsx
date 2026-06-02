"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * A fixed HUD that surfaces the live Lenis scroll telemetry every frame:
 *  - lenis.scroll    → the current animated scroll position (px)
 *  - lenis.velocity  → scroll speed/sign
 *  - lenis.direction → -1 (up), 0 (idle), 1 (down)
 *  - lenis.progress  → 0 → 1 down the page
 *
 * Values are written directly to the DOM (refs) to avoid re-rendering React on
 * every scroll frame.
 */
export default function ScrollHud() {
  const scrollRef = useRef<HTMLSpanElement>(null);
  const velocityRef = useRef<HTMLSpanElement>(null);
  const directionRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useLenis(({ scroll, velocity, direction, progress }) => {
    if (scrollRef.current) scrollRef.current.textContent = scroll.toFixed(0);
    if (velocityRef.current)
      velocityRef.current.textContent = velocity.toFixed(2);
    if (directionRef.current)
      directionRef.current.textContent =
        direction > 0 ? "down ↓" : direction < 0 ? "up ↑" : "idle";
    if (progressRef.current)
      progressRef.current.textContent = `${(progress * 100).toFixed(0)}%`;
  });

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 hidden w-44 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-white/80 backdrop-blur md:block">
      <p className="mb-2 text-[10px] uppercase tracking-widest text-white/40">
        Lenis telemetry
      </p>
      <Row label="scroll" valueRef={scrollRef} />
      <Row label="velocity" valueRef={velocityRef} />
      <Row label="direction" valueRef={directionRef} />
      <Row label="progress" valueRef={progressRef} />
    </div>
  );
}

function Row({
  label,
  valueRef,
}: {
  label: string;
  valueRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-white/40">{label}</span>
      <span ref={valueRef} className="text-emerald-300">
        0
      </span>
    </div>
  );
}
