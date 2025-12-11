// constants/ultima3/maps.ts

import { ResourceInformation } from '../types/resource.information.types';
import { mapTileIndex } from './tile.mapping.tables';

/**
 * Town map definitions used in Ultima III.
 *
 * @type {Record<string, ResourceInformation>}
 */
export const Towns: Record<string, ResourceInformation> = {
  Moon: {
    name: 'Moon',
    description: 'A small frontier town on the edge of the world.',
    dimensions: { width: 64, height: 64 },
    location: { x: 6, y: 13 },
    file: 'MOON.ULT',
  },
  Fawn: {
    name: 'Fawn',
    description: 'A quiet town surrounded by forests.',
    dimensions: { width: 64, height: 64 },
    location: { x: 30, y: 2 },
    file: 'FAWN.ULT',
  },
  Yew: {
    name: 'Yew',
    description: 'A town known for its smiths and merchants.',
    dimensions: { width: 64, height: 64 },
    location: { x: 34, y: 16 },
    file: 'YEW.ULT',
  },
  LordBritishTown: {
    name: 'Lord British Town',
    description: 'The main settlement surrounding the castle of Lord British.',
    dimensions: { width: 64, height: 64 },
    location: { x: 46, y: 19 },
    file: 'LCB.ULT',
  },
  DeathGultch: {
    name: 'Death Gultch',
    description: 'A desert town near harsh terrain, dangerous for travelers.',
    dimensions: { width: 64, height: 64 },
    location: { x: 56, y: 31 },
    file: 'DEATH.ULT',
  },
  DevilGuard: {
    name: 'Devil Guard',
    description: 'A fortified town guarding a mountain pass.',
    dimensions: { width: 64, height: 64 },
    location: { x: 18, y: 31 },
    file: 'DEVIL.ULT',
  },
  Grey: {
    name: 'Grey',
    description: 'A mining town with a somber atmosphere.',
    dimensions: { width: 64, height: 64 },
    location: { x: 7, y: 44 },
    file: 'GREY.ULT',
  },
  Dawn: {
    name: 'Dawn',
    description: 'A peaceful town near farmland and rivers.',
    dimensions: { width: 64, height: 64 },
    location: { x: 37, y: 53 },
    file: 'DAWN.ULT',
  },
  MontorWest: {
    name: 'Montor West',
    description: 'The western part of the twin Montor towns.',
    dimensions: { width: 64, height: 64 },
    location: { x: 47, y: 58 },
    file: 'MONTOR_W.ULT',
  },
  MontorEast: {
    name: 'Montor East',
    description: 'The eastern part of the twin Montor towns.',
    dimensions: { width: 64, height: 64 },
    location: { x: 49, y: 58 },
    file: 'MONTOR_E.ULT',
  },
};

/**
 * Castle map definitions used in Ultima III.
 *
 * @type {Record<string, ResourceInformation>}
 */
export const Castles: Record<string, ResourceInformation> = {
  LordBritishCastle: {
    name: 'Castle of Lord British',
    description: 'Home of Lord British, central to the realm.',
    dimensions: { width: 64, height: 64 },
    location: { x: 45, y: 18 },
    file: 'BRITISH.ULT',
  },
  ExodusCastle: {
    name: 'Castle Exodus',
    description: 'A prominent castle in the eastern lands.',
    dimensions: { width: 64, height: 64 },
    location: { x: 10, y: 53 },
    file: 'EXODUS.ULT',
  },
};

/**
 * Dungeon map definitions (currently empty placeholder).
 *
 * @type {Record<string, ResourceInformation>}
 */
export const Dungeons: Record<string, ResourceInformation> = {};

/**
 * Arena battle map definitions.
 *
 * @type {Record<string, ResourceInformation>}
 */
export const Arenas: Record<string, ResourceInformation> = {
  ArenaA: {
    name: 'Shore To Ship',
    description: 'Fighting from the shore to a ship.',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_A.ULT',
    tileMapper: mapTileIndex,
  },
  ArenaB: {
    name: 'Brush',
    description: 'Fighting in light brush.',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_B.ULT',
    tileMapper: mapTileIndex,
  },
  ArenaC: {
    name: 'Brick',
    description: 'Fighting on a brick floor (Dungeon).',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_C.ULT',
    tileMapper: mapTileIndex,
  },
  ArenaF: {
    name: 'Forest',
    description: 'Fighting among trees.',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_F.ULT',
    tileMapper: mapTileIndex,
  },
  ArenaG: {
    name: 'Grass',
    description: 'Fighting on open grass.',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_G.ULT',
    tileMapper: mapTileIndex,
  },
  ArenaM: {
    name: 'Shore to Sea',
    description: 'Fighting from shore to deeper water.',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_M.ULT',
    tileMapper: mapTileIndex,
  },
  ArenaQ: {
    name: 'Ship to Sea',
    description: 'Fighting from a ship into open sea.',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_Q.ULT',
    tileMapper: mapTileIndex,
  },
  ArenaR: {
    name: 'Ship to Shore',
    description: 'Fighting from a ship toward the shore.',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_R.ULT',
    tileMapper: mapTileIndex,
  },
  ArenaS: {
    name: 'Ship to Ship',
    description: 'Fighting between two ships.',
    dimensions: { width: 11, height: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_S.ULT',
    tileMapper: mapTileIndex,
  },
};

/**
 * Overworld map definitions, including intro maps and Sosaria.
 *
 * @type {Record<string, ResourceInformation>}
 */
export const Overworlds: Record<string, ResourceInformation> = {
  Demo: {
    name: 'Intro Map',
    description: 'The introductory map shown when starting the game.',
    dimensions: { width: 19, height: 6 },
    location: { x: 0, y: 0 },
    file: 'DEMO.ULT',
    tileMapper: mapTileIndex,
  },
  Sosaria: {
    name: 'Sosaria',
    description: 'The main overworld of Ultima III, containing all towns, castles, dungeons, and wilderness areas.',
    dimensions: { width: 64, height: 64 },
    location: { x: 0, y: 0 },
    file: 'SOSARIA.ULT',
  },
  Ambrosia: {
    name: 'Ambrosia',
    description: 'A southern region famous for fertile lands and trade routes.',
    dimensions: { width: 64, height: 64 },
    location: { x: 0, y: 0 },
    file: 'AMBROSIA.ULT',
  },
};
