// 16x16 Tile graphic, each tile has 2 bitplanes of 16x16 pixels (CGA format)
export type Tile = {
  bitplane1: Buffer; // 32 bytes
  bitplane2: Buffer; // 32 bytes
  pixels?: number[][]; // optional if you only generate it sometimes
};

// Character set (font) 8x8 pixels per character
export type CharTile = {
  index: number; // 0..127 for CHARSET.ULT
  bitplane1: Buffer; // 8 bytes
  bitplane2: Buffer; // 8 bytes
};

// Town/Dungeon map
export type Map64x64 = {
  width: number; // 64
  height: number; // 64
  tiles: number[][]; // [y][x] tile index
  npcs?: NPC[];
  signs?: Sign[];
};

// Dungeon levels: multiple 16x16 floors
export type DungeonMap = {
  levels: DungeonLevel[];
};

export type DungeonLevel = {
  width: number; // 16
  height: number; // 16
  tiles: number[][]; // [y][x] tile index
};

// Small conflict maps 11x11
export type ConflictMap = {
  width: number; // 11
  height: number; // 11
  tiles: number[][]; // [y][x] tile index
  startingPositions?: MapObject[];
};

// NPC / Monster / Object definition
export type MapObject = {
  type: "monster" | "horse" | "ship" | "chest";
  tileIndex: number; // points into SHAPES.ULT
  x: number;
  y: number;
  floorTile?: number; // underlying tile (for objects that overwrite)
  movementFlags?: number; // AI/movement info
  dialogOffset?: number; // for NPCs
};

// Signs / Dialogs
export type Sign = {
  x: number;
  y: number;
  textOffset: number; // offset into text table
};

// NPC structure
export type NPC = {
  tileIndex: number;
  x: number;
  y: number;
  movementFlags: number;
  dialogOffset: number;
};

export interface Monster {
  tile: number;
  floorTile: number;
  x: number;
  y: number;
  movementFlag: number;
}

export interface Whirlpool {
  x: number;
  y: number;
  dx: number; // signed offset
  dy: number; // signed offset
}

export interface MoonPhase {
  left: number;
  right: number;
  leftSub: number;
  rightSub: number;
}

export interface OverworldMap {
  mapTiles: number[][]; // 64x64 map (Raw)
  monsters: Monster[];
  whirlpool: Whirlpool;
  moonPhase: MoonPhase;
}