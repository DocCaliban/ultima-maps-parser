import { decodeCgaData } from '../../graphics/cga/cga.decoder';
import { applyPalette } from '../../graphics/palette/palette.operations';
import { Size2D } from '../../types/geometry.types';
import { Palette } from '../../graphics/types/palette.types';
import { reorderInterleavedRows } from '../../utility/cga.row.interleaver';
import { extractTiles } from './tile.decoders';

export const buildCgaGraphicsArray = (value: Uint8Array, size: Size2D, palette: Palette) => {
  const cgaPixelArray = decodeCgaData(value);
  const coloredPixelArray = applyPalette(cgaPixelArray, palette);
  const tiles = extractTiles(coloredPixelArray, size);
  const ordered = tiles.map((tile) =>{
    return reorderInterleavedRows(tile);
  })
  return ordered;
};
