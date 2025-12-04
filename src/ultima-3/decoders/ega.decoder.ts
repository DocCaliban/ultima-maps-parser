import { PIXELS_PER_BYTE, BITS_PER_BYTE, BITS_PER_PIXEL } from "../../constants/image.constants";
import { ImageDecoderOptions } from "../types/decoder.types";

const CGA_BIT_MASK = 0x0f; // Mask to extract pixel data

/**
 * Decodes raw image data from a compressed Uint8Array format into a 2D array of pixel values.
 *
 * Each byte in the input array represents two pixels, where the high nibble encodes the first pixel
 * and the low nibble encodes the second pixel.
 *
 * @param {Uint8Array} data A Uint8Array representing the encoded tile.
 * @param {Options} options Options for decoding image data.
 * @throws {Error} If the input data is not a Uint8Array or does not contain exactly the correct bytes.
 * @returns {number[][]} A 2D array (16x16) of pixel values decoded from the input tile, 
 *                       where each value represents a pixel's color index.
 */
export const decodeEGAData = (data: Uint8Array, options: ImageDecoderOptions): number[][] => {
  const { bytesPerImage, pixelDimensions } = options;

  if (!data || data.length < bytesPerImage) {
    throw new Error(`Data buffer must be a Uint8Array of at least [${bytesPerImage}] bytes.`);
  }

  const pixels: number[][] = Array.from({ length: pixelDimensions.y }).map((_, row) => {
    return Array.from({ length: pixelDimensions.y }).map((_, col) => {
      const byteIndex = row * (pixelDimensions.x / PIXELS_PER_BYTE) + Math.floor(col / PIXELS_PER_BYTE); // Calculate byte index
      if (byteIndex < data.length) {
        const byte = data[byteIndex] ?? 0;

        // Decode the pixel based on column index using constants
        return col % 2 === 0
          ? (byte >> (BITS_PER_BYTE - BITS_PER_PIXEL)) & CGA_BIT_MASK
          : byte & CGA_BIT_MASK; // High nibble for even cols, low nibble for odd
      }
      return 0; // Default value if out of bounds
    });
  });
  return pixels;
}
