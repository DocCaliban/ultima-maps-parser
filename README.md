# ultima-maps-parser
This project exists to make sure future generations can easily decode and understand various data formats used in the classic Ultima games—things like maps, tilesets, and other game assets. A lot of the existing tools that handle these formats are old, unmaintained, closed-source, or rely on proprietary systems. Many are difficult to learn from, and they’re not designed for long-term accessibility.

As an open-source developer, I want to change that. My goal is to build a set of tools and documentation that are fully open, easy to understand, and built using modern, accessible technologies. I want someone 20 or 30 years from now to be able to open this project and immediately grasp how to decode these files, how the formats work, and how the original games structured their data.

This project is meant to be a clear, long-lasting resource for anyone interested in how the Ultima series stored its game data—whether they’re developers, historians, or just curious fans.

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
