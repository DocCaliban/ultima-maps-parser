import { Palette } from "../../graphics/types/palette.types";

/**
 * Alternate EGA palette variant.
 *
 * Similar to the standard EGA palette but with adjusted color tones.
 * Some entries intentionally duplicate the original data source.
 */
export const egaAlternate: Palette = [
  [29, 29, 29],     // 0  Black
  [69, 48, 222],    // 1  Blue
  [85, 198, 50],    // 2  Green
  [0, 252, 252],    // 3  Cyan
  [160, 63, 43],    // 4  Red
  [128, 128, 128],  // 5  Placeholder
  [252, 144, 0],    // 6  Orange
  [176, 176, 176],  // 7  Light gray
  [176, 176, 176],  // 8  Duplicate light gray
  [0, 0, 252],      // 9  Dark blue
  [0, 176, 0],      // 10 Green (duplicate)
  [0, 252, 252],    // 11 Cyan (duplicate)
  [252, 0, 0],      // 12 Red (duplicate)
  [252, 0, 252],    // 13 Magenta
  [252, 252, 0],    // 14 Yellow
  [252, 252, 252],  // 15 White
];