import { Point2D, Size2D } from '../../types/geometry.types';

/**
 * Options for decoding image data.
 *
 * @interface DecodingOptions
 * @property {number} bytesPerImage The number of bytes allocated for each image. This value is used to determine memory requirements and decode images correctly.
 * @property {Point2D} pixelDimensions An object representing the dimensions of the image in pixels where `x` is the width and `y` is the height.
 */
export interface ImageDecoderOptions {
  bytesPerImage: number;
  pixelDimensions: Point2D;
}

export interface MapDecoderOptions {
  size?: Size2D;
  tileMapper?: TileTranslationTable;
}

/**
 * A mapping from source tile indices to target tile indices.
 *
 * Key: original tile index (number)
 * Value: mapped tile index (number)
 */
export type TileTranslationTable = { [sourceTile: number]: number };
