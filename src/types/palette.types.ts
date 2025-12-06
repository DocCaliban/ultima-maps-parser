/**
 * Represents a single color in RGBA format.
 *
 * Each component is a number from 0 to 255:
 * - `r` – red
 * - `g` – green
 * - `b` – blue
 * - `a` – optional alpha (opacity), defaults to 255 if missing
 */
export type RGBAColor = [number, number, number, number?];

/**
 * A palette is an ordered collection of colors.
 *
 * Typically used as a lookup table where the index corresponds to a pixel value.
 * Each entry in the palette is an `RGBAColor`.
 */
export type Palette = RGBAColor[];
