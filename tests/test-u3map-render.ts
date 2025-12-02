// This file allows you to quickly test the decoding and saving of a map to disk as a png
// TODO: Write some actual UNIT tests

import { promises as fs } from "fs";
import { extractCgaTileDataToRgba } from '../src/ultima-3/tile.decoder'
import { decodeWorldMap } from "../src/ultima-3/map.decoder";
import { renderMapAsPng } from "../src/ultima-3/png.renderer";
import { RenderTask } from "../src/types/render-task.type";
import { writePngToFile } from "../src/utility/file.utilities";

const main = async () => {
  const TEST_DATA_LOC = "./tests/data/ultima-3/"
  const TILES_FILE = "SHAPES.ULT";
  const MAP_FILE = 'SOSARIA.ULT';
  const OUTPUT_FILE = `./out/${MAP_FILE}_render.png`

  // Read shapes and decode all tiles (RGBA-ready)
  const buffer = await fs.readFile(`${TEST_DATA_LOC}${TILES_FILE}`);
  const tiles = extractCgaTileDataToRgba(buffer); // returns array of RGBA tiles

  // Read and decode SOSARIA world map
  const rawMapData = await fs.readFile(`${TEST_DATA_LOC}${MAP_FILE}`);
  const mapData = decodeWorldMap(rawMapData, { width: 64, height: 64 });
  const rendertask: RenderTask = {
    width: 64,
    height: 64,
    tileWidth: 16,
    tileHeight: 16,
    tiles,
    layout: mapData.mapTiles
  }
  const png = renderMapAsPng(rendertask, 4);
  await writePngToFile(png, OUTPUT_FILE);
  console.log(`Map PNG written to [${OUTPUT_FILE}]`);
};

main().catch(console.error);
