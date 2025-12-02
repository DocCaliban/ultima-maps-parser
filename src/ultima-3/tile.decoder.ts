// TODO: all this code could proabally be optamized better

import { cgaPalette, palettes } from "../constants/palettes";
import { pixelToRgba } from "../utility/pixel-to-rgba";

const BYTES_PER_TILE = 64; // 16x16 2bpp CGA
const TILE_SIZE = 16;

/**
 * Decode a 16x16 CGA tile from SHAPES.ULT.
 *
 * Each byte encodes 4 pixels (2 bits per pixel):
 *   Bits 7-6 -> pixel 0
 *   Bits 5-4 -> pixel 1
 *   Bits 3-2 -> pixel 2
 *   Bits 1-0 -> pixel 3
 *
 * The CGA tile stores rows in a half-order:
 *   - First 8 decoded rows -> even rows (0,2,4,...)
 *   - Next 8 decoded rows -> odd rows (1,3,5,...)
 *
 * @param {Uint8Array} tile - The 64-byte CGA tile data
 * @returns {number[][]} A 16x16 array of pixel values (0-3)
 */
export const decodeCgaTileData = (tile: Uint8Array): number[][] => {
  if (!tile || tile.length < BYTES_PER_TILE) {
    throw new Error("Tile buffer must be a Uint8Array of at least 64 bytes.");
  }

  // Initialize pixels with 0s
  const pixels: number[][] = Array.from({ length: TILE_SIZE }, () => Array(TILE_SIZE).fill(0));

  let byteIndex = 0;
  for (let row = 0; row < TILE_SIZE; row++) {
    const rowPixels = pixels[row] ?? Array(TILE_SIZE).fill(0); // safe fallback
    for (let col = 0; col < TILE_SIZE; col += 4) {
      const b = tile[byteIndex] ?? 0;
      byteIndex++;

      rowPixels[col + 0] = (b >> 6) & 0x03;
      rowPixels[col + 1] = (b >> 4) & 0x03;
      rowPixels[col + 2] = (b >> 2) & 0x03;
      rowPixels[col + 3] = b & 0x03;
    }
    pixels[row] = rowPixels; // assign back
  }

  // Reorder rows (CGA half-order)
  const ordered: number[][] = Array.from({ length: TILE_SIZE }, () => Array(TILE_SIZE).fill(0));
  for (let i = 0; i < 8; i++) {
    ordered[i * 2] = pixels[i] ?? Array(TILE_SIZE).fill(0);       // even rows
    ordered[i * 2 + 1] = pixels[i + 8] ?? Array(TILE_SIZE).fill(0);   // odd rows
  }

  return ordered;
}

/**
 * Decodes all 16x16 CGA tiles from SHAPES.ULT and returns an array of RGBA pixels.
 *
 * @param data The raw SHAPES.ULT data
 * @returns Array of tiles: tiles[tileIndex][y][x] = [r,g,b,a]
 */
export const extractCgaTileDataToRgba = (data: Uint8Array): number[][][][] => {
  
  const tileCount = Math.floor(data.length / BYTES_PER_TILE);
  const tiles: number[][][][] = [];

  for (let i = 0; i < tileCount; i++) {
    const start = i * BYTES_PER_TILE;
    const tileBuffer = data.slice(start, start + BYTES_PER_TILE);

    // Decode raw 2bpp tile
    const rawPixels: number[][] = decodeCgaTileData(tileBuffer);

    // Convert each pixel to RGBA
    const rgbaTile: number[][][] = Array.from({ length: TILE_SIZE }, (_, y) =>
      Array.from({ length: TILE_SIZE }, (_, x) => pixelToRgba(rawPixels[y]?.[x] ?? 0, palettes.alternateCgaPalette))
    );

    tiles.push(rgbaTile);
  }

  return tiles;
};

