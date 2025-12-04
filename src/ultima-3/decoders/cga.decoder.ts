import { ImageDecoderOptions } from "../types/decoder.types";

const CGA_BIT_MASK = 0x03; // Mask to extract pixel data

/**
 * Decodes CGA image data from a Uint8Array into a 2D array of pixel values.
 *
 * @param {Uint8Array} data Uint8Array containing CGA-encoded image data.
 * @param {ImageDecoderOptions} options Configuration options for decoding, including:
 *   @property {number} options.bytesPerImage The number of bytes allocated for each image.
 *   @property {Point2D} options.pixelDimensions Dimensions of the image in pixels, 
 *                                               where `x` is the width and `y` is the height.
 * @throws {Error} If the data buffer is not a valid Uint8Array or is smaller than the specified 
 *                 `bytesPerImage`.
 * @returns {number[][]} A 2D array of pixel values decoded from the CGA data, 
 *                       structured as an array of rows and columns.
 */
export const decodeCgaPixelData = (data: Uint8Array, options: ImageDecoderOptions): number[][] => {
  const { bytesPerImage, pixelDimensions } = options;

  if (!data || data.length < bytesPerImage) {
    throw new Error(`Data buffer must be a Uint8Array of at least [${bytesPerImage}] bytes.`);
  }

  const pixels: number[][] = Array.from({ length: pixelDimensions.y }).map((_, row) => {
    return Array.from({ length: pixelDimensions.x }).map((_, col) => {
      const byteIndex = row * (pixelDimensions.x / 4) + Math.floor(col / 4); // Calculate byte index
      if (byteIndex < data.length) {
        const byte = data[byteIndex] ?? 0;

        // Calculate pixel values based on the byte
        switch (col % 4) {
          case 0: return (byte >> 6) & CGA_BIT_MASK;
          case 1: return (byte >> 4) & CGA_BIT_MASK;
          case 2: return (byte >> 2) & CGA_BIT_MASK;
          case 3: return byte & CGA_BIT_MASK;
        }
      }
      return 0; // Default value if out of bounds
    });
  });

  // Simplified row reordering for interleave
  const ordered: number[][] = Array.from({ length: pixelDimensions.y }, (_, index) => {
    // Determine the appropriate row from the `pixels` array
    const baseIndex = Math.floor(index / 2); // 0-7 for index 0-15
    const offset = index % 2 === 0 ? 0 : 8; // 0 for even, 8 for odd
    return pixels[baseIndex + offset] ?? Array(pixelDimensions.y).fill(0);
  });

  return ordered;
}