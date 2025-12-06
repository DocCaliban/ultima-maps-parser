import { Palette } from "../../graphics/types/palette.types";

/**
 * EGA palette adapted from the Commodore 64 color set.
 *
 * This version uses C64-inspired RGB values while preserving the 0–15 index
 * mapping used by EGA graphics. Intended for alternate rendering styles.
 */
export const egaC64: Palette = [
  [0, 0, 0],       // 0 Black
  [0, 0, 170],     // 1 Blue
  [0, 204, 85],    // 2 Green
  [170, 255, 238], // 3 Cyan
  [136, 0, 0],     // 4 Red
  [85, 85, 85],    // 5 Dark Gray
  [221, 136, 85],  // 6 Orange
  [204, 204, 204], // 7 Light Gray
  [204, 204, 204], // 8 Duplicate Light Gray
  [119, 119, 255], // 9 Bright Blue
  [119, 204, 119], // 10 Green (duplicate)
  [170, 255, 238], // 11 Cyan duplicate
  [255, 119, 119], // 12 Red duplicate
  [204, 68, 204],  // 13 Magenta
  [238, 238, 119], // 14 Yellow
  [255, 255, 255], // 15 White
];