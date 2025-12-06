import { Palette } from "../../src/graphics/types/palette.types";
import { applyPaletteToPixel } from "../../src/graphics/palette/palette.operations";
import { RGBAPixel } from "../../src/graphics/types/bitmap.types";

describe("applyPaletteToPixel", () => {
  const samplePalette: Palette = [
    [255, 0, 0],       // red
    [0, 255, 0, 128],  // green with alpha
    [0, 0, 255],       // blue
  ];

  test("returns the correct RGBA color for a valid pixel index without alpha", () => {
    const pixel: number = 0;
    const expected: RGBAPixel = [255, 0, 0, 255];
    expect(applyPaletteToPixel(pixel, samplePalette)).toEqual(expected);
  });

  test("returns the correct RGBA color for a valid pixel index with alpha", () => {
    const pixel: number = 1;
    const expected: RGBAPixel = [0, 255, 0, 128];
    expect(applyPaletteToPixel(pixel, samplePalette)).toEqual(expected);
  });

  test("returns default black RGBA color for an out-of-bounds pixel index", () => {
    const pixel: number = 10;
    const expected: RGBAPixel = [0, 0, 0, 255];
    expect(applyPaletteToPixel(pixel, samplePalette)).toEqual(expected);
  });

  test("returns the correct RGBA color when alpha is missing (default to 255)", () => {
    const pixel: number = 2;
    const expected: RGBAPixel = [0, 0, 255, 255];
    expect(applyPaletteToPixel(pixel, samplePalette)).toEqual(expected);
  });

  test("handles an empty palette", () => {
    const pixel: number = 0;
    const expected: RGBAPixel = [0, 0, 0, 255];
    expect(applyPaletteToPixel(pixel, [])).toEqual(expected);
  });
});
