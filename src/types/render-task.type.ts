/**
 * Parameters describing a generic tile-based render operation.
 *
 * This can render:
 *  - a single tile
 *  - a grid of tiles
 *  - a full map
 *  - any arbitrary arrangement of tile pixel data
 *
 * The renderer will draw the tiles in row-major order.
 */
export interface RenderTask {
  /** Final output image width in pixels */
  width: number;

  /** Final output image height in pixels */
  height: number;

  /**
   * Width (in pixels) of each tile being rendered.
   * All tiles passed to the renderer must use this size.
   */
  tileWidth: number;

  /**
   * Height (in pixels) of each tile being rendered.
   * All tiles passed to the renderer must use this size.
   */
  tileHeight: number;

  /**
   * Tile pixel data.
   *
   * Format: tiles[tileIndex][y][x] = [r,g,b,a]
   */
  tiles: number[][][][];

  /**
   * For each tile index in the output grid, provide
   * which tile to draw at that position.
   *
   * If omitted, renderer will assume tiles are drawn
   * in sequential order left-to-right, top-to-bottom.
   */
  layout?: number[][];
}
