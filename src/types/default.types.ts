
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