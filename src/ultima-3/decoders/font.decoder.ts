import { PNG } from 'pngjs';
import fs from 'fs';
import { decodeCgaPixelData } from './cga.decoder';
import { ScaleOption } from '../../types/render-task.types';

const CGA_PALETTE: [number, number, number][] = [
  [0, 0, 0],
  [0, 170, 0],
  [170, 0, 0],
  [170, 170, 170],
];



/**
 * Renders a string using the U3 font data as a PNG, with optional scaling.
 *
 * @param str The string to render
 * @param fontData Uint8Array containing the 128-character font (128 × 16 bytes)
 * @param outputPath Path to save the PNG
 * @param scale Scale factor for each character (1, 2, 4, 8, 16)
 */
export function renderStringToPNG(
  str: string,
  fontData: Uint8Array,
  outputPath: string,
  scale: ScaleOption = 8
) {
  const charWidth = 8;
  const charHeight = 8;
  const charsPerRow = 1;
  const totalRows = Math.ceil(str.length / charsPerRow);

  const pngWidth = charsPerRow * charWidth * scale;
  const pngHeight = totalRows * charHeight * scale;

  const png = new PNG({ width: pngWidth, height: pngHeight });

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    const fontIndex = charCode % 128;

    const rowOffset = Math.floor(i / charsPerRow);
    const colOffset = i % charsPerRow;

    const charBytes = fontData.slice(fontIndex * 16, fontIndex * 16 + 16);

    const pixels = decodeCgaPixelData(charBytes, {
      pixelDimensions: { x: charWidth, y: charHeight },
      bytesPerImage: 16,
    });

    for (let y = 0; y < charHeight; y++) {
      for (let x = 0; x < charWidth; x++) {
        // @ts-ignore
        const colorIndex: number = pixels[y][x];
        const [r, g, b] = CGA_PALETTE[colorIndex]!;

        // Fill scaled pixels
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const px = colOffset * charWidth * scale + x * scale + sx;
            const py = rowOffset * charHeight * scale + y * scale + sy;
            const idx = (py * pngWidth + px) << 2;

            png.data[idx] = r;
            png.data[idx + 1] = g;
            png.data[idx + 2] = b;
            png.data[idx + 3] = 255;
          }
        }
      }
    }
  }

  fs.writeFileSync(outputPath, PNG.sync.write(png));
}

/**
 * Renders the full 128-character U3 font as a PNG with 2 rows of 64 characters.
 *
 * @param fontData Uint8Array containing the font data (128 × 16 bytes)
 * @param outputPath Path to write the PNG
 */
export function renderFullFontToPNG(fontData: Uint8Array, outputPath: string) {
  const charsPerRow = 32;
  const charWidth = 8;
  const charHeight = 8;
  const totalRows = 4;

  console.log(JSON.stringify(Array.from(fontData)));
  

  const pngWidth = charsPerRow * charWidth;
  const pngHeight = totalRows * charHeight;

  const png = new PNG({ width: pngWidth, height: pngHeight });

  for (let charIndex = 0; charIndex < 128; charIndex++) {
    const rowOffset = Math.floor(charIndex / charsPerRow);
    const colOffset = charIndex % charsPerRow;

    const charBytes = fontData.slice(charIndex * 16, charIndex * 16 + 16);

    // decodeCgaPixelData is typed to always return number[][], fully populated
    const pixels = decodeCgaPixelData(charBytes, {
      pixelDimensions: { x: charWidth, y: charHeight },
      bytesPerImage: 16,
    });

    // Safe to index directly
    for (let y = 0; y < charHeight; y++) {
      for (let x = 0; x < charWidth; x++) {
        // @ts-ignore
        const colorIndex: number = pixels[y][x]; // TS now knows it's a number
        const [r, g, b] = CGA_PALETTE[colorIndex]!;
        const px = colOffset * charWidth + x;
        const py = rowOffset * charHeight + y;
        const idx = (py * pngWidth + px) << 2;

        png.data[idx] = r;
        png.data[idx + 1] = g;
        png.data[idx + 2] = b;
        png.data[idx + 3] = 255;
      }
    }
  }

  fs.writeFileSync(outputPath, PNG.sync.write(png));
}
