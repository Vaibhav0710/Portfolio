"use client";

import { useEffect, useRef, useState } from "react";
import { countValue, prefersReducedMotion } from "@/lib/motion";

// The design's count-up: 1.4 s, starting once 35% of the number is on screen
const DURATION_MS = 1400;
const VISIBLE_THRESHOLD = 0.35;

interface CountUpProps {
  value: number;
  decimals: number;
  suffix: string;
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
export const CountUp = ({ value, decimals, suffix, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined" || prefersReducedMotion()) return;
    let stopCount = () => {};
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          setProgress(0);
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

  const finalText = countValue(value, 1, decimals) + suffix;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{countValue(value, progress, decimals) + suffix}</span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
};
