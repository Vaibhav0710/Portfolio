"use client";

import { useEffect, useRef, useState } from "react";
import { countValue, prefersReducedMotion } from "@/lib/motion";

// The design's count-up: 1.4 s, starting once VISIBLE_THRESHOLD of the number is on screen
const DURATION_MS = 1400;
const VISIBLE_THRESHOLD = 0.35;

interface CountUpProps {
  value: number;
  decimals: number;
  suffix: string;
  spokenSuffix: string;
  className?: string;
}

/** Counts 0 -> t=1 over DURATION_MS with requestAnimationFrame; returns the stop function */
const runCount = (setProgress: (t: number) => void): (() => void) => {
  let frame = 0;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION_MS);
    setProgress(t);
    if (t < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
};

/**
 * Renders the final number on the server and on the first client render, so the page is right
 * without script, with reduced motion and for crawlers. Only with IntersectionObserver and motion allowed
 * does it drop to 0 while off screen and count up once it scrolls into view.
 */
export const CountUp = ({ value, decimals, suffix, spokenSuffix, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined" || prefersReducedMotion()) return;
    let stopCount = () => {};
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          // Only a band still below the screen waits at zero; one already scrolled past keeps its final value
          if (entries.some((entry) => entry.boundingClientRect.top > 0)) setProgress(0);
          return;
        }
        observer.disconnect();
        stopCount = runCount(setProgress);
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      stopCount();
    };
  }, []);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {countValue(value, progress, decimals)}
        <span className="text-[0.42em] [font-stretch:100%]">{suffix}</span>
      </span>
      <span className="sr-only">{countValue(value, 1, decimals) + spokenSuffix}</span>
    </span>
  );
};
