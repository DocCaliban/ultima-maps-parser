# DEMO.ULT Map File Format

## Overview

The `DEMO.ULT` file is a special introductory map used in Ultima III. Unlike standard overworld maps, it is a smaller map and contains only the tile layout. No entities, signs, whirlpools, or moon data are included.

* **File size:** 114 bytes
* **Dimensions:** 19×6 tiles
* **Tile storage:** 1 byte per tile, row-major order

## File Layout

| Address Range | Length | Purpose               |
| ------------- | ------ | --------------------- |
| 0x0000–0x0071 | 0x72   | Map Tiles (19×6 grid) |

**Decoding:**

* Read all 114 bytes starting at offset 0x0000.
* Arrange bytes in a 19×6 matrix (rows first, then columns).
* Each byte corresponds to a raw tile value.
* Apply the tile mapping to convert raw values to CGA tile indices for rendering.

## Tile Mapping

Each byte in DEMO.ULT represents a tile, but it must be translated through a mapping table to match the correct tile:

| Raw Value | Mapped Tile | Description       |
| --------- | ----------- | ----------------- |
| 0x00      | 0x00        | Water             |
| 0x01      | 0x04        | Grass             |
| 0x02      | 0x08        | Brush             |
| 0x03      | 0x0C        | Forest            |
| 0x04      | 0x10        | Mountains         |
| 0x05      | 0x14        | Dungeon           |
| 0x06      | 0x18        | Town              |
| 0x07      | 0x1C        | Castle            |
| 0x08      | 0x08        | Brush (duplicate) |
| 0x0B      | 0x2C        | Frigate           |
| 0x21      | 0x84        | Lava              |
| 0x22      | 0x88        | Moon Gate         |

## Notes

* This mapping is **specific to DEMO.ULT**; other maps do not require translation.
* The demo map does **not include any additional data** beyond the tile array.
