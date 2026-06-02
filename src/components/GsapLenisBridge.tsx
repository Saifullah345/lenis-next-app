"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Bridges GSAP's ScrollTrigger to the single global Lenis instance.
 *
 * Lenis is configured with `autoRaf: false`, so GSAP's ticker becomes the one
 * clock that advances the smooth scroll (`lenis.raf`). On every Lenis scroll we
 * fire `ScrollTrigger.update`, so every GSAP scroll animation stays perfectly in
 * sync with the smooth scroll — and so do the existing `useLenis` callbacks,
 * which still run on each Lenis frame untouched.
 *
 * Renders nothing; it only lives inside <ReactLenis> to access the instance.
 */
export default function GsapLenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Disable GSAP's lag smoothing so Lenis stays the source of truth.
    gsap.ticker.lagSmoothing(0);

    // Recompute trigger positions once everything is wired up.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}
