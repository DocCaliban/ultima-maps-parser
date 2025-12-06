import { Palette } from "../../graphics/types/palette.types";

/**
 * Standard CGA palette.
 *
 * Classic IBM CGA color set where pixel values 0–3 map to the four base colors:
 * - 0 → Black
 * - 1 → Cyan
 * - 2 → Magenta
 * - 3 → White
 */
export const cga: Palette = [
  [0, 0, 0],
  [0, 255, 255],
  [255, 0, 255],
  [255, 255, 255],
];
