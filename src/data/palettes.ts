import { cgaAlternate } from './palettes/cga.alternate';
import { cga } from './palettes/cga.standard';
import { egaAlternate } from './palettes/ega.alternate';
import { egaC64 } from './palettes/ega.commodore.64';
import { ega } from './palettes/ega.standard';

/**
 * A collection of all exported palettes, grouped for convenience.
 */
export const PALETTES = {
  EGA_C64: egaC64,
  CGA_ALTERNATE: cgaAlternate,
  EGA_ALTERNATE: egaAlternate,
  CGA_STANDARD: cga,
  EGA_STANDARD: ega,
} as const;
