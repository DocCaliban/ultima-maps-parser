import { reorderInterleavedRows } from '../../utility/cga.row.interleaver';
import { ImageDecoderOptions } from '../types/decoder.types';

const CGA_BIT_MASK = 0x03; // Mask to extract pixel data

/**
 * Decodes CGA image data from a Uint8Array into a 2D array of pixel values.
 *
 * Works for any image where each plane has equal bytes (e.g., 16x16 tiles or 8x8 font characters).
 *
 * @param data Uint8Array containing CGA-encoded image data.
 * @param options Configuration options:
 *  - pixelDimensions: { x, y } of the image.
 *  - bytesPerImage: total bytes for both planes.
 * @throws Error if the data buffer is not a valid Uint8Array or is smaller than bytesPerImage.
 * @returns 2D array of pixel values [row][col].
 */
export const decodeCgaPixelData = (
  data: Uint8Array,
  options: ImageDecoderOptions
): number[][] => {
  const { bytesPerImage, pixelDimensions } = options;

  if (!data || data.length < bytesPerImage) {
    throw new Error(`Data buffer must be a Uint8Array of at least ${bytesPerImage} bytes.`);
  }

  const pixels: number[][] = Array.from({ length: pixelDimensions.y }).map((_, row) => {
    return Array.from({ length: pixelDimensions.x }).map((_, col) => {
      const byteIndex = row * (pixelDimensions.x / 4) + Math.floor(col / 4);
      if (byteIndex < data.length) {
        const byte = data[byteIndex] ?? 0;

        // Extract pixel values from 2-bit interleaved CGA format
        switch (col % 4) {
          case 0:
            return (byte >> 6) & CGA_BIT_MASK;
          case 1:
            return (byte >> 4) & CGA_BIT_MASK;
          case 2:
            return (byte >> 2) & CGA_BIT_MASK;
          case 3:
            return byte & CGA_BIT_MASK;
        }
      }
      return 0; // Default if out of bounds
    });
  });

  return reorderInterleavedRows(pixels);
};

/**
 * Example usage for decoding the U3 font:
 *
 * Each font character is 8x8 pixels and takes 16 bytes (8 bytes per plane).
 */
// const fontOptions: ImageDecoderOptions = {
//   pixelDimensions: { x: 8, y: 8 },
//   bytesPerImage: 16,
// };

// const fontCharPixels = decodeCgaPixelData(fontData, fontOptions);
