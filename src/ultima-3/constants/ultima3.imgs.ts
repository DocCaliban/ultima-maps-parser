import { ResourceInformation } from '../types/resource.information.types';
import { IMG_TILE_TRANSLATION_TABLE } from './tile.mapping.tables';

/**
 * A collection of image metadata definitions used for decoding and rendering
 * Ultima III `.IMG` files.
 *
 * Each entry describes:
 * - `name` — Human-readable display name
 * - `description` — Short description of the image
 * - `dimensions` — Width and height in tiles
 * - `location` — Starting position within the image file (usually `{ x: 0, y: 0 }`)
 * - `file` — Source `.IMG` filename
 * - `tileMapper` — Optional lookup table for translating tile indices
 *
 * These definitions are used by image decoders and tile renderers to interpret
 * static graphics such as fountains, shrines, and special art assets.
 *
 * @type {Record<string, ResourceInformation>}
 */
export const ImageFiles: Record<string, ResourceInformation> = {
  BRAND: {
    name: 'Brand',
    description: 'A red hot rod... touch?',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'BRAND.IMG',
    tileMapper: IMG_TILE_TRANSLATION_TABLE,
  },
  FOUNTAIN: {
    name: 'Fountain',
    description: 'Dungeon Fountain',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'FOUNTAIN.IMG',
    tileMapper: IMG_TILE_TRANSLATION_TABLE,
  },
  SHRINE: {
    name: 'Shrine',
    description: 'A Shrine',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'SHRINE.IMG',
    tileMapper: IMG_TILE_TRANSLATION_TABLE,
  },
  TIME: {
    name: 'Time Lord',
    description: 'Dr Who',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'TIME.IMG',
    tileMapper: IMG_TILE_TRANSLATION_TABLE,
  },

  /**
   * SHAPES.IMG — Primary tile sheet containing 64 game tiles.
   *
   * This is the only `.IMG` file redistributed in this project, as it is
   * an original asset created specifically for this toolset. It contains
   * the core tile graphics.
   */
  TILES: {
    name: 'Tiles (most of them)',
    description: 'Just a representation of visible tiles',
    dimensions: { width: 32, height: 2 },
    location: { x: 0, y: 0 },
    file: 'SHAPES.IMG',
  },
};
