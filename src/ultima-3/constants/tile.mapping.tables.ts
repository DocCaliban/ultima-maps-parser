import { TileTranslationTable } from '../types/decoder.types';

/**
 * Translation table for demo tiles.
 * Maps original tile indices to their corresponding tiles in the demo set.
 *
 * @type {TileTranslationTable}
 */
export const DEMO_TILE_TRANSLATION_TABLE: TileTranslationTable = {
  0x00: 0x00, // Water
  0x01: 0x04, // Grass
  0x02: 0x08, // Brush
  0x03: 0x0c, // Forest
  0x04: 0x10, // Mountains
  0x05: 0x14, // Dungeon
  0x06: 0x18, // Town
  0x07: 0x1c, // Castle
  0x08: 0x08, // Brush duplicate
  0x0b: 0x2c, // Frigate
  0x21: 0x84, // Lava
  0x22: 0x88, // Moon Gate
};

/**
 * Translation table for arena tiles.
 * Maps original tile indices to the corresponding tiles in arena maps.
 *
 * @type {TileTranslationTable}
 */
export const ARENA_TILE_TRANSLATION_TABLE: TileTranslationTable = {
  0x00: 0x00, // Water
  0x01: 0x04, // Grass
  0x02: 0x08, // Brush
  0x08: 0x20, // Floor
  0x23: 0x8c, // Wall
  0x03: 0x0c, // Forest
};

/**
 * Translation table for image tiles.
 * Maps original tile indices to tiles in imported images or special effects.
 *
 * @type {TileTranslationTable}
 */
export const IMG_TILE_TRANSLATION_TABLE: TileTranslationTable = {
  0x00: 0x00, // Water
  0x20: 0x80, // Force Field
  0x21: 0x84, // Lava
  0x22: 0x88, // Moon Gate
  0x23: 0x8c, // Wall
  0x24: 0x90, // Void
};
