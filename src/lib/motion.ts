export interface TiltAngles {
  rx: number;
  ry: number;
}

const DEFAULT_MAX_TILT = 6;

// Scroll entrance classes from motion.css; each card in a row pops in a little after the one before it
const ENTRANCE_CLASSES = ["pop", "pop d2", "pop d3", "pop d4"];

/** The entrance class for the card at `index`; cards past the fourth share the last delay */
export const entranceClass = (index: number): string =>
  ENTRANCE_CLASSES[Math.min(Math.max(index, 0), ENTRANCE_CLASSES.length - 1)];

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** True when the visitor asked for less motion; false on the server or when the browser cannot say */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// Turns -0 into 0 so callers and tests never see a signed zero
const unsigned = (value: number) => value + 0;

/** The count-up value at progress t (0..1), eased out with a cubic so it slows into the target */
export const countValue = (target: number, t: number, decimals: number): string => {
  const progress = clamp(t, 0, 1);
  const eased = 1 - Math.pow(1 - progress, 3);
  return (target * eased).toFixed(decimals);
};

/**
 * Card tilt in degrees for a pointer at (x, y) inside a w×h card, measured from its top-left corner.
 * Same signs as the design: pointer up tips the top back (positive rotateX), pointer right turns
 * the card right (positive rotateY). Each axis reaches `max` at the card's edge.
 */
export const tiltAngles = (x: number, y: number, w: number, h: number, max = DEFAULT_MAX_TILT): TiltAngles => {
  if (w <= 0 || h <= 0) return { rx: 0, ry: 0 };
  const fromCentreX = clamp(x / w, 0, 1) - 0.5;
  const fromCentreY = clamp(y / h, 0, 1) - 0.5;
  return {
    rx: unsigned(-fromCentreY * 2 * max),
    ry: unsigned(fromCentreX * 2 * max),
  };
};
