import fs from 'fs/promises';
import path from 'path';

import { decodeWorldMap } from '../src/ultima-3/map.decoder';
import { writePngToFile } from '../src/utility/file.helpers';
import { renderMapAsPng } from '../src/ultima-3/png.renderer';
import { RenderTask } from '../src/types/render-task.type';
import { OverworldMap } from '../src/types/default.types';

const TEST_DATA_LOC = './data/ultima-3/';
const OUTPUT_DIR = './out';

const buildRenderTask = (
  mapData: OverworldMap,
  map: any,
  tiles: any
): RenderTask => {
  return {
    width: map.dimensions.x,
    height: map.dimensions.y,
    tileWidth: 16,
    tileHeight: 16,
    tiles,
    layout: mapData.mapTiles,
  };
};

export const renderMap = async (
  map: any,
  mode: string,
  tiles: { cgaTiles: number[][][][]; egaTiles: number[][][][] }
) => {
  try {
    const MAP_FILE = map.file;
    const OUTPUT_FILE = path.join(OUTPUT_DIR, `${MAP_FILE}_render.png`);

    // Read the map file
    const mapBuffer = await fs.readFile(path.join(TEST_DATA_LOC, MAP_FILE));
    const mapData = decodeWorldMap(mapBuffer, {
      width: map.dimensions.x,
      height: map.dimensions.y,
      tileMapper: map.tileMapper,
    });

    switch (mode) {
      case 'CGA':
        await writePngToFile(
          renderMapAsPng(buildRenderTask(mapData, map, tiles.cgaTiles), 4),
          path.join(OUTPUT_DIR, `${MAP_FILE}_render.png`)
        );
        break;
      case 'EGA':
        await writePngToFile(
          renderMapAsPng(buildRenderTask(mapData, map, tiles.egaTiles), 4),
          path.join(OUTPUT_DIR, `${MAP_FILE}_render.png`)
        );
        break;
      case 'BOTH':
        await writePngToFile(
          renderMapAsPng(buildRenderTask(mapData, map, tiles.cgaTiles), 4),
          path.join(OUTPUT_DIR, `${MAP_FILE}_render_cga.png`)
        );
        await writePngToFile(
          renderMapAsPng(buildRenderTask(mapData, map, tiles.egaTiles), 4),
          path.join(OUTPUT_DIR, `${MAP_FILE}_render_ega.png`)
        );
        break;
      default:
        break;
    }

    console.log(`Map PNG written to [${OUTPUT_FILE}]`);
  } catch (err) {
    console.error('Error rendering map:', err);
  }
};
