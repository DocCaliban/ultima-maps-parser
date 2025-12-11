# EGA Decoding Overview

This document explains how EGA (Enhanced Graphics Adapter) pixel data is stored and how the provided `decodeEGAData` function converts raw encoded bytes into usable pixel indices.

Like the CGA document, the focus here is on the code, with context on how developers traditionally structured EGA graphics data.

---

## 1. What EGA Pixel Encoding Is

EGA increases color depth over CGA. Instead of 2 bits per pixel, EGA uses **4 bits per pixel**, allowing **16 possible color indices**.

To pack this efficiently, EGA stores **two pixels per byte**:

```
bit7 bit6 bit5 bit4 | bit3 bit2 bit1 bit0
       pixel 0           pixel 1
```

* **Pixel 0** is stored in the **high nibble** (bits 7–4)
* **Pixel 1** is stored in the **low nibble** (bits 3–0)

Each 4-bit value is a palette index.

---

## 2. Why EGA Uses this structure (Nibbles)

EGA needed to balance higher color depth with memory constraints of the era:

* keeps pixel boundaries aligned,
* allows simple masking/shifting,
* enables faster decoding on 16-bit CPUs,
* fits cleanly into byte-oriented memory.

Many MS-DOS games and tools adopted this direct storage approach.

---

## 3. Overview of the Decoder Implementation

### Constants

```ts
const BITS_PER_PIXEL = 4;
const PIXEL_MASK = 0b1111; // decimal 15
```

These reflect the 4-bit-per-pixel structure.

---

## 4. The Decoding Algorithm

### Function signature

```ts
export const decodeEGAData = (data: Uint8Array): RawPixelData => { ... }
```

It accepts EGA-encoded bytes and returns a flat array of 4-bit palette indices.

### Step-by-step breakdown

1. **Validation**

   ```ts
   if (!data || data.length === 0) {
     throw new Error('Data buffer cannot be null, undefined, or empty.');
   }
   ```

2. **Process each byte with `flatMap`**

   ```ts
   return Array.from(data).flatMap((byte) => {
   ```

   Each byte becomes two output pixels.

3. **Extract high and low nibbles**

   ```ts
   const highPixel = (byte >> BITS_PER_PIXEL) & PIXEL_MASK;
   const lowPixel = byte & PIXEL_MASK;
   return [highPixel, lowPixel];
   ```

   * Shifting the byte right by 4 moves the high nibble into positions 3–0.
   * Masking with `0b1111` isolates the 4-bit pixel.

4. **Output format**
   The result is a sequence like:

   ```
   [p0, p1, p0, p1, ...]
   ```

---

## 5. Example

Given:

```
byte = 0b1100 0011
```

High nibble: `1100` → 12
Low nibble:  `0011` → 3

Decoded output:

```
[12, 3]
```

---

## 6. Relationship to EGA File Storage

As with CGA, there is no single standardized ".ega" file format. Developers typically stored raw EGA pixels directly:

* two pixels per byte,
* rows stored sequentially,
* assets often lacked metadata (width/height known from context),
* palette information was usually external.

This decoding pattern matches how most DOS games packed EGA sprites, tiles, and UI art.

---

## 7. Summary

* EGA uses **4 bits per pixel**, allowing 16 colors.
* Graphics pack **two pixels per byte**.
* Decoding uses a clean high-nibble / low-nibble separation.
* `flatMap` naturally expands the byte stream into a pixel stream.

This document equips developers to understand and work with raw EGA tile data using the provided decoder.
