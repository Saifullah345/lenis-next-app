"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import type { ReactNode } from "react";
import GsapLenisBridge from "./GsapLenisBridge";

/**
 * Global smooth-scroll provider.
 *
 * `ReactLenis` with `root` mounts a single Lenis instance on <html> and wires
 * up its own requestAnimationFrame loop, so *every* scroll in the app is driven
 * by Lenis. Tune the feel of that animation here once and it applies everywhere.
 */
const options: LenisOptions = {
  // How fast the animated scroll catches up to the target (0–1, lower = smoother/heavier).
  lerp: 0.1,
  // Duration used by wheel/programmatic scroll easing.
  duration: 1.2,
  // Custom easing — an exponential ease-out for a premium feel.
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  // Bring the smooth animation to touch devices too.
  syncTouch: true,
  syncTouchLerp: 0.075,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  orientation: "vertical",
  gestureOrientation: "vertical",
  infinite: false,
  // GSAP's ticker drives the RAF loop instead (see GsapLenisBridge), so that a
  // single clock advances both Lenis and every GSAP ScrollTrigger animation.
  autoRaf: false,
};

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactLenis root options={options}>
      <GsapLenisBridge />
      {children}
    </ReactLenis>
  );
}
