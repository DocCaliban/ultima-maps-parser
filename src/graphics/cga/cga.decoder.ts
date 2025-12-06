import { RawPixelData } from '../types/bitmap.types';

/*
 * Mask used to extract a single 2-bit pixel from a byte.
 * Each CGA byte stores 4 pixels, 2 bits per pixel.
 */
const PIXEL_MASK = 0b11;

/**
 * Decode raw CGA data into a flat array of pixel indices.
 *
 * CGA format packs 4 pixels per byte, with each pixel represented
 * by 2 bits (0–3). The first pixel is in the most significant bits,
 * and the fourth pixel is in the least significant bits.
 *
 * @param data - Uint8Array containing raw CGA-encoded bytes
 * @returns Flat array of pixel indices (0–3) representing the image
 */
export const decodeCgaData = (data: Uint8Array): RawPixelData => {
  return Array.from(data).flatMap((byte) => {
    // Extract each of the 4 pixels from the byte using bitwise operations
    return [(byte >> 6) & PIXEL_MASK, (byte >> 4) & PIXEL_MASK, (byte >> 2) & PIXEL_MASK, byte & PIXEL_MASK];
  });
};
