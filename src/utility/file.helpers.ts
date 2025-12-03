import path from 'path';
import { promises as fs } from 'fs';
import { PNG } from 'pngjs';

/**
 * Render a PNG and write it to disk.
 *
 * @param task  RenderTask describing the PNG to build
 * @param path  Output file path
 * @returns Promise<void>
 */
export const writePngToFile = async (
  png: PNG,
  outputPath: string
): Promise<void> => {
  const dir = path.dirname(outputPath); // extract folder path
  await fs.mkdir(dir, { recursive: true }); // create folder if missing

  const buffer = PNG.sync.write(png);
  await fs.writeFile(outputPath, buffer);
};
