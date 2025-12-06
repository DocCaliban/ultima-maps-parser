import { RGBATile } from "../graphics/types/bitmap.types";
import { Size2D } from "./geometry.types";

/**
 * Allowed scaling factors for rendering a tile map.
 *
 * Only these discrete values are supported to maintain pixel-perfect rendering:
 * - `1` – original size
 * - `2` – double size
 * - `4` – quadruple size
 * - `8` – 8× size
 * - `16` – 16× size
 *
 * @typedef {1 | 2 | 4 | 8 | 16} ScaleOption
 */
export type ScaleOption = 1 | 2 | 4 | 8 | 16;


/**
 * Options for rendering a tile map.
 *
 * @interface TileMapRenderOptions
 * @property {Size2D} gridSize The dimensions of the tile map in tiles (columns × rows).
 * @property {Size2D} tileSize The dimensions of each tile in pixels (width × height).
 * @property {RGBATile[]} tiles Tiles used for rendering
 * @property {number[][]} [layout] Optional layout of tile indices in the output grid. If omitted, tiles are drawn sequentially left-to-right, top-to-bottom.
 * @property {ScaleOption} scale Scale factor for map rendering
 */
export interface TileMapRenderOptions {
  gridSize: Size2D;
  tileSize: Size2D;
  tiles: RGBATile[];
  layout?: number[][];
  scale?: ScaleOption;
}