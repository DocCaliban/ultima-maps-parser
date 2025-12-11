#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';

import { Towns, Castles, Dungeons, Arenas, Overworlds } from '../src/ultima-3/constants/ultima3.maps';
import { ImageFiles } from '../src/ultima-3/constants/ultima3.imgs';
import { decodeVGAPalette } from '../src/graphics/vga/vga.decoder';
import { buildCgaGraphicsArray, buildEgaGraphicsArray, buildVgaGraphicsArray } from '../src/ultima-3/decoders/u3.graphics.decoders';
import { renderMap } from './render.map';
import crc32 from './render-ci-crc-helper';

const DATA_PATH = path.resolve('./assets/ultima-3');
const OUT_DIR = path.resolve('./out');

const allMaps = { ...Towns, ...Castles, ...Dungeons, ...Arenas, ...Overworlds, ...ImageFiles } as Record<string, any>;

const maps = Object.values(allMaps).filter((m) => m && m.file) as any[];

const modes = ['VGA', 'EGA', 'CGA'];

const ensureOut = () => { if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true }); };

const main = async () => {
  ensureOut();

  // Pre-load tiles and palettes once
  const palPath = path.join(DATA_PATH, 'U3VGA.PAL');
  let vgaPalette: any = undefined;
  try { if (fs.existsSync(palPath)) vgaPalette = decodeVGAPalette(fs.readFileSync(palPath)); } catch (e) { /* ignore */ }

  const rawCGA = fs.readFileSync(path.join(DATA_PATH, 'SHAPES.ULT'));
  const cgaTiles = buildCgaGraphicsArray(rawCGA, { width: 16, height: 16 }, require('../src/data/palettes').PALETTES.CGA_ALTERNATE);

  const rawEGA = fs.readFileSync(path.join(DATA_PATH, 'shapes.ega'));
  const egaTiles = buildEgaGraphicsArray(rawEGA, { width: 16, height: 16 }, require('../src/data/palettes').PALETTES.EGA_C64);

  const rawVGA = fs.readFileSync(path.join(DATA_PATH, 'SHAPES.VGA'));
  const vgaTiles = buildVgaGraphicsArray(rawVGA, { width: 16, height: 16 }, vgaPalette ?? require('../src/data/palettes').PALETTES.VGA_STANDARD);

  const expected: Record<string, Record<string, number>> = {};

  for (const map of maps) {
    const file = map.file as string;
    expected[file] = expected[file] || {};
    for (const mode of modes) {
      try {
        console.log(`Rendering ${file} (${mode})`);
        await renderMap(map, mode, { cgaTiles, egaTiles, vgaTiles });
        const outFile = path.join(OUT_DIR, `${file}_${mode.toLowerCase()}.png`);
        if (!fs.existsSync(outFile)) throw new Error('output missing');
        const buf = fs.readFileSync(outFile);
        const crc = await crc32(buf);
        expected[file][mode] = crc;
        console.log(`  -> CRC32=0x${crc.toString(16).padStart(8,'0')}`);
      } catch (err) {
        console.warn(`Skipping ${file} ${mode} — render failed:`, (err as any).message || err);
        expected[file][mode] = null as any;
      }
    }
  }

  const jsonPath = path.join(__dirname, 'expected-crc.json');
  fs.writeFileSync(jsonPath, JSON.stringify(expected, null, 2));
  console.log(`Wrote ${jsonPath}`);
};

main().catch((e) => { console.error(e); process.exit(1); });
