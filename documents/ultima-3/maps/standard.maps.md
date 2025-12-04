# Ultima III Map File Format

## File Layout Overview
The Ultima III map file starts with a 64×64 grid that lays out the tiles for the map. Following that is a section for sign data—this part may or may not be used, depending on the map. Afterward, the file tracks NPCs and monsters—their tiles, the floors they stand on, their positions, and movement flags. At the end, small sections store environmental details like whirlpools and moon phases, letting the game save and restore the current state of the world.

| Address Range | Length              | Name           | Description                                                                            |
| ------------- | ------------------- | -------------- | -------------------------------------------------------------------------------------- |
| 0x0000–0x0FFF | 0x1000 (4096 Bytes) | Map Tiles      | 64×64 grid representing the map layout. Each byte corresponds to a tile on the map.    |
| 0x1000–0x117F | 0x180 (384 Bytes)   | Sign Data      | Sign data for the map.                                                                 |
| 0x1180–0x121F | 0xA0 (160 Bytes)    | Entities       | Tile, underlying floor, coordinates, and movement flags for up to 32 NPCs or monsters. |
| 0x1220–0x1223 | 0x4 (4 Bytes)       | Whirlpool Data | X/Y coordinates and movement deltas for the whirlpool.                                 |
| 0x1224–0x1227 | 0x4 (4 Bytes)       | Moon Phases    | Phase and sub-phase for the left and right moons.                                      |

## Map Tiles (0x0000–0x0FFF)

The Map Tiles section is the first part of the map file and represents the static layout of the map. It consists of a 64×64 grid of bytes in row-major order, where each byte corresponds to a single tile on the map. The first 64 bytes form the top row (Y=0), the next 64 bytes form the second row (Y=1), and so on.

### Decoding

* Read 0x1000 (4096) bytes starting at offset 0x0000.
* Each byte is an index into the game’s tile set.
* Arrange the bytes into a 64×64 matrix to reconstruct the map visually or logically.

### Chests

* Ultima III stores chest locations directly on the map.
* Chests are encoded in the tile values with the underlying terrain stored in the bottom two bits of the chest tile value.
* Only one chest can occupy a map square.
* The four possible underlying terrains:

  | Bottom 2 bits | Terrain          | Tile Value |
  | ------------- | ---------------- | ---------- |
  | 0             | Bricks           | 0x08      |
  | 1             | Grass            | 0x01      |
  | 2             | Forest           | 0x02      |
  | 3             | Deep Forest      | 0x03      |

* Example: A chest on bricks → `chestTile*4 + 0`.

## Sign Data
The Sign Data section of the map file holds the text for signs and potentially other in-game messages. Not every map uses this section, but when it does, it stores a small table of offsets pointing to the actual text strings. The following steps explain how to read and interpret this data.

* Read from 0x1000 in the map data.
* Interpret each 2 bytes as a little-endian integer — this is a candidate sign offset.
* Stop reading offsets when either:
  * You have read 8 offsets (the maximum allowed).
  * The next 2 bytes are not a valid offset (i.e., they point outside the sign text block 0x1000–0x1179).
* After the last valid offset, the sign texts begin at the locations indicated by the offsets.
* Each offset points to the start of a null-terminated ASCII string.
* Read all text until a null byte (0x00) is encountered.

## Entities (0x1180–0x121F)
This section covers all entity data, including monsters, NPCs, horses, and ships. It defines the visual tile for each entity, the terrain beneath them, their starting positions, and their movement or behavior flags.

### Entity Data Block

The entity data is stored in five consecutive 32-byte ranges, each corresponding to a specific property of the 32 possible entities on the map.  

| Address Range       | Length | Name               | Description                                                                                 |
| ------------------ | ------ | ----------------- | ------------------------------------------------------------------------------------------- |
| 0x1180–0x119F      | 0x20   | Entity Tiles       | Tile assigned to each NPC or monster (32 slots). Divide by 4 to get the actual tile index.  |
| 0x11A0–0x11BF      | 0x20   | Underlying Tiles   | Tile of the floor under each NPC or monster (32 slots). Divide by 4 to get the actual tile index. |
| 0x11C0–0x11DF      | 0x20   | Entity X           | Starting X coordinate for each NPC or monster (32 slots).                                   |
| 0x11E0–0x11FF      | 0x20   | Entity Y           | Starting Y coordinate for each NPC or monster (32 slots).                                   |
| 0x1200–0x121F      | 0x20   | Entity Move Flags  | Movement flags and optional dialog number for each NPC or monster (32 slots).              |

**Decoding:**

1. Read 32 bytes from each range in the order above.  
2. Divide entity and underlying tiles by 4 to get the actual tile indices.  
3. Combine the Nth byte from each range to construct the full record for entity N (0–31).  

Example:  

- Entity 0 → first byte of each range  
- Entity 1 → second byte of each range  
- …  
- Entity 31 → last byte of each range  

### Special Behaviors

Some entities have unique behaviors:

* **Horses:** Can only be dismounted onto grass (underlying tile 0x01).  
* **Ships:** Must be positioned on water (underlying tile 0x00).  
* **Monsters:** Can occupy any tile except chest locations.  
* **Chests:** Only one per map square; underlying terrain is encoded in the bottom two bits of the chest tile value (see map tiles section for decoding).


