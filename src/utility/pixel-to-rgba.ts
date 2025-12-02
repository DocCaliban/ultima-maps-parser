/**
 * Convert a pixel index to RGBA using a given palette.
 *
 * @param pixel   The pixel index
 * @param palette Array of RGB colors: palette[index] = [r, g, b]
 * @returns RGBA color
 */
export const pixelToRgba = (
  pixel: number,
  palette: [number, number, number][]
): [number, number, number, number] => {
  const [r, g, b] = palette[pixel] ?? [0, 0, 0];
  return [r, g, b, 255];
};