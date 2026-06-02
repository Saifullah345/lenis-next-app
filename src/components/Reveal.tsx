"use client";

import { useRef, useState, type ReactNode } from "react";
import { useLenis } from "lenis/react";

/**
 * Scroll-reveal driven by the Lenis frame loop.
 *
 * Each Lenis tick we check whether the element has crossed a threshold into the
 * viewport and, once it has, fade + slide it into place. The reveal is therefore
 * gated by the smooth scroll position rather than a separate IntersectionObserver.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLenis(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      setVisible(true);
    }
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
