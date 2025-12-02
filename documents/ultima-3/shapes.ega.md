# EGA Pixel Encoding Specification

## 1. Data Structure Overview

The `rawBytes` of the image data is provided as a `Uint8Array`.  
Each byte in this array represents **two consecutive pixels**, packed together to minimize storage.  
Each pixel is stored as a 4-bit value (0–15), corresponding to a color index or intensity.

## 2. Byte Layout

Each byte is divided into two 4-bit nibbles:

| Bits | Name        | Description         |
|------|-------------|---------------------|
| 7–4  | High Nibble | Encodes **pixel 0** |
| 3–0  | Low Nibble  | Encodes **pixel 1** |

    Byte: HHHH LLLL
           ↑    ↑
       pixel 0  pixel 1

The **high nibble** always represents the first pixel.  
The **low nibble** always represents the second pixel.

## 3. Example Encoding

Given a byte with the value:
```
0xCC   (binary: 1100 1100)
```
This decodes to:
- Pixel 0 (high nibble): 1100 → 12
- Pixel 1 (low nibble): 1100 → 12

## 4. Extraction Requirements

A decoding method must:
- Accept an Array of `rawBytes` containing the encoded pixel stream.  
- Iterate over each byte in order.  
- Extract pixel values using:

    | Pixel   | Bits Used         | Operation     | Details                                           |
    | ------- | ----------------- | ------------- | ------------------------------------------------------- |
    | Pixel 0 | High nibble (7–4) | `byte >> 4`   | Shifts high nibble down into the low position           |
    | Pixel 1 | Low nibble (3–0)  | `byte & 0x0F` | Masks out the high nibble and keeps only the low nibble |

## 5. Implementation Notes

- The format contains **no padding or dimension metadata**; knowing the width and height of the image is required to decode this data properly.
- Pixel values are **raw 4-bit integers** and require palette mapping when rendered.