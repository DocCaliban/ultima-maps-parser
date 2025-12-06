import { Palette } from '../types/palette.types';

/**
 * CGA “alternate” palette.
 *
 * This palette represents an alternate set of colors commonly used by CGA-era
 * software. Each entry is an RGB triplet `[r, g, b]`.
 *
 * Index mapping:
 * - 0 → Black
 * - 1 → Blue (dark green-ish variant)
 * - 2 → Red
 * - 3 → White (light cyan variant)
 */
export const cgaAlternate: Palette = [
  [0, 0, 0],
  [0, 127, 0],
  [200, 90, 90],
  [0, 148, 255],
];

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

/**
 * EGA palette adapted from the Commodore 64 color set.
 *
 * This version uses C64-inspired RGB values while preserving the 0–15 index
 * mapping used by EGA graphics. Intended for alternate rendering styles.
 */
export const egaC64: [number, number, number][] = [
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

/**
 * A collection of all exported palettes, grouped for convenience.
 */
export const palettes = {
  egaC64,
  cgaAlternate,
  egaAlternate,
  cga,
  ega,
};
