"use client";

import { useRef, type ReactNode } from "react";
import { useLenis } from "lenis/react";

/**
 * Parallax wrapper driven entirely by the Lenis scroll loop.
 *
 * On every Lenis frame we measure where the element sits in the viewport and
 * translate it by `speed * distanceFromCenter`. Because the work happens inside
 * the Lenis callback, the movement is perfectly in sync with the smooth scroll.
 */
export default function Parallax({
  children,
  speed = 0.2,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLenis(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const distance = elementCenter - viewportCenter;
    el.style.transform = `translate3d(0, ${distance * -speed}px, 0)`;
  });

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
