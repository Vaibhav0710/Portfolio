"use client";

import type { PointerEvent, ReactNode } from "react";
import { prefersReducedMotion, tiltAngles } from "@/lib/motion";

// The design tilts at most 3-4 degrees in a 900px perspective and lifts the card 4px
const TILT_MAX_DEG = 4;
const PERSPECTIVE_PX = 900;
const LIFT_PX = 4;

interface TiltCardProps {
  className?: string;
  children: ReactNode;
}

const tiltToward = (event: PointerEvent<HTMLElement>) => {
  if (event.pointerType === "touch" || prefersReducedMotion()) return;
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  const { rx, ry } = tiltAngles(event.clientX - box.left, event.clientY - box.top, box.width, box.height, TILT_MAX_DEG);
  card.style.transform =
    `perspective(${PERSPECTIVE_PX}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-${LIFT_PX}px)`;
};

const resetTilt = (event: PointerEvent<HTMLElement>) => {
  event.currentTarget.style.transform = "";
};

/** A card that leans toward a mouse or pen pointer; the .tilt class eases it back when the pointer leaves */
export const TiltCard = ({ className = "", children }: TiltCardProps) => (
  <article onPointerMove={tiltToward} onPointerLeave={resetTilt} className={`tilt ${className}`}>
    {children}
  </article>
);
