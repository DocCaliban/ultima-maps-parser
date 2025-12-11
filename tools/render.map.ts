import fs from 'fs/promises';
import path from 'path';

import { decodeWorldMap } from '../src/ultima-3/tilemap.decoder';
import { writePngToFile } from '../src/utility/file.helpers';
import { renderTileMap } from '../src/ultima-3/tilemap.renderer';
import { TileMapRenderOptions } from '../src/types/render-task.types';
import { OverworldMap } from '../src/types/default.types';
import { PNG } from 'pngjs';
import { RenderedTileMap, RGBAPixel } from '../src/graphics/types/bitmap.types';

const TEST_DATA_LOC = './assets/ultima-3/';
const OUTPUT_DIR = './out';

const buildRenderTask = (mapData: OverworldMap, map: any, tiles: any): TileMapRenderOptions => {
  return {
    gridSize: {
      width: map.dimensions.width,
      height: map.dimensions.height
    },
    tileSize: {
      width: 16,
      height: 16,
    },
    tiles,
    layout: mapData.mapTiles,
    scale: 4,
  };
};
const save = async (value: RenderedTileMap, fileName: string) => {
  const png = new PNG(value.size);
  png.data.set(value.data);
  await writePngToFile(png, path.join(OUTPUT_DIR, fileName));
};

export const renderMap = async (
  map: any,
  mode: string,
  tiles: { cgaTiles: RGBAPixel[][][]; egaTiles: RGBAPixel[][][]; vgaTiles: RGBAPixel[][][]}
) => {
  try {
    const MAP_FILE = map.file;
    const OUTPUT_FILE = path.join(OUTPUT_DIR, `${MAP_FILE}_render.png`);

    // Read the map file
    const mapBuffer = await fs.readFile(path.join(TEST_DATA_LOC, MAP_FILE));
    const mapData = decodeWorldMap(mapBuffer, {
      size: {
        width: map.dimensions.width,
        height: map.dimensions.height,
      },
      tileMapper: map.tileMapper,
    });

    switch (mode) {
      case 'CGA':
        const renderedCGA = renderTileMap(buildRenderTask(mapData, map, tiles.cgaTiles));
        await save(renderedCGA, `${MAP_FILE}_cga.png`);
        break;
      case 'EGA':
        const renderedEGA = renderTileMap(buildRenderTask(mapData, map, tiles.egaTiles));
        await save(renderedEGA, `${MAP_FILE}_ega.png`);
        break;
      case 'VGA':
        const renderedVGA = renderTileMap(buildRenderTask(mapData, map, tiles.vgaTiles));
        await save(renderedVGA, `${MAP_FILE}_vga.png`);
        break;
      case 'ALL':
        const renderCGA = renderTileMap(buildRenderTask(mapData, map, tiles.cgaTiles));
        await save(renderCGA, `${MAP_FILE}_cga.png`);
        const renderEGA = renderTileMap(buildRenderTask(mapData, map, tiles.egaTiles));
        await save(renderEGA, `${MAP_FILE}_ega.png`);
        const renderVGA = renderTileMap(buildRenderTask(mapData, map, tiles.vgaTiles));
        await save(renderVGA, `${MAP_FILE}_vga.png`);
        break;
      default:
        break;
    }

    console.log(`Map PNG written to [${OUTPUT_FILE}]`);
  } catch (err) {
    console.error('Error rendering map:', err);
  }
};
