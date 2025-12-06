import { Palette } from "../../graphics/types/palette.types";

/**
 * EGA palette used by *Ultima III* (extracted from `Shapes.ega`).
 *
 * Maps pixel indices 0–15 to RGB values. Some values are duplicated as they
 * appear in the source file. Alpha is not explicitly stored and defaults to 255.
 */
export const ega: Palette = [
  [0, 0, 0],       // 0  Black
  [0, 112, 252],   // 1  Blue
  [0, 176, 0],     // 2  Green
  [0, 252, 252],   // 3  Cyan
  [252, 0, 0],     // 4  Red
  [128, 128, 128], // 5  Placeholder
  [252, 144, 0],   // 6  Orange
  [176, 176, 176], // 7  Light gray
  [176, 176, 176], // 8  Duplicate light gray
  [0, 0, 252],     // 9  Dark blue
  [0, 176, 0],     // 10 Green (duplicate)
  [0, 252, 252],   // 11 Cyan (duplicate)
  [252, 0, 0],     // 12 Red (duplicate)
  [252, 0, 252],   // 13 Magenta
  [252, 252, 0],   // 14 Yellow
  [252, 252, 252], // 15 White
];