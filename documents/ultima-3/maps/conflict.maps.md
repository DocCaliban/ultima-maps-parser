# Ultima III Conflict Map File Format

## File Layout Overview

Conflict maps (`.ULT`) are small 11×11 maps used for arena combat encounters. They include the map tiles, some unknown/unused bytes, monster data, and player character data.

| Address Range | Length | Name             | Description                                                                |
| ------------- | ------ | ---------------- | -------------------------------------------------------------------------- |
| 0x00–0x78     | 0x79   | Map Tiles        | 11×11 grid representing the arena layout. Each byte corresponds to a tile. |
| 0x79–0x7F     | 0x7    | Unknown          |                                                 |
| 0x80–0x8F     | 0x10   | Monster          | Starting X/Y coordinates, underlying tiles, and HP for up to 8 monsters.   |
| 0xA0–0xAF     | 0x10   | Player Character | Starting X/Y coordinates and tile data for 4 player characters.            |

---

## Map Tiles (0x00–0x78)

The first 0x79 bytes represent the arena tiles. The map is stored in row-major order.

**Decoding:**

1. Read 0x79 bytes from offset 0x00.
2. Each byte corresponds to a tile on the 11×11 grid.
3. Apply the arena tile translation table to map raw bytes to tile indices.

---

## Monster Data (0x80–0x8F)

This section contains monster positioning and tile information.

| Offset Range | Length | Purpose                                               |
| ------------ | ------ | ----------------------------------------------------- |
| 0x80–0x87    | 8      | Starting X coordinates for monsters 1–8               |
| 0x88–0x8F    | 8      | Starting Y coordinates for monsters 1–8               |
| 0x90–0x97    | 8      | Tiles under monsters 1–8 (See Addendum: Memory-Only Addresses)       |
| 0x98–0x9F    | 8      | Monster hit points (See Addendum: Memory-Only Addresses)       |

**Decoding:**

1. Read 8 bytes for X coordinates and 8 bytes for Y coordinates.
2. Combine the Nth X and Y byte to determine the starting position of monster N (1–8).
3. Tiles under monsters and HP are ignored in arena files.

---

## Player Character Data (0xA0–0xAF)

This section contains player character positioning and tile data.

| Offset Range | Length | Purpose                                        |
| ------------ | ------ | ---------------------------------------------- |
| 0xA0–0xA3    | 4      | Starting X coordinates for 4 player characters |
| 0xA4–0xA7    | 4      | Starting Y coordinates for 4 player characters |
| 0xA8–0xAB    | 4      | Tiles under player characters (See Addendum: Memory-Only Addresses)       |
| 0xAC–0xAF    | 4      | Base tiles for player characters (See Addendum: Memory-Only Addresses)    |

**Decoding:**

1. Read 4 bytes for X coordinates and 4 bytes for Y coordinates.
2. Combine the Nth X and Y byte to determine the starting position of player character N (1–4).
3. Tile bytes are ignored in arena files.

---

## Tile Mapping

Each byte in the conflict map must be translated through a tile mapping to match the correct CGA tile.

| Raw Value | Mapped Tile | Description |
| --------- | ----------- | ----------- |
| 0x00      | 0x00        | Water       |
| 0x01      | 0x04        | Grass       |
| 0x02      | 0x08        | Brush       |
| 0x08      | 0x20        | Floor       |
| 0x23      | 0x8C        | Wall        |
| 0x03      | 0x0C        | Forest      |


## Addendum: Memory-Only Addresses

The following address ranges exist only in memory during battle processing:

#### Monsters:
- 0x90–0x97 — Tiles under monsters 1–8
- 0x98–0x9F — Monster hit points

#### Player Characters:
- 0xA8–0xAB — Tiles under player characters 1–4
- 0xAC–0xAF — Base tiles for player characters 1–4

These values are:
- Not loaded from the conflict map file. Any bytes present in these locations when the map is loaded are ignored.
- Not saved back to the file. After the battle ends, the memory is discarded.
- Used only at runtime. They temporarily track tile positions and hit points while the battle engine is active.

Essentially, these addresses exist for runtime bookkeeping only and have no persistent effect on the stored conflict map data.

---

## Addendum: Full List of Conflict Maps

| Arena   | Description                            | Dimensions | File         |
| ------- | -------------------------------------- | ---------- | ------------ |
| Arena A | Fighting from the shore to a ship.     | 11×11      | CNFLCT_A.ULT |
| Arena B | Fighting in light brush.               | 11×11      | CNFLCT_B.ULT |
| Arena C | Fighting on a brick floor (Dungeon).   | 11×11      | CNFLCT_C.ULT |
| Arena F | Fighting among trees.                  | 11×11      | CNFLCT_F.ULT |
| Arena G | Fighting on open grass.                | 11×11      | CNFLCT_G.ULT |
| Arena M | Fighting from shore to deeper water.   | 11×11      | CNFLCT_M.ULT |
| Arena Q | Fighting from a ship into open sea.    | 11×11      | CNFLCT_Q.ULT |
| Arena R | Fighting from a ship toward the shore. | 11×11      | CNFLCT_R.ULT |
| Arena S | Fighting between two ships.            | 11×11      | CNFLCT_S.ULT |
