import fs from 'fs';
import path from 'path';
import promptSync from 'prompt-sync';
import {
  Towns,
  Castles,
  Dungeons,
  Arenas,
  Overworlds,
} from '../src/ultima-3/constants/ultima3.maps';
import { renderMap } from './render.map'; // your existing function
import {
  extractCgaTileDataToRgba,
  extractEgaTileDataToRgba,
} from '../src/ultima-3/decoders/tile.decoders';

const prompt = promptSync();
const DATA_PATH = path.resolve('./data/ultima-3');
const CGA_TILES_FILE = 'SHAPES.ULT';
const EGA_TILES_FILE = 'shapes.ega';

const checkFileExists = (fileName: string) =>
  fs.existsSync(path.join(DATA_PATH, fileName));
const filterValidMaps = (maps: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(maps).filter(([_, map]) => checkFileExists(map.file))
  );

const validTowns = filterValidMaps(Towns);
const validCastles = filterValidMaps(Castles);
const validDungeons = filterValidMaps(Dungeons);
const validArenas = filterValidMaps(Arenas);
const validOverworlds = filterValidMaps(Overworlds);

const menuOptions: { type: string; maps: Record<string, any> }[] = [];
if (Object.keys(validTowns).length)
  menuOptions.push({ type: 'Towns', maps: validTowns });
if (Object.keys(validCastles).length)
  menuOptions.push({ type: 'Castles', maps: validCastles });
if (Object.keys(validDungeons).length)
  menuOptions.push({ type: 'Dungeons', maps: validDungeons });
if (Object.keys(validArenas).length)
  menuOptions.push({ type: 'Arenas', maps: validArenas });
if (Object.keys(validOverworlds).length)
  menuOptions.push({ type: 'Overworlds', maps: validOverworlds });

// Graphics mode state
let graphicsMode: 'CGA' | 'EGA' | 'BOTH' = 'CGA';

// Wrap in async IIFE
(async () => {
  const rawCGA = await fs.readFileSync(path.join(DATA_PATH, CGA_TILES_FILE));
  const cgaTiles = extractCgaTileDataToRgba(rawCGA);

  const rawEGA = await fs.readFileSync(path.join(DATA_PATH, EGA_TILES_FILE));
  const egaTiles = extractEgaTileDataToRgba(rawEGA);

  while (true) {
    // --- Main Menu ---
    console.log(`\nCurrent Graphics Mode: ${graphicsMode}`);
    console.log('Select a Map Type:');
    menuOptions.forEach((option, idx) => {
      console.log(`${idx + 1}. ${option.type}`);
    });
    console.log(`${menuOptions.length + 1}. Change Graphics Mode`);
    console.log(`${menuOptions.length + 2}. Exit`);

    const typeChoice = Number(prompt('Enter option number: ')) - 1;

    if (typeChoice === menuOptions.length) {
      // Change graphics mode
      console.log('\nSelect Graphics Mode:');
      console.log('1. CGA');
      console.log('2. EGA');
      console.log('3. BOTH');

      const modeChoice = Number(prompt('Enter option number: '));
      switch (modeChoice) {
        case 1:
          graphicsMode = 'CGA';
          break;
        case 2:
          graphicsMode = 'EGA';
          break;
        case 3:
          graphicsMode = 'BOTH';
          break;
        default:
          console.log('Invalid selection.');
      }

      continue; // redisplay main menu
    }

    if (typeChoice === menuOptions.length + 1) {
      console.log('Exiting...');
      process.exit(0);
    }

    if (typeChoice < 0 || typeChoice >= menuOptions.length) {
      console.log('Invalid selection.');
      continue;
    }

    const selectedType = menuOptions[typeChoice];
    const maps = Object.values(selectedType!.maps);

    // --- Submenu: Select Specific Map ---
    console.log(
      `\nSelect a ${selectedType!.type} (Graphics: ${graphicsMode}):`
    );
    maps.forEach((map, idx) => {
      console.log(`${idx + 1}. ${map.name} (${map.file})`);
    });
    console.log(`${maps.length + 1}. Return to Main Menu`);

    const mapChoice = Number(prompt('Enter option number: ')) - 1;

    if (mapChoice === maps.length) {
      continue; // back to main menu
    }

    if (mapChoice < 0 || mapChoice >= maps.length) {
      console.log('Invalid selection.');
      continue;
    }

    const selectedMap = maps[mapChoice];
    console.log(`\nRendering: ${selectedMap.name} (${selectedMap.file})`);

    // Call your render function
    await renderMap(selectedMap, graphicsMode, { cgaTiles, egaTiles });

    console.log('\nRendering complete. Returning to main menu...');
  }
})();
