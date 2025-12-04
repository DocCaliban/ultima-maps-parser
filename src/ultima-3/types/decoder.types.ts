import { Point2D } from "../../types/common.types";

/**
 * Options for decoding image data.
 *
 * @interface DecodingOptions
 * @property {number} bytesPerImage The number of bytes allocated for each image. This value is used 
 *                                      to determine memory requirements and decode images correctly.
 * @property {Point2D} pixelDimensions An object representing the dimensions of the image in pixels, 
 *                                        where `x` is the width and `y` is the height.
 */
export interface ImageDecoderOptions {
  bytesPerImage: number;
  pixelDimensions: Point2D;
}

export interface MapDecoderOptions {
  width?: number; // optional map width in tiles
  height?: number; // optional map height in tiles
  tileMapping?: boolean;
}