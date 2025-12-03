# SHAPES.ULT – CGA Pixel Encoding Specification

## Overview

`SHAPES.ULT` contains the **graphic tiles** used in Ultima III. Each tile is **16×16 pixels**, stored in a **CGA-style 2-bit per pixel encoding**.  

The encoding packs **four pixels per byte**, with no metadata for dimensions or padding.

---

## Byte Layout

Each byte contains **four consecutive pixels**, from **left to right**, with 2 bits per pixel:

| Bits   | Pixel  | Description        |
|--------|--------|------------------|
| 7–6    | Pixel 0 | First pixel       |
| 5–4    | Pixel 1 | Second pixel      |
| 3–2    | Pixel 2 | Third pixel       |
| 1–0    | Pixel 3 | Fourth pixel      |

**Example Value:**

```
0xE4 (binary 1110 0100)
```

Decodes to:

- Pixel 0: `11` → 3  
- Pixel 1: `10` → 2  
- Pixel 2: `01` → 1  
- Pixel 3: `00` → 0  

---

## Pixel Extraction

To extract pixels from a byte:

| Pixel   | Bits Used | Extraction Expression      |
|---------|-----------|---------------------------|
| Pixel 0 | 7–6       | `(byte >> 6) & 0x03`      |
| Pixel 1 | 5–4       | `(byte >> 4) & 0x03`      |
| Pixel 2 | 3–2       | `(byte >> 2) & 0x03`      |
| Pixel 3 | 1–0       | `byte & 0x03`             |

---

## Row Interleaving

Tiles in `SHAPES.ULT` are stored in **interleaved row order**:

- The **first 8 rows** of a tile are stored in **even rows** (0, 2, 4 …)  
- The **last 8 rows** are stored in **odd rows** (1, 3, 5 …)  

Decoding must **reorder the rows** to reconstruct the full 16×16 tile correctly.
