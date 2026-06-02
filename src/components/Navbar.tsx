"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";

const LINKS = [
  { id: "hero", label: "Top" },
  { id: "parallax", label: "Parallax" },
  { id: "reveal", label: "Reveal" },
  { id: "velocity", label: "Velocity" },
  { id: "horizontal", label: "Horizontal" },
  { id: "outro", label: "End" },
];

/**
 * Navbar demonstrating Lenis' programmatic API:
 *  - lenis.scrollTo(target, opts) for animated anchor navigation
 *  - lenis.stop() / lenis.start() to pause & resume the whole scroll
 */
export default function Navbar() {
  const lenis = useLenis();
  const [paused, setPaused] = useState(false);

  const scrollTo = (id: string) => {
    // Smoothly animate to an element selector with a custom duration.
    lenis?.scrollTo(`#${id}`, { offset: 0, duration: 1.4 });
  };

  const togglePause = () => {
    if (!lenis) return;
    if (paused) {
      lenis.start();
    } else {
      lenis.stop();
    }
    setPaused((p) => !p);
  };

  return (
    <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1.5 backdrop-blur">
        {LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="rounded-full px-3 py-1 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={togglePause}
          className="ml-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/20"
        >
          {paused ? "▶ Resume" : "⏸ Pause"}
        </button>
      </nav>
    </header>
  );
}