## Whirlpool Data (0x1220–0x1223)
The Whirlpool Data block is 4 bytes long and stores the current position and movement deltas of the whirlpool.

**Decoding:**

* Read 4 bytes starting at offset 0x1220:
  * **Byte 0:** Whirlpool X coordinate (0–63)
  * **Byte 1:** Whirlpool Y coordinate (0–63)
  * **Byte 2:** Whirlpool ΔX (signed byte)
    * 0 = no change
    * 1 = move +1
    * 0xFF = move -1
  * **Byte 3:** Whirlpool ΔY (signed byte)
    * 0 = no change
    * 1 = move +1
    * 0xFF = move -1

**Update rules:**

* Each game turn, update the whirlpool position by adding ΔX to X and ΔY to Y.
* Coordinates wrap around if they go outside the 0–63 range.

## Moon Data (0x1224–0x1227)
The Moon Data block stores the phase and sub-phase of the two moons in the game.

**Decoding:**

* Read 4 bytes starting at offset 0x1224:
  * **Byte 0:** Left moon phase (0–7)
  * **Byte 1:** Right moon phase (0–7)
  * **Byte 2:** Left moon sub-phase (0–11)
  * **Byte 3:** Right moon sub-phase (0–3)

**Update rules:**

* At the end of each turn:
  * Decrement both sub-phases by 1.
  * If a sub-phase becomes -1:
    * Wrap to maximum (0xB for left, 3 for right).
    * Increment corresponding moon phase by 1.
* Moon phases (0–7) are what the game UI displays.


## Implementation Notes

* Map indexing: 64×64 map uses row-major order (row 0 → row 63).
* Monster table indices: index 0 → first monster slot, up to 32 slots.
* Tile multiplication: stored monster/horse/ship values divide by 4 for base tile index.
* Chests: encoded using bottom two bits of tile for underlying terrain.
* When rendering entities, combine entity tile, underlying tile, and X/Y coordinates.


## Addendum: Full list of Maps
Sorry for the descriptions, I just mostly made stuff up.

| Category  | Name                   | Description                                                                                | Dimensions (X×Y) | Location (X,Y) | File         |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------ | ---------------- | -------------- | ------------ |
| Town      | Moon                   | A small frontier town on the edge of the world.                                            | 64×64            | 6,13           | MOON.ULT     |
| Town      | Fawn                   | A quiet town surrounded by forests.                                                        | 64×64            | 30,2           | FAWN.ULT     |
| Town      | Yew                    | A town known for its smiths and merchants.                                                 | 64×64            | 34,16          | YEW.ULT      |
| Town      | Lord British Town      | The main settlement surrounding the castle of Lord British.                                | 64×64            | 46,19          | LCB.ULT      |
| Town      | Death Gultch           | A desert town near harsh terrain, dangerous for travelers.                                 | 64×64            | 56,31          | DEATH.ULT    |
| Town      | Devil Guard            | A fortified town guarding a mountain pass.                                                 | 64×64            | 18,31          | DEVIL.ULT    |
| Town      | Grey                   | A mining town with a somber atmosphere.                                                    | 64×64            | 7,44           | GREY.ULT     |
| Town      | Dawn                   | A peaceful town near farmland and rivers.                                                  | 64×64            | 37,53          | DAWN.ULT     |
| Town      | Montor West            | The western part of the twin Montor towns.                                                 | 64×64            | 47,58          | MONTOR_W.ULT |
| Town      | Montor East            | The eastern part of the twin Montor towns.                                                 | 64×64            | 49,58          | MONTOR_E.ULT |
| Town      | Ambrosia               | A southern town known for trade and exotic goods.                                          | 64×64            | 18,60          | AMBROSIA.ULT |
| Castle    | Castle of Lord British | Home of Lord British, central to the realm.                                                | 64×64            | 45,18          | BRITISH.ULT  |
| Castle    | Castle Exodus          | A prominent castle in the eastern lands.                                                   | 64×64            | 10,53          | EXODUS.ULT   |
| Arena     | Arena A                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_A.ULT |
| Arena     | Arena B                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_B.ULT |
| Arena     | Arena C                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_C.ULT |
| Arena     | Arena D                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_D.ULT |
| Arena     | Arena F                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_F.ULT |
| Arena     | Arena G                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_G.ULT |
| Arena     | Arena M                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_M.ULT |
| Arena     | Arena Q                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_Q.ULT |
| Arena     | Arena R                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_R.ULT |
| Arena     | Arena S                | A small battle arena for combat encounters.                                                | 11×11            | 0,0            | CNFLCT_S.ULT |
| Overworld | Intro Map              | The introductory map shown when starting the game.                                         | 19×6             | 0,0            | DEMO.ULT     |
| Overworld | Sosaria                | The main overworld of Ultima III, containing all towns, castles, dungeons, and wilderness. | 64×64            | 0,0            | SOSARIA.ULT  |
| Overworld | Ambrosia               | A southern region famous for fertile lands and trade routes.                               | 64×64            | 0,0            | AMBROSIA.ULT |
