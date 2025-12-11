import { decodeCgaData } from '../../graphics/cga/cga.decoder';
import { applyPalette } from '../../graphics/palette/palette.operations';
import { Size2D } from '../../types/geometry.types';
import { Palette } from '../../graphics/types/palette.types';
import { reorderInterleavedRows } from '../../utility/cga.row.interleaver';
import { extractTiles, extractVGATiles } from './tile.decoders';
import { decodeEGAData } from '../../graphics/ega/ega.decoder';
import { decodeVGAData } from '../../graphics/vga/vga.decoder';

export const buildCgaGraphicsArray = (value: Uint8Array, size: Size2D, palette: Palette) => {
  const cgaPixelArray = decodeCgaData(value);
  const coloredPixelArray = applyPalette(cgaPixelArray, palette);
  const tiles = extractTiles(coloredPixelArray, size);
  const ordered = tiles.map((tile) =>{
    return reorderInterleavedRows(tile);
  })
  return ordered;
};

export const buildEgaGraphicsArray = (value: Uint8Array, size: Size2D, palette: Palette) => {
  const egaPixelArray = decodeEGAData(value);
  const coloredPixelArray = applyPalette(egaPixelArray, palette);
  const tiles = extractTiles(coloredPixelArray, size);
  return tiles;
};

export const buildVgaGraphicsArray = (value: Uint8Array, size: Size2D, palette: Palette) => {
  const vgaPixelArray = decodeVGAData(value);
  const coloredPixelArray = applyPalette(vgaPixelArray, palette);
  const tiles = extractTiles(coloredPixelArray, size);

  return tiles;
};
