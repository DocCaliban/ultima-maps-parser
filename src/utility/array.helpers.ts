import { Point2D } from "../types/common.types";

export const get2dArray = <T>(dimensions: Point2D, defaultValue: T):T[][] => {
  return Array.from({ length: dimensions.y }, () => Array(dimensions.x).fill(defaultValue));
}