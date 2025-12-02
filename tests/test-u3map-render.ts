// This file allows you to quickly test the decoding and saving of a map to disk as a PNG  
// TODO: Write some actual UNIT tests

import { promises as fs } from "fs";  
import { extractCgaTileDataToRgba, extractEgaTileDataToRgba } from '../src/ultima-3/tile.decoder';  
import { decodeWorldMap } from "../src/ultima-3/map.decoder";  
import { renderMapAsPng } from "../src/ultima-3/png.renderer";  
import { RenderTask } from "../src/types/render-task.type";  
import { writePngToFile } from "../src/utility/file.utilities";  

// Main entrypoint: asynchronous function so we can use await
const main = async () => {  
  // Where to find test input data (tiles + map)  
  const TEST_DATA_LOC = "./tests/data/ultima-3/";  
  const TILES_FILE = "shapes.ega";  // The tileset file (contains the “shapes/tiles” data)  
  const MAP_FILE = 'BRITISH.ULT';   // The world map data file we want to render  
  const OUTPUT_FILE = `./out/${MAP_FILE}_render.png`;  // Path where the rendered PNG will be saved  

  // Read the binary data of the tiles file  
  const buffer = await fs.readFile(`${TEST_DATA_LOC}${TILES_FILE}`);  
  // Decode all tiles: convert raw CGA‑style tile data into RGBA (usable color + alpha) format  
  const tiles = extractEgaTileDataToRgba(buffer);  
  // `tiles` is now an array of RGBA‑formatted tiles ready for use in rendering  

  // Read the binary data of the world map file  
  const rawMapData = await fs.readFile(`${TEST_DATA_LOC}${MAP_FILE}`);  
  // Decode the world map: interpret the map data according to Ultima III’s map format  
  // Provide expected map dimensions (width, height in tiles or blocks — here 64×64)  
  const mapData = decodeWorldMap(rawMapData, { width: 64, height: 64 });  

  // Build a “render task” describing how to draw the map  
  const rendertask: RenderTask = {  
    width: 64,             // map width (in tiles)  
    height: 64,            // map height (in tiles)  
    tileWidth: 16,         // width of each tile (in pixels)  
    tileHeight: 16,        // height of each tile (in pixels)  
    tiles,                 // the tileset data (RGBA tiles)  
    layout: mapData.mapTiles  // map layout: how tiles are arranged to form the world map  
  };  

  // Renders the map to a PNG image. The '4' parameter indicates a scale factor (e.g. 4×) I would reccommend 
  // not going above 8 unless you have a super beefy PC, even then I don't think the `pngjs` library can handle 
  // anything larger than 16
  const png = renderMapAsPng(rendertask, 4);  

  // Write the PNG data to disk at the specified output path  
  await writePngToFile(png, OUTPUT_FILE);  

  console.log(`Map PNG written to [${OUTPUT_FILE}]`);  
};

// Run the main function and catch any errors  
main().catch(console.error);
