# CGA Pixel Encoding Specification

## 1. Data Structure Overview

The `rawBytes` of the image data is provided as a byte array.  
Each byte in this array represents **four consecutive pixels**, packed together to minimize storage.  
Each pixel is stored as a 2-bit value (0–3), corresponding to a color index in the palette.

## 2. Byte Layout

Each byte is divided into four 2-bit segments:

| Bits   | Name    | Description       |
|--------|---------|-----------------|
| 7–6    | Pixel 0 | First pixel      |
| 5–4    | Pixel 1 | Second pixel     |
| 3–2    | Pixel 2 | Third pixel      |
| 1–0    | Pixel 3 | Fourth pixel     |

    Byte: PP QQ RR SS
           ↑  ↑  ↑  ↑
       pixel0 pixel1 pixel2 pixel3

The pixels are always stored in **left-to-right order** from high bits to low bits.

## 3. Example Encoding

Given a byte with the value:

```
0xE4 (binary: 1110 0100)
```

This decodes to:

- **Pixel 0 (bits 7–6):** `11` → 3  
- **Pixel 1 (bits 5–4):** `10` → 2  
- **Pixel 2 (bits 3–2):** `01` → 1  
- **Pixel 3 (bits 1–0):** `00` → 0  

## 4. Extraction Requirements

A decoding method must:

- Accept an array of `rawBytes` containing the encoded pixel stream.  
- Iterate over each byte in order.  
- Extract pixel values using:

    | Pixel   | Bits Used | Operation           | Details                                           |
    |---------|-----------|-------------------|--------------------------------------------------|
    | Pixel 0 | Bits 7–6  | `(byte >> 6) & 0x03` | Shifts high 2 bits down into the low position  |
    | Pixel 1 | Bits 5–4  | `(byte >> 4) & 0x03` | Shifts next 2 bits into low position           |
    | Pixel 2 | Bits 3–2  | `(byte >> 2) & 0x03` | Shifts next 2 bits into low position           |
    | Pixel 3 | Bits 1–0  | `byte & 0x03`       | Keeps last 2 bits only                         |

- **This data is stored in interleaved row order**; decoding must reorder rows according to the interleaving pattern to reconstruct the correct image.

## 5. Implementation Notes

- The format contains **no padding or dimension metadata**; knowing the width and height of the image is required to decode this data properly.
- Pixel values are **raw 2-bit integers** and require palette mapping when rendered.  
