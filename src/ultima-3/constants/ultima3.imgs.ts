import { IMG_TILE_TRANSLATION_TABLE } from './tile.mapping.tables';

export const ImageFiles = {
  BRAND: {
    name: 'Brand',
    description: 'A red hot rod... touch?',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'BRAND.IMG',
    tileMapper: IMG_TILE_TRANSLATION_TABLE,
  },
  FOUNTAIN: {
    name: 'Fountain',
    description: 'Dungeon Fountain',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'FOUNTAIN.IMG',
    tileMapper: IMG_TILE_TRANSLATION_TABLE,
  },
  SHRINE: {
    name: 'Shrine',
    description: 'A Shrine',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'SHRINE.IMG',
    tileMapper: IMG_TILE_TRANSLATION_TABLE,
  },
  TIME: {
    name: 'Time Lord',
    description: 'Dr Who',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'TIME.IMG',
    tileMapper: IMG_TILE_TRANSLATION_TABLE,
  },
  TILES: {
    name: 'Tiles (most of them)',
    description: 'Just a representation of visiable tiles',
    dimensions: { x: 32, y: 2 },
    location: { x: 0, y: 0 },
    file: 'SHAPES.IMG',
  },
};
