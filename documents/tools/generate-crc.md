# Generator: `generate-crc.ts`

Purpose
- Render every supported map in CGA/EGA/VGA modes, compute a CRC32 of the generated PNG, and write the canonical mapping to `tools/expected-crc.json`.

Usage
```bash
yarn ts-node ./tools/generate-crc.ts
```

Notes
- The generator records `null` for map/mode combinations that fail to render.
- If you add or change map metadata (for example, `tileMapper` entries) re-run this generator to update `tools/expected-crc.json`.

Where the results go
- `tools/expected-crc.json` — JSON mapping of `MAP_FILE` → `MODE` → `crc32` (or `null`).
