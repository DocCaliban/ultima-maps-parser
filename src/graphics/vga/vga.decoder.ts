import { RawPixelData, RGBAPixel } from '../types/bitmap.types';
import { Palette } from '../../graphics/types/palette.types';

/* VGA-specific constants */
const PIXEL_MASK = 0xff; // 8-bit mask

/**
 * Decodes raw VGA data into a flat array of 8-bit palette indices.
 *
 * Each byte represents a single pixel (0-255). The previous implementation
 * mistakenly split bytes into two 4-bit pixels which is only valid for
 * EGA-like formats.
 *
 * @param data - Uint8Array containing VGA pixel indices
 * @returns Flat array of palette indices
 */
export const decodeVGAData = (data: Uint8Array): RawPixelData => {
  if (!data || data.length === 0) {
    throw new Error('Data buffer cannot be null, undefined, or empty.');
  }

  // Each byte is a single palette index (0-255)
  return Array.from(data).map((byte) => byte & PIXEL_MASK);
};


/**
 * Decode a VGA palette file buffer into a `Palette`.
 *
 * The common U3 palette format (`U3VGA.PAL`) stores 256 entries as 3 bytes
 * each (R, G, B) where each component is a 6-bit value in the range 0–63.
 * Some palettes may already use 0–255 values; this function will auto-detect
 * and scale 6-bit components up to 0–255 when necessary.
 *
 * @param data - Uint8Array containing palette bytes (length should be >= 3*n)
 * @returns Palette array of `[r,g,b,a]` tuples with components in 0–255
 */
export const decodeVGAPalette = (data: Uint8Array): Palette => {
  if (!data || data.length === 0) {
    throw new Error('Palette buffer cannot be null, undefined, or empty.');
  }

  const entries = Math.floor(data.length / 3);
  if (entries === 0) {
    throw new Error('Palette buffer too small; expected at least 3 bytes per entry.');
  }

  // Quick check: if max component <= 63 then we assume 6-bit components
  let max = 0;
  const scanLen = Math.min(data.length, 3 * 16);
  for (let j = 0; j < scanLen; j++) {
    const v = data[j] ?? 0;
    if (v > max) max = v;
  }

  const is6bit = max <= 63;

  const palette: Palette = [];
  for (let i = 0; i < entries; i++) {
    const rRaw = data[i * 3]!;
    const gRaw = data[i * 3 + 1]!;
    const bRaw = data[i * 3 + 2]!;

    const r = is6bit ? Math.round((rRaw * 255) / 63) : Math.min(255, Math.max(0, rRaw));
    const g = is6bit ? Math.round((gRaw * 255) / 63) : Math.min(255, Math.max(0, gRaw));
    const b = is6bit ? Math.round((bRaw * 255) / 63) : Math.min(255, Math.max(0, bRaw));

    palette.push([r, g, b, 255] as RGBAPixel);
  }

  return palette;
};
