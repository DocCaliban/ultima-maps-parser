import path from 'path';
import { promises as fs } from 'fs';
import { PNG } from 'pngjs';

/**
 * Writes a PNG object to a file.
 *
 * @param {PNG} png - The PNG instance to write.
 * @param {string} outputPath - The path where the PNG file will be saved.
 * @returns {Promise<void>} Resolves when the file has been written.
 */
export const writePngToFile = async (png: PNG, outputPath: string): Promise<void> => {
  const dir = path.dirname(outputPath); // extract folder path
  await fs.mkdir(dir, { recursive: true }); // create folder if missing

  const buffer = PNG.sync.write(png);
  await fs.writeFile(outputPath, buffer);
};
