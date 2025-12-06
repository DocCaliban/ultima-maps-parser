import { RGBAPixel } from "./bitmap.types";

/**
 * A palette is an ordered collection of colors.
 *
 * Typically used as a lookup table where the index corresponds to a pixel value.
 * Each entry in the palette is an `RGBAColor`.
 */
export type Palette = RGBAPixel[];
