"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { REDUCED_MOTION_QUERY, tiltAngles } from "@/lib/motion";

// The design's tilt: at most 3 degrees on the X axis and 4 on the Y axis, in a 900px perspective, lifted 4px
const MAX_TILT_X_DEG = 3;
const MAX_TILT_Y_DEG = 4;
const PERSPECTIVE_PX = 900;
const LIFT_PX = 4;

interface TiltCardProps {
  className?: string;
  children: ReactNode;
}

/** Tracks the reduced-motion setting in a ref, so pointer moves read it without querying the media list */
const useReducedMotionRef = () => {
  const reduced = useRef(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => {
      reduced.current = media.matches;
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
};

const tiltTransform = (event: PointerEvent<HTMLElement>) => {
  const box = event.currentTarget.getBoundingClientRect();
  // Unit angles (-1..1) per axis, scaled to the design's different X and Y maximums
  const unit = tiltAngles(event.clientX - box.left, event.clientY - box.top, box.width, box.height, 1);
  const rx = (unit.rx * MAX_TILT_X_DEG).toFixed(2);
  const ry = (unit.ry * MAX_TILT_Y_DEG).toFixed(2);
  return `perspective(${PERSPECTIVE_PX}px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-${LIFT_PX}px)`;
};

const resetTilt = (event: PointerEvent<HTMLElement>) => {
  event.currentTarget.style.transform = "";
};

/** A card that leans toward a mouse or pen pointer; the .tilt class eases it back when the pointer leaves */
export const TiltCard = ({ className = "", children }: TiltCardProps) => {
  const reducedMotion = useReducedMotionRef();

  const tiltToward = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || reducedMotion.current) return;
    event.currentTarget.style.transform = tiltTransform(event);
  };

  return (
    <article onPointerMove={tiltToward} onPointerLeave={resetTilt} className={`tilt ${className}`}>
      {children}
    </article>
  );
};
