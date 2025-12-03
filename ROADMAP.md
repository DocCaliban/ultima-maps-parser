# Ultima Maps Parser – Roadmap

This roadmap outlines the planned support and development for decoding, rendering, and analyzing maps and other assets from the Ultima series. Each game is broken down with its own section, describing current status, short-term goals, and long-term objectives.

---

## Ultima I
**Status:** TBD  
**Goals:**  
- [ ] Decode world maps  
- [ ] Decode town/castle maps  
- [ ] Extract tilesets and graphics  
- [ ] Render basic maps to PNG  

**Long-Term Objectives:**  
- [ ] Add JSON export of maps  
- [ ] Enable editing or annotation of maps  
- [ ] Support all known Ultima I asset formats  

---

## Ultima II
**Status:** TBD  
**Goals:**  
- [ ] Decode world and dungeon maps  
- [ ] Extract tilesets  
- [ ] Handle unique Ultima II map encoding  

**Long-Term Objectives:**  
- [ ] PNG export of maps  
- [ ] JSON output for use in other tools  

---

## Ultima III
**Status:** Partial (current work in `tests/test-u3map-render.ts`)  
**Goals:**  
- [x] Decode CGA graphics  
- [x] Decode EGA graphics  
- [x] Render overworld map 
- [x] Render each town map
- [x] Render Battle Arenas
- [x] Render Demo/Intro map
- [ ] Render dungeon maps using 2D tiles (not 3D)  
- [ ] Explore support for alternate file types / ports:  
  - [ ] Commodore 64  
  - [ ] Atari  
  - [ ] Nintendo or other platforms  

**Long-Term Objectives:**  
- [ ] Create full JSON representation of all maps  
- [ ] Build a visualization tool for maps with selectable layers (towns, dungeons, overworld)  
- [ ] Maintain open-source, cross-platform compatibility  

---

## Ultima IV
**Status:** TBD  
**Goals:**  
- [ ] Decode overworld, towns, and dungeons  
- [ ] Extract tilesets  
- [ ] Render maps to PNG  

**Long-Term Objectives:**  
- [ ] JSON export of map layouts  
- [ ] Support all known asset formats  

---

## Ultima V
**Status:** TBD  
**Goals:**  
- [ ] Decode overworld, towns, and dungeons  
- [ ] Extract and decode BRIT.DAT / map files  
- [ ] Render maps to PNG  

**Long-Term Objectives:**  
- [ ] Add JSON output  
- [ ] Handle special tile cases  

---

## Ultima VI
**Status:** TBD  
**Goals:**  
- [ ] Decode world and city maps  
- [ ] Extract tilesets  
- [ ] Render maps to PNG  

**Long-Term Objectives:**  
- [ ] Add JSON representation  
- [ ] Support dynamic events or objects  

---

## Ultima VII
**Status:** TBD  
**Goals:**  
- [ ] Decode map chunks and assets  
- [ ] Render maps to PNG  
- [ ] Extract tilesets  

**Long-Term Objectives:**  
- [ ] Support modded maps  
- [ ] Enable JSON export  

---

## Ultima VIII
**Status:** TBD  
**Goals:**  
- [ ] Decode world maps and dungeons  
- [ ] Extract tilesets and objects  
- [ ] Render maps to PNG  

**Long-Term Objectives:**  
- [ ] JSON export  
- [ ] Support all Ultima VIII assets  

---

## Ultima IX
**Status:** TBD  
**Goals:**  
- [ ] Decode maps from game files  
- [ ] Extract tilesets / textures  
- [ ] Render maps to PNG  

**Long-Term Objectives:**  
- [ ] JSON export  
- [ ] Support future modding and analysis  

---

## Notes
- “TBD” indicates areas where development has not yet started.  
- PNG rendering refers to a first-pass visual output of maps.  
- JSON export provides structured data for analysis or integration with other tools.  
- As we progress, we will **document all file formats, map layouts, tilesets, and other discovered details** to ensure a clear record for future developers and users.
