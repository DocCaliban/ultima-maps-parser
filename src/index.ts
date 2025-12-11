export { buildCgaGraphicsArray, buildEgaGraphicsArray, buildVgaGraphicsArray } from './ultima-3/decoders/u3.graphics.decoders';
export { decodeVGAPalette } from './graphics/vga/vga.decoder';
export { applyPalette, applyPaletteToPixel } from './graphics/palette/palette.operations';
export { PALETTES } from './data/palettes';

// Re-export common types
export type { Palette } from './graphics/types/palette.types';
export type { RGBAPixel } from './graphics/types/bitmap.types';
