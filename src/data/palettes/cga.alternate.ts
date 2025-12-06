import { Palette } from "../../graphics/types/palette.types";

/**
 * CGA "alternate" palette.
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
