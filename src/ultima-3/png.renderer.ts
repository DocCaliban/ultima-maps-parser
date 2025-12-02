import { PNG } from "pngjs";
import { RenderTask } from "../types/render-task.type";

export type RGBA_Pixel = [number, number, number, number];
export type RGBA_Tile = RGBA_Pixel[][];

/**
 * Render a PNG from a tile map using RGBA tiles.
 * Automatically applies SOSARIA-style shift (>>2) to tile indices.
 * Supports optional scaling.
 *
 * @param task Tile rendering task
 * @param scale Optional scale factor (default = 1)
 * @returns PNG instance (use PNG.sync.write() to get Buffer)
 */
export const renderMapAsPng = (task: RenderTask, scale: number = 1): PNG => {
  const { width, height, tileWidth, tileHeight, tiles, layout } = task;

  const scaledTileWidth = tileWidth * scale;
  const scaledTileHeight = tileHeight * scale;

  const png = new PNG({
    width: width * scaledTileWidth,
    height: height * scaledTileHeight,
  });

  for (let mapY = 0; mapY < height; mapY++) {
    const row = layout?.[mapY] ?? [];

    for (let mapX = 0; mapX < width; mapX++) {
      const rawTile = row[mapX] ?? 0;
      const tileIndex = rawTile >> 2;
      const tilePixels = tiles[tileIndex] ?? [];

      for (let ty = 0; ty < tileHeight; ty++) {
        const tileRow = tilePixels[ty] ?? [];

        for (let tx = 0; tx < tileWidth; tx++) {
          const rgba = tileRow[tx] ?? [0, 0, 0, 255];

          // Draw the scaled pixels
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const x = mapX * scaledTileWidth + tx * scale + sx;
              const y = mapY * scaledTileHeight + ty * scale + sy;
              const idx = (y * png.width + x) << 2;

              png.data[idx + 0] = rgba[0] ?? 0;
              png.data[idx + 1] = rgba[1] ?? 0;
              png.data[idx + 2] = rgba[2] ?? 0;
              png.data[idx + 3] = rgba[3] ?? 255;
            }
          }
        }
      }
    }
  }

  return png;
};

/* ---------------------------------------------------------------------- */
/* Helper Defaults                                                        */
/* ---------------------------------------------------------------------- */

/** Create an empty RGBA tile */
const EMPTY_RGBA_TILE = (w: number, h: number): RGBA_Tile =>
  Array.from({ length: h }, () => EMPTY_RGBA_ROW(w));

/** Create an empty RGBA row */
const EMPTY_RGBA_ROW = (w: number): RGBA_Pixel[] =>
  Array.from({ length: w }, () => [0, 0, 0, 255]);
