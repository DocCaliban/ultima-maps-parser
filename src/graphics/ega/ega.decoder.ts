import { RawPixelData } from '../types/bitmap.types';

/* EGA-specific constants */
const BITS_PER_PIXEL = 4; // 4 bits per pixel
const PIXEL_MASK = 0b1111; // 4-bit mask

/**
 * Decodes raw EGA tile data from a Uint8Array into a flat array of pixel indices.
 *
 * Each byte represents two pixels:
 * - The high nibble (bits 7-4) is the first pixel.
 * - The low nibble (bits 3-0) is the second pixel.
 *
 * @param data - Uint8Array containing EGA-encoded tile data
 * @returns Flat array of palette indices representing pixels
 */
export const decodeEGAData = (data: Uint8Array): RawPixelData => {
  if (!data || data.length === 0) {
    throw new Error('Data buffer cannot be null, undefined, or empty.');
  }

  return Array.from(data).flatMap((byte) => {
    const highPixel = (byte >> BITS_PER_PIXEL) & PIXEL_MASK;
    const lowPixel = byte & PIXEL_MASK;
    return [highPixel, lowPixel];
  });
};
