"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return children;
}
