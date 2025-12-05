# IMG Scenes File Format

## File Layout Overview

The IMG scene files are 11×11 tile grids representing various locations or “scenes” in Ultima III. Each byte corresponds to a tile in the scene. These files are small, self-contained, and require a translation table to map raw byte values to the correct tile graphics.

| Address Range | Length     | Name      | Description                                  |
| ------------- | ---------- | --------- | -------------------------------------------- |
| 0x00–0x78     | 0x79 (121) | Image Tiles | 11×11 grid; each byte corresponds to a tile. |

### Decoding

* Read 121 bytes starting at offset 0x00.
* Arrange the bytes into an 11×11 grid in row-major order.
* Each byte must be translated using the **IMG Tile Translation Table** to match the correct tile graphics.

### Tile Mapping

Each byte in an IMG file represents a tile, but it must be translated through a mapping table:

| Raw Value | Mapped Tile | Description |
| --------- | ----------- | ----------- |
| 0x00      | 0x00        | Water       |
| 0x20      | 0x80        | Force Field |
| 0x21      | 0x84        | Lava        |
| 0x22      | 0x88        | Moon Gate   |
| 0x23      | 0x8C        | Wall        |
| 0x24      | 0x90        | Void        |

### Notes

* This mapping is **specific to IMG scene files**.
* The raw file contains no metadata; the width, height, and mapping table are required to interpret the file correctly.
