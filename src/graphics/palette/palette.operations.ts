import { RawPixelData, RGBAPixel } from '../types/bitmap.types';
import { Palette } from '../types/palette.types';

/**
 * Map a Uint8Array of pixel indices to an array of RGBA colors using a palette.
 *
 * @param data    Flat array of pixel indices
 * @param palette Palette of colors
 * @returns Array of RGBA pixels
 */
export const applyPalette = (data: RawPixelData, palette: Palette): RGBAPixel[] => {
  return Array.from(data).map((pixel) => {
    return applyPaletteToPixel(pixel, palette);
  });
};

/**
 * Convert a pixel index to RGBA using a given palette.
 *
 * @param pixel   The pixel index
 * @param palette Array of RGB colors: palette[index] = [r, g, b]
 * @returns RGBA color
 */
export const applyPaletteToPixel = (pixel: number, palette: Palette): RGBAPixel => {
  const [r, g, b, a = 255] = palette[pixel] ?? [0, 0, 0, 255];
  return [r, g, b, a];
};
