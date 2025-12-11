# CGA API Definition
The API exposes a single decoder function.

---

## Function: `decodeCgaData`

### Signature

```ts
export const decodeCgaData = (data: Uint8Array): RawPixelData;
```

### Description

Decodes a buffer of CGA-encoded bytes into a flat array of pixel values. The output represents the image in strict left‑to‑right, top‑to‑bottom order.

### Parameters

* **data: Uint8Array**

  * Raw CGA byte stream.
  * Must not be `null`, `undefined`, or empty.

### Returns

* **RawPixelData** — a `number[]` where each element is a 2‑bit pixel index in the range **0–3**.

### Errors

The function throws an error if:

* `data` is `null` or `undefined`,
* `data.length === 0`.

---

# CGA Decoding Overview
This document is ann explanation of how CGA (Color Graphics Adapter) pixel data is traditionally stored and how the `decodeCgaData` function converts raw CGA bytes into usable pixel indices.

The emphasis is on understanding:
* how CGA encodes pixels,
* how the decoding process works,

---

## 1. What CGA Pixel Encoding Is
CGA graphics hardware (introduced with the original IBM PC) uses **2 bits per pixel**, allowing each pixel to represent one of **four colors** (palette indices 0–3). To pack graphics efficiently into memory, CGA stores **four pixels per byte**:

```
bit7 bit6 | bit5 bit4 | bit3 bit2 | bit1 bit0
  pixel0       pixel1         pixel2         pixel3
```

* **Pixel 0** uses bits 7–6 (most significant)
* **Pixel 1** uses bits 5–4
* **Pixel 2** uses bits 3–2
* **Pixel 3** uses bits 1–0 (least significant)

Each 2‑bit value (00, 01, 10, or 11) is essentially an **index into a palette**, not an RGB color by itself.

---

## 2. Why CGA Uses This Structure

This arrangement was chosen for early PC performance and memory constraints:

* 4 pixels/byte keeps memory usage low
* sequential pixel storage makes horizontal pixel access simple
* bit‑shifting was inexpensive on 8088–class CPUs

Many DOS-era games and utilities followed this exact layout when storing CGA-based art assets in files.

---

## 3. Overview of the Decoder Implementation

The provided decoder turns a `Uint8Array` of raw CGA bytes into a flat array of 2‑bit pixel values.

### `PIXEL_MASK`

```ts
const PIXEL_MASK = 0b11;
```

`0b11` (decimal 3) isolates a 2-bit value. The mask ensures we only take the lowest two bits of any shifted result.

---

## 4. The Decoding Algorithm

### Function signature

```ts
export const decodeCgaData = (data: Uint8Array): RawPixelData => { ... }
```

It receives raw encoded bytes and returns a flat array of pixel indices.

### Step-by-step breakdown

1. **Validation**

   ```ts
   if (!data || data.length === 0) {
     throw new Error('Data buffer cannot be null, undefined, or empty.');
   }
   ```

   Ensures meaningful input.

2. **Processing every byte**

   ```ts
   return Array.from(data).flatMap((byte) => {
   ```

   `flatMap` is used to expand one input byte into four output pixels.

3. **Extracting each pixel**

   ```ts
   return [
     (byte >> 6) & PIXEL_MASK,
     (byte >> 4) & PIXEL_MASK,
     (byte >> 2) & PIXEL_MASK,
     byte & PIXEL_MASK,
   ];
   ```

   * `byte >> 6` → moves bits 7–6 into bit positions 1–0
   * `byte >> 4` → moves bits 5–4 into bit positions 1–0
   * `byte >> 2` → moves bits 3–2
   * `byte` → lowest two bits already represent pixel 3

   Applying `& PIXEL_MASK` ensures only the extracted 2‑bit value remains.

4. **Output**
   The result is a flat array like:

   ```
   [p0, p1, p2, p3, p0, p1, p2, p3, ...]
   ```

   Perfect for feeding into a renderer or palette mapper.

---

## 5. Example

Suppose a byte is:

```
byte = 0b10 01 11 00
```

This should decode to:

```
[2, 1, 3, 0]
```

Running through the function:

* `(byte >> 6) & 0b11` → `10` → 2
* `(byte >> 4) & 0b11` → `01` → 1
* `(byte >> 2) & 0b11` → `11` → 3
* `byte & 0b11` → `00` → 0

---

## 6. CGA *File Formats*

There really isn't a CGA *file format*; instead, most games and tools stored raw CGA bytes directly:

* pixel rows are stored contiguously
* each byte represents four pixels
* images often had no headers (width/height must be known in order to draw them)

The implementation here is consistent with how developers historically stored CGA sprites, tiles, fonts, and UI elements.

---

## 8. Summary

* CGA packs **4 pixels per byte, 2 bits per pixel**.
* The decoder extracts pixel indices via simple bit shifts and masking.
* `flatMap` cleanly transforms the byte stream into a pixel-index stream.
* The result can be passed directly to any palette-based renderer.

This document should give developers a solid understanding of both the historical context and the code mechanics involved in decoding CGA graphics.
