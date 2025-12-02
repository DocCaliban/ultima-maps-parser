# ultima-maps-parser
A toolkit for decoding and analyzing Ultima game data, including maps, tile sets, and other assets. It converts classic game files into readable formats, enabling exploration, visualization, and study of Ultima worlds.

This project is a toolkit for decoding and analyzing early Ultima game data, including maps, tile sets, dungeon layouts, and other assets. The goal is to convert proprietary game files into readable formats for exploration, visualization, and study of the classic Ultima worlds. The toolkit is modular and extensible, designed to support multiple titles in the series.

## Ultima I:
TBD – support for reading maps and tiles is planned.

## Ultima II:
TBD – support for decoding world and dungeon data is planned.

## Ultima III:
Currently supports decoding CGA 16x16 tiles from SHAPES.ULT.
```
File Format: Each tile is 64 bytes (16x16 pixels, 2 bits per pixel). Each byte encodes 4 pixels:
Bits 7-6 → pixel 0
Bits 5-4 → pixel 1
Bits 3-2 → pixel 2
Bits 1-0 → pixel 3
Rows are stored in a half-order: the first 8 decoded rows correspond to even rows (0,2,4…) and the next 8 to odd rows (1,3,5…).
```
Current Output Types:
- Raw 0–3 Pixel Array: A 16x16 array of pixel values (0–3).
- RGBA Array: Each pixel converted to a standard RGBA color using a CGA palette, producing an array [tileIndex][y][x] = [r,g,b,a].

## Ultima IV:
TBD – decoding of overworld, dungeons, and tile sets is planned.

## Ultima V:
TBD – support for more advanced map and tile structures is planned.

Purpose:
This toolkit is intended for enthusiasts, historians, and researchers interested in the structure and design of the early Ultima games. By converting classic game files into readable formats, it enables detailed exploration, visualization, and archival of these foundational RPG worlds.
