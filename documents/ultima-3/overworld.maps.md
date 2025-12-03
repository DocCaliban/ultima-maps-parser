# Ultima III — Overworld Map File Format

### SOSARIA.ULT & AMBROSIA.ULT

This document describes the structure and behavior of the overworld map files used by Ultima III. It covers the 64×64 world map, embedded objects (monsters, horses, ships, chests), whirlpool state, and moon phase data. Tile graphics and tile IDs are documented separately in the Tileset Reference.

---

## File Layout Overview

| Offset | Length | Description                                                       |
| ------ | ------ | ----------------------------------------------------------------- |
| 0x0000 | 0x1000 | 64×64 world map (4096 bytes)                                      |
| 0x1000 | 0x0180 | Unused / reserved                                                 |
| 0x1180 | 0x0020 | Monster tile numbers (1–32); stored as monsterTile = baseTile × 4 |
| 0x11A0 | 0x0020 | Underlying tile beneath each monster (1–32); stored as tile × 4   |
| 0x11C0 | 0x0020 | Monster X coordinates (1–32)                                      |
| 0x11E0 | 0x0020 | Monster Y coordinates (1–32)                                      |
| 0x1200 | 0x0020 | Monster movement flags (1–32)                                     |
| 0x1220 | 0x0001 | Whirlpool X coordinate                                            |
| 0x1221 | 0x0001 | Whirlpool Y coordinate                                            |
| 0x1222 | 0x0001 | Whirlpool X delta (signed): 0, 1, or 0xFF (-1)                    |
| 0x1223 | 0x0001 | Whirlpool Y delta (signed): 0, 1, or 0xFF (-1)                    |
| 0x1224 | 0x0001 | Left moon phase (0–7)                                             |
| 0x1225 | 0x0001 | Right moon phase (0–7)                                            |
| 0x1226 | 0x0001 | Left moon sub-phase (0–0xB)                                       |
| 0x1227 | 0x0001 | Right moon sub-phase (0–3)                                        |

---

## Notes on Map Tile Encoding (summary)

* The 64×64 map stores tile identifiers directly. Many of the tile identifiers are also used to represent in-map objects (monsters, horses, ships, chests) via special encodings. See Tileset Reference for full tile ID list and graphics.
* Each tile is one byte in the map array. Where objects occupy a map square, special tile values are written into the map (see Objects section).

---

## Objects embedded in the map

Ultima III writes object codes directly into the world map. The primary object types are:

* Monsters
* Horses
* Ships
* Chests

Additional per-object metadata (positions, underlying tile, movement flags) is stored in the tables beginning at offsets shown above.

### Monsters

* Monster tiles in the map are encoded as baseTile shifted (multiplied) by 4: monsterTile = baseTile × 4.
* The underlying terrain tile beneath each monster is stored in the table at offset 0x11A0; those entries are likewise stored as tile × 4.
* Monster positions are stored in the tables at 0x11C0 (X coordinates) and 0x11E0 (Y coordinates). Index 0 corresponds to monster 1, index 31 corresponds to monster 32.
* Movement flags for each monster are stored at 0x1200 (one byte per monster).

### Horses

* A horse object is encoded in the map as tile 0x28, which equals horseTile × 4.
* The tile under a horse must be grass (tile 0x01). The game enforces dismounting only onto grass.

### Ships

* Ships are encoded in the map as tile 0x2C, which equals shipTile × 4.
* Ships always sit on water, so the underlying tile is water (tile 0x00).

### Chests

* Chests are encoded with the underlying terrain stored in the bottom two bits of the chest tile value. The four possibilities map to terrain as follows:

  * chestTile*4 + 0 → chest on bricks (underlying tile 0x08)
  * chestTile*4 + 1 → chest on grass  (underlying tile 0x01)
  * chestTile*4 + 2 → chest on forest (underlying tile 0x02)
  * chestTile*4 + 3 → chest on deep forest (underlying tile 0x03)
* Only one chest can occupy a map square; monsters cannot step on chest tiles.

---

## Whirlpool behavior

* Whirlpool X/Y coordinates are stored at 0x1220 (X) and 0x1221 (Y).
* Movement deltas are signed bytes at 0x1222 (ΔX) and 0x1223 (ΔY). Valid values are 0 (no move), 1 (move +1), or 0xFF (which represents -1).
* Each game turn, the whirlpool position is updated by adding the signed deltas to the coordinates.

---

## Moon phases and sub-phases

Ultima III tracks two moons. For each moon the file stores a phase and a sub-phase:

* Left moon: phase (0–7) at 0x1224, sub-phase (0–0xB) at 0x1226
* Right moon: phase (0–7) at 0x1225, sub-phase (0–3) at 0x1227

### Advancement rules

* At the end of each turn both sub-phases are decremented by 1.
* If a sub-phase reaches -1 it wraps to its maximum (0xB for left, 3 for right), and the corresponding moon phase is incremented by 1.
* The phase values (0–7) are what the UI displays at the top of the overworld window.

---

## Implementation notes

* Map indexing: the 64×64 map can be treated as rows of 64 bytes each. Use row-major order (row 0, then row 1, etc.).
* Monster table indices: monster index 0 maps to the first monster slot; up to 32 slots are provided.
* Tile multiplication: when reading stored monster/horse/ship values from the map, divide the stored value by 4 (integer division) to obtain the base tile index used in the Tileset Reference.

---