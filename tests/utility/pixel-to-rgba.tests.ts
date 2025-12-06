import { Palette, RGBAColor } from "../../src/types/palette.types";
import { applyPaletteToPixel } from "../../src/utility/pixel-to-rgba";

describe("applyPaletteToPixel", () => {
  const samplePalette: Palette = [
    [255, 0, 0],       // red
    [0, 255, 0, 128],  // green with alpha
    [0, 0, 255],       // blue
  ];

  test("returns the correct RGBA color for a valid pixel index without alpha", () => {
    const pixel: number = 0;
    const expected: RGBAColor = [255, 0, 0, 255];
    expect(applyPaletteToPixel(pixel, samplePalette)).toEqual(expected);
  });

  test("returns the correct RGBA color for a valid pixel index with alpha", () => {
    const pixel: number = 1;
    const expected: RGBAColor = [0, 255, 0, 128];
    expect(applyPaletteToPixel(pixel, samplePalette)).toEqual(expected);
  });

  test("returns default black RGBA color for an out-of-bounds pixel index", () => {
    const pixel: number = 10;
    const expected: RGBAColor = [0, 0, 0, 255];
    expect(applyPaletteToPixel(pixel, samplePalette)).toEqual(expected);
  });

  test("returns the correct RGBA color when alpha is missing (default to 255)", () => {
    const pixel: number = 2;
    const expected: RGBAColor = [0, 0, 255, 255];
    expect(applyPaletteToPixel(pixel, samplePalette)).toEqual(expected);
  });

  test("handles an empty palette", () => {
    const pixel: number = 0;
    const expected: RGBAColor = [0, 0, 0, 255];
    expect(applyPaletteToPixel(pixel, [])).toEqual(expected);
  });
});
