# Developer Architecture

Overview
- Core components:
  - `src/graphics/*` — decoders for CGA, EGA, VGA and palette utilities.
  - `src/ultima-3/*` — map decoders, tile extraction and mapping tables for Ultima III.
  - `src/utility/*` — helpers for array operations, file handling, and interleaving.
  - `tools/*` — command-line tools for rendering and generating CRCs.

Data flow
1. Raw files (e.g. `.ULT`, `.IMG`, `.VGA`, `.PAL`) are read from `data/ultima-3/`.
2. Decoders turn raw bytes into tile buffers and indexed pixel data.
3. Palettes are applied to produce RGBA pixel buffers.
4. Tilemaps are assembled and rendered to PNG by the renderer.

Adding support
- To add a new decoder or palette, add a module under `src/graphics` and wire it into the renderer.
- For special IMG resources, update `src/ultima-3/constants/ultima3.imgs.ts` with the correct `tileMapper`.
