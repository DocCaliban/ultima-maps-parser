import { TileMapRenderOptions } from '../types/render-task.types';
import { Size2D } from '../types/geometry.types';
import { RenderedTileMap } from '../types/bitmap.types';

export const renderTileMap = (task: TileMapRenderOptions): RenderedTileMap => {
  const { gridSize, tileSize, tiles, layout, scale = 1 } = task;

  const scaledTileSize: Size2D = {
    width: tileSize.width * scale,
    height: tileSize.height * scale,
  };

  const imageSize: Size2D = {
    width: gridSize.width * scaledTileSize.width,
    height: gridSize.height * scaledTileSize.height,
  };

  const data = new Uint8ClampedArray(imageSize.width * imageSize.height * 4);

  for (let mapY = 0; mapY < gridSize.height; mapY++) {
    const row = layout?.[mapY] ?? [];

    for (let mapX = 0; mapX < gridSize.width; mapX++) {
      const rawTile = row[mapX] ?? mapY * gridSize.width + mapX; // fallback sequential index
      const tileIndex = rawTile >> 2; // keep your old shift logic if needed
      const tilePixels = tiles[tileIndex] ?? [];

      for (let ty = 0; ty < tileSize.height; ty++) {
        const tileRow = tilePixels[ty] ?? [];

        for (let tx = 0; tx < tileSize.width; tx++) {
          const rgba = tileRow[tx] ?? [0, 0, 0, 255];

          // Draw the scaled pixels
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const x = mapX * scaledTileSize.width + tx * scale + sx;
              const y = mapY * scaledTileSize.height + ty * scale + sy;
              const idx = (y * imageSize.width + x) << 2;

              data[idx + 0] = rgba[0];
              data[idx + 1] = rgba[1];
              data[idx + 2] = rgba[2];
              data[idx + 3] = rgba[3] ?? 255;
            }
          }
        }
      }
    }
  }

  return { size: { width: imageSize.width, height: imageSize.height }, data };
};
