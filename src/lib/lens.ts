export interface PlateSize {
  width: number;
  height: number;
}

export interface LensFrame {
  x: number;
  y: number;
  r: number;
  visible: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** Where to draw the lens for a pointer at (px, py), measured from the plate's top-left corner */
export const lensFrame = (px: number, py: number, rect: PlateSize, radius: number): LensFrame => {
  const inside = px >= 0 && px <= rect.width && py >= 0 && py <= rect.height;
  return {
    x: clamp(px, 0, rect.width),
    y: clamp(py, 0, rect.height),
    r: radius,
    visible: inside,
  };
};
