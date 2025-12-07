import { Point2D, Size2D } from "../../types/geometry.types";
import { TileTranslationTable } from "./decoder.types";

/**
 * Describes a single Ultima III resource, including its file name, dimensions,
 * world location, and optional tile translation table.
 *
 * @typedef {Object} ResourceInformation
 * @property {string} name Human-readable name of the map.
 * @property {string} description Short description of the map's theme or purpose.
 * @property {Size2D} dimensions Width (`x`) and height (`y`) of the map in tiles.
 * @property {Point2D} location World-space location used for placement in the overworld.
 * @property {string} file The file associated with the map.
 * @property {TileTranslationTable=} tileMapper Optional translation table used when rendering tiles.
 */
export type ResourceInformation = {
  name: string;
  description: string;
  dimensions: Size2D;
  location: Point2D;
  file: string;
  tileMapper?: any;
};
