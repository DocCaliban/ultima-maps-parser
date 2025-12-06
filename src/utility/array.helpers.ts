import { Point2D } from "../types/geometry.types";

/**
 * Creates a 2D array (matrix) of the specified dimensions, filled with a default value.
 *
 * @template T - The type of elements in the array.
 * @param {Point2D} dimensions - The dimensions of the 2D array: `{ x: width, y: height }`.
 * @param {T} defaultValue - The value to fill every element of the array with.
 * @returns {T[][]} A 2D array of size `dimensions.y` × `dimensions.x`, filled with `defaultValue`.
 *
 * @example
 * const matrix = get2dArray({ x: 3, y: 2 }, 0);
 * // matrix = [
 * //   [0, 0, 0],
 * //   [0, 0, 0]
 * // ]
 */
export const get2dArray = <T>(dimensions: Point2D, defaultValue: T): T[][] => {
  return Array.from({ length: dimensions.y }, () => Array(dimensions.x).fill(defaultValue));
};