import { Size2D } from '../../types/geometry.types';

/**
 * Represents a single pixel with a concrete RGBA color.
 * Each component is a number from 0 to 255:
 * - `r` – red
 * - `g` – green
 * - `b` – blue
 * - `a` – alpha (opacity, optional; defaults to 255)
 */
export type RGBAPixel = [number, number, number, number?];

/**
 * Represents a 2D array of RGBA pixels.
 * The first index is the row (y-axis), the second index is the column (x-axis).
 * Typically used to represent a single tile or small bitmap.
 */
export type RGBATile = RGBAPixel[][];

/**
 * Represents a rendered tile map — a full image composed of pixels.
 *
 * @property size - The full image dimensions in pixels (width x height)
 * @property data - Flat array of RGBA pixel data (length = width * height * 4)
 */
export interface RenderedTileMap {
  size: Size2D;
  data: Uint8ClampedArray;
}

/**
 * A collection of tiles.
 * Each element is a 2D array of RGBA pixels.
 */
export type TileSet = RGBATile[];

/**
 * Raw pixel data representing palette indices.
 * Typically returned by a CGA/EGA/VGA decoder before applying a palette.
 */
export type RawPixelData = number[];
