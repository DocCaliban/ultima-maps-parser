// TODO: all this code could proabally be optamized better

import { palettes } from "../../constants/palettes";
import { RGBColor } from "../../types/common.types";
import { pixelToRgba } from "../../utility/pixel-to-rgba";
import { decodeCgaPixelData } from "./cga.decoder";
import { decodeEGAData } from "./ega.decoder";

const TILE_SIZE = 16;

export const extractCgaTileDataToRgba = (data: Uint8Array, palette?: RGBColor[]): number[][][][] => {

  const BYTES_PER_TILE = 64; // 16x16 2bpp CGA

  const tileCount = Math.floor(data.length / BYTES_PER_TILE);
  const tiles: number[][][][] = [];

  for (let i = 0; i < tileCount; i++) {
    const start = i * BYTES_PER_TILE;
    const tileBuffer = data.slice(start, start + BYTES_PER_TILE);

    // Decode raw 2bpp tile
    const rawPixels: number[][] = decodeCgaPixelData(tileBuffer, { bytesPerImage: BYTES_PER_TILE, pixelDimensions: { x: TILE_SIZE, y: TILE_SIZE } });

    // Convert each pixel to RGBA
    const rgbaTile: number[][][] = Array.from({ length: TILE_SIZE }, (_, y) =>
      Array.from({ length: TILE_SIZE }, (_, x) => pixelToRgba(rawPixels[y]?.[x] ?? 0, palette ?? palettes.cgaPalette))
    );

    tiles.push(rgbaTile);
  }

  return tiles;
};

export const extractEgaTileDataToRgba = (data: Uint8Array, palette?: RGBColor[]): number[][][][] => {

  const BYTES_PER_TILE = 128;

  const tileCount = Math.floor(data.length / BYTES_PER_TILE);
  const tiles: number[][][][] = [];

  for (let i = 0; i < tileCount; i++) {
    const start = i * BYTES_PER_TILE;
    const tileBuffer = data.slice(start, start + BYTES_PER_TILE);

    // Decode raw 2bpp tile
    const rawPixels: number[][] = decodeEGAData(tileBuffer, { pixelDimensions: { x: TILE_SIZE, y: TILE_SIZE }, bytesPerImage: BYTES_PER_TILE });

    // Convert each pixel to RGBA
    const rgbaTile: number[][][] = Array.from({ length: TILE_SIZE }, (_, y) =>
      Array.from({ length: TILE_SIZE }, (_, x) => pixelToRgba(rawPixels[y]?.[x] ?? 0, palette ?? palettes.c64MappedPalette))
    );

    tiles.push(rgbaTile);
  }

  return tiles;
};


