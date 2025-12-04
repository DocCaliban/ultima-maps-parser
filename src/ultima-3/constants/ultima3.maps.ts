// constants/ultima3/maps.ts

import { ARENA_TILE_TRANSLATION_TABLE, DEMO_TILE_TRANSLATION_TABLE } from "./tile.mapping.tables";

export const Towns = {
  Moon: {
    name: 'Moon',
    description: 'A small frontier town on the edge of the world.',
    dimensions: { x: 64, y: 64 },
    location: { x: 6, y: 13 },
    file: 'MOON.ULT',
  },
  Fawn: {
    name: 'Fawn',
    description: 'A quiet town surrounded by forests.',
    dimensions: { x: 64, y: 64 },
    location: { x: 30, y: 2 },
    file: 'FAWN.ULT',
  },
  Yew: {
    name: 'Yew',
    description: 'A town known for its smiths and merchants.',
    dimensions: { x: 64, y: 64 },
    location: { x: 34, y: 16 },
    file: 'YEW.ULT',
  },
  'LordBritishTown': {
    name: 'Lord British Town',
    description: 'The main settlement surrounding the castle of Lord British.',
    dimensions: { x: 64, y: 64 },
    location: { x: 46, y: 19 },
    file: 'LCB.ULT',
  },
  DeathGultch: {
    name: 'Death Gultch',
    description: 'A desert town near harsh terrain, dangerous for travelers.',
    dimensions: { x: 64, y: 64 },
    location: { x: 56, y: 31 },
    file: 'DEATH.ULT',
  },
  DevilGuard: {
    name: 'Devil Guard',
    description: 'A fortified town guarding a mountain pass.',
    dimensions: { x: 64, y: 64 },
    location: { x: 18, y: 31 },
    file: 'DEVIL.ULT',
  },
  Grey: {
    name: 'Grey',
    description: 'A mining town with a somber atmosphere.',
    dimensions: { x: 64, y: 64 },
    location: { x: 7, y: 44 },
    file: 'GREY.ULT',
  },
  Dawn: {
    name: 'Dawn',
    description: 'A peaceful town near farmland and rivers.',
    dimensions: { x: 64, y: 64 },
    location: { x: 37, y: 53 },
    file: 'DAWN.ULT',
  },
  MontorWest: {
    name: 'Montor West',
    description: 'The western part of the twin Montor towns.',
    dimensions: { x: 64, y: 64 },
    location: { x: 47, y: 58 },
    file: 'MONTOR_W.ULT',
  },
  MontorEast: {
    name: 'Montor East',
    description: 'The eastern part of the twin Montor towns.',
    dimensions: { x: 64, y: 64 },
    location: { x: 49, y: 58 },
    file: 'MONTOR_E.ULT',
  }
};

export const Castles = {
  LordBritishCastle: {
    name: 'Castle of Lord British',
    description: 'Home of Lord British, central to the realm.',
    dimensions: { x: 64, y: 64 },
    location: { x: 45, y: 18 },
    file: 'BRITISH.ULT',
  },
  ExodusCastle: {
    name: 'Castle Exodus',
    description: 'A prominent castle in the eastern lands.',
    dimensions: { x: 64, y: 64 },
    location: { x: 10, y: 53 },
    file: 'EXODUS.ULT',
  },
};

export const Dungeons = {
  // Placeholder for future dungeon maps
};

export const Arenas = {
  ArenaA: {
    name: 'Shore To Ship',
    description: 'Fighting from the shore to a ship.',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_A.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
  ArenaB: {
    name: 'Brush',
    description: 'Fighting in light brush.',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_B.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
  ArenaC: {
    name: 'Brick',
    description: 'Fighting on  a brick floor (Dungeon).',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_C.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
  ArenaF: {
    name: 'Forest',
    description: 'Fighting among trees.',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_F.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
  ArenaG: {
    name: 'Grass',
    description: 'Fighting on open grass.',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_G.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
  ArenaM: {
    name: 'Shore to Sea',
    description: 'Fighting from shore to deeper water.',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_M.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
  ArenaQ: {
    name: 'Ship to Sea',
    description: 'Fighting from a ship into open sea.',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_Q.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
  ArenaR: {
    name: 'Ship to Shore',
    description: 'Fighting from a ship toward the shore.',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_R.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
  ArenaS: {
    name: 'Ship to Ship',
    description: 'Fighting between two ships.',
    dimensions: { x: 11, y: 11 },
    location: { x: 0, y: 0 },
    file: 'CNFLCT_S.ULT',
    tileMapper: ARENA_TILE_TRANSLATION_TABLE
  },
};


export const Overworlds = {
  Demo: {
    name: 'Intro Map',
    description: 'The introductory map shown when starting the game.',
    dimensions: { x: 19, y: 6 },
    location: { x: 0, y: 0 },
    file: 'DEMO.ULT',
    tileMapper: DEMO_TILE_TRANSLATION_TABLE
  },
  Sosaria: {
    name: 'Sosaria',
    description: 'The main overworld of Ultima III, containing all towns, castles, dungeons, and wilderness areas.',
    dimensions: { x: 64, y: 64 },
    location: { x: 0, y: 0 },
    file: 'SOSARIA.ULT',
  },
  Ambrosia: {
    name: 'Ambrosia',
    description: 'A southern region famous for fertile lands and trade routes.',
    dimensions: { x: 64, y: 64 },
    location: { x: 0, y: 0 },
    file: 'AMBROSIA.ULT',
  },
};
