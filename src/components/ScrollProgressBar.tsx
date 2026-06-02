"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * A top progress bar driven by Lenis' animated scroll progress.
 *
 * `useLenis(callback)` registers `callback` to run on every Lenis scroll frame.
 * We read `lenis.progress` (0 → 1) and write straight to the DOM via a ref so the
 * bar tracks the *smoothed* scroll value, not the raw native one.
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useLenis(({ progress }) => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progress})`;
    }
  });

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/10">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-500"
      />
    </div>
  );
}
