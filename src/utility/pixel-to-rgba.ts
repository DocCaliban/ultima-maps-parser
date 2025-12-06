import { Palette, RGBAColor } from "../types/palette.types";

/**
 * Convert a pixel index to RGBA using a given palette.
 *
 * @param pixel   The pixel index
 * @param palette Array of RGB colors: palette[index] = [r, g, b]
 * @returns RGBA color
 */
export const applyPaletteToPixel = (pixel: number, palette: Palette): RGBAColor => {
  const [r, g, b, a = 255] = palette[pixel] ?? [0, 0, 0, 255];
  return [r, g, b, a];
};
