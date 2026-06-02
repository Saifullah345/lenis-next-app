"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * A marquee-style heading that skews and shifts based on Lenis scroll velocity.
 *
 * `lenis.velocity` is signed (negative scrolling up, positive down) and grows
 * with speed, so it makes a great driver for momentum-based distortion effects.
 */
export default function VelocitySkewText({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLenis(({ velocity }) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.max(-30, Math.min(30, velocity));
    el.style.transform = `skewY(${clamped * 0.4}deg) translateX(${clamped * -2}px)`;
  });

  return (
    <div ref={ref} className="will-change-transform">
      <p className="whitespace-nowrap text-center text-5xl font-black uppercase tracking-tight text-white sm:text-7xl md:text-8xl">
        {text}
      </p>
    </div>
  );
}
