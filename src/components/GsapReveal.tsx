"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Reusable GSAP scroll-reveal. Each direct child fades + slides into place,
 * staggered, when the wrapper scrolls into view. Driven by ScrollTrigger, which
 * is synced to Lenis via GsapLenisBridge — so it rides the same smooth scroll.
 */
export default function GsapReveal({
  children,
  className = "",
  y = 40,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(":scope > *", scope.current);
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.8,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
