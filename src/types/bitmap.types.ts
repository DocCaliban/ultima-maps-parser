import { Size2D } from './geometry.types';

/**
 * Represents a single pixel with a concrete RGBA color.
 *
 * Each component is a number from 0 to 255:
 * - `r` – red
 * - `g` – green
 * - `b` – blue
 * - `a` – alpha (opacity)
 *
 * Example:
 * ```ts
 * const pixel: RGBAPixel = [255, 0, 0, 255]; // fully opaque red
 * ```
 *
 * @typedef { [number, number, number, number] } RGBAPixel
 */
export type RGBAPixel = [number, number, number, number];

/**
 * Represents a 2D array of pixels (a tile or small bitmap).
 *
 * The first index is the row (y-axis), the second index is the column (x-axis).
 *
 * Example:
 * ```ts
 * const tile: RGBATile = [
 *   [[0,0,0,255], [255,255,255,255]],
 *   [[255,0,0,255], [0,255,0,255]]
 * ];
 * ```
 *
 * @typedef { RGBAPixel[][] } RGBATile
 */
export type RGBATile = RGBAPixel[][];

/**
 * Represents a rendered tile map.
 *
 * @interface RenderedTileMap
 * @property {Size2D} size The full image dimensions in pixels.
 * @property {Uint8ClampedArray} data The flat RGBA pixel data (4 * width * height entries).
 */
export interface RenderedTileMap {
  size: Size2D;
  data: Uint8ClampedArray;
}
