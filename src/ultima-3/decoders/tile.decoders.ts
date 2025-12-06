// TODO: all this code could proabally be optamized better

import { PALETTES } from '../../data/palettes';
import { Palette } from '../../graphics/types/palette.types';
import { applyPaletteToPixel } from '../../graphics/palette/palette.operations';
import { decodeEGAData } from './ega.decoder';
import { Size2D } from '../../types/geometry.types';
import { RGBAPixel, RGBATile, TileSet } from '../../graphics/types/bitmap.types';

const TILE_SIZE = 16;

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

export const extractEgaTileDataToRgba = (data: Uint8Array, palette?: Palette): RGBAPixel[][][] => {
  const BYTES_PER_TILE = 128;

  const tileCount = Math.floor(data.length / BYTES_PER_TILE);
  const tiles: RGBAPixel[][][] = [];

  for (let i = 0; i < tileCount; i++) {
    const start = i * BYTES_PER_TILE;
    const tileBuffer = data.slice(start, start + BYTES_PER_TILE);

    // Decode raw 2bpp tile
    const rawPixels: number[][] = decodeEGAData(tileBuffer, {
      pixelDimensions: { x: TILE_SIZE, y: TILE_SIZE },
      bytesPerImage: BYTES_PER_TILE,
    });

    // Convert each pixel to RGBA
    const rgbaTile: RGBAPixel[][] = Array.from({ length: TILE_SIZE }, (_, y) =>
      Array.from({ length: TILE_SIZE }, (_, x) =>
        applyPaletteToPixel(rawPixels[y]?.[x] ?? 0, palette ?? PALETTES.EGA_C64)
      )
    );

    tiles.push(rgbaTile);
  }

  return tiles;
};
