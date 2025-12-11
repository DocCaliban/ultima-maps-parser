import { RGBATile, RGBAPixel } from "../graphics/types/bitmap.types";

/**
 * Reorders rows in an interleaved pixel array.
 *
 * Some legacy formats (like CGA) store even and odd rows separately.
 * This function merges them into a single correctly ordered 2D array.
 *
 * @param pixels 2D array of pixel rows
 * @param height Total number of rows in the final image
 * @returns A new 2D array with rows reordered
 */
export const reorderInterleavedRows = (pixels: RGBATile): RGBATile => {
  const height = pixels.length;
  const half = Math.floor(height / 2);
  const rowLength = pixels[0]?.length ?? 0;

  return Array.from({ length: height }, (_, index) => {
    const baseIndex = Math.floor(index / 2);
    const offset = index % 2 === 0 ? 0 : half;
    return pixels[baseIndex + offset] ?? new Array(rowLength).fill(0);
  });
};
