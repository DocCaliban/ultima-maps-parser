import { Palette } from '../types/palette.types';

export const cgaAlternate: Palette = [
  [0, 0, 0], // black
  [0, 127, 0], // blue
  [200, 90, 90], // red
  [0, 148, 255], // white
];

export const cga: Palette = [
  [0, 0, 0], // black
  [0, 255, 255], // cyan
  [255, 0, 255], // magenta
  [255, 255, 255], // white
];

/**
 * EGA Palette for Ultima III (example from Shapes.ega)
 * Maps pixel index (0-15) → [R,G,B,A]
 */
export const ega: Palette = [
  [0, 0, 0], // 0  Black
  [0, 112, 252], // 1  Blue
  [0, 176, 0], // 2  Green
  [0, 252, 252], // 3  Cyan
  [252, 0, 0], // 4  Red
  [128, 128, 128], // 5  Unknown / placeholder
  [252, 144, 0], // 6  Orange
  [176, 176, 176], // 7  Light gray
  [176, 176, 176], // 8  Duplicate light gray
  [0, 0, 252], // 9  Dark blue
  [0, 176, 0], // 10 Green duplicate
  [0, 252, 252], // 11 Cyan duplicate
  [252, 0, 0], // 12 Red duplicate
  [252, 0, 252], // 13 Magenta
  [252, 252, 0], // 14 Yellow
  [252, 252, 252], // 15 White
];

export const egaAlternate: Palette = [
  [29, 29, 29], // 0  Black
  [69, 48, 222], // 1  Blue
  [85, 198, 50], // 2  Green
  [0, 252, 252], // 3  Cyan
  [160, 63, 43], // 4  Red
  [128, 128, 128], // 5  Unknown / placeholder
  [252, 144, 0], // 6  Orange
  [176, 176, 176], // 7  Light gray
  [176, 176, 176], // 8  Duplicate light gray
  [0, 0, 252], // 9  Dark blue
  [0, 176, 0], // 10 Green duplicate
  [0, 252, 252], // 11 Cyan duplicate
  [252, 0, 0], // 12 Red duplicate
  [252, 0, 252], // 13 Magenta
  [252, 252, 0], // 14 Yellow
  [252, 252, 252], // 15 White
];

export const egaC64: [number, number, number][] = [
  [0, 0, 0], // 0 Black
  [0, 0, 170], // 1 Blue
  [0, 204, 85], // 2 Green
  [170, 255, 238], // 3 Cyan
  [136, 0, 0], // 4 Red
  [85, 85, 85], // 5 Placeholder / Dark Grey
  [221, 136, 85], // 6 Orange
  [204, 204, 204], // 7 Light Gray
  [204, 204, 204], // 8 Duplicate Light Gray
  [119, 119, 255], // 9 Dark Blue / Bright Blue
  [119, 204, 119], // 10 Duplicate Green
  [170, 255, 238], // 11 Duplicate Cyan
  [255, 119, 119], // 12 Duplicate Red
  [204, 68, 204], // 13 Magenta
  [238, 238, 119], // 14 Yellow
  [255, 255, 255], // 15 White
];

export const palettes = {
  egaC64,
  cgaAlternate,
  egaAlternate,
  cga,
  ega,
};
