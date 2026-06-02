"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";

/**
 * A floating button that uses lenis.scrollTo(0) to animate back to the top.
 * It only appears once Lenis reports we've scrolled past the first viewport.
 */
export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const lenis = useLenis(({ scroll }) => {
    setShow(scroll > window.innerHeight);
  });

  return (
    <button
      onClick={() =>
        lenis?.scrollTo(0, {
          duration: 1.6,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        })
      }
      className={`fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
