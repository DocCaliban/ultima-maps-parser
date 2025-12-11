import { Size2D } from '../../types/geometry.types';
import { RGBAPixel, RGBATile, TileSet } from '../../graphics/types/bitmap.types';

/**
 * Break a flat colored pixel array into sequential tiles with width x height,
 * returning each tile as a 2D array of RGBA pixels.
 *
 * @param pixels   Flat array of RGBA pixels
 * @param tileSize Width and height of each tile in pixels
 * @returns Array of tiles, each being a 2D array of RGBA pixels
 */
export const extractTiles = (pixels: RGBAPixel[], tileSize: Size2D): TileSet => {
  const tiles: TileSet = [];
  const pixelsPerTile = tileSize.width * tileSize.height;
  const totalTiles = Math.floor(pixels.length / pixelsPerTile);

  for (let t = 0; t < totalTiles; t++) {
    const tileStart = t * pixelsPerTile;
    const tile: RGBATile = [];

    for (let row = 0; row < tileSize.height; row++) {
      const rowStart = tileStart + row * tileSize.width;
      const tileRow: RGBAPixel[] = [];

      for (let col = 0; col < tileSize.width; col++) {
        tileRow.push(pixels[rowStart + col] ?? [0, 0, 0, 255]);
      }

      tile.push(tileRow);
    }

    tiles.push(tile);
  }

  return tiles;
};


export const extractVGATiles = (pixels: RGBAPixel[], imageSize: Size2D, tileSize: Size2D): RGBATile[] => {
  const tiles: RGBATile[] = [];
  const tilesX = Math.floor(imageSize.width / tileSize.width);
  const tilesY = Math.floor(imageSize.height / tileSize.height);

  for (let ty = 0; ty < tilesY; ty++) {
    for (let tx = 0; tx < tilesX; tx++) {
      const tile: RGBATile = [];

      for (let row = 0; row < tileSize.height; row++) {
        const tileRow: RGBAPixel[] = [];
        const y = ty * tileSize.height + row;

        for (let col = 0; col < tileSize.width; col++) {
          const x = tx * tileSize.width + col;
          const idx = y * imageSize.width + x; // row-major offset
          tileRow.push(pixels[idx] ?? [0, 0, 0, 255]);
        }

        tile.push(tileRow);
      }

      tiles.push(tile);
    }
  }

  return tiles;
};
