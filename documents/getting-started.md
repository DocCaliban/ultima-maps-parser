# Getting Started

This page explains how to set up the project locally and run the basic tools.

Prerequisites
- Node.js (tested with Node 18+)
- Yarn

Quick setup
```bash
git clone https://github.com/DocCaliban/ultima-maps-parser.git
cd ultima-maps-parser
yarn
```

Data files
You need the original Ultima III data files (maps, tilesets, and IMG resources). Place them under `data/ultima-3/` so the render tools can access them. Consider purchasing a legal copy (for example from GOG) to obtain the assets legitimately.

Common commands
- Interactive renderer: `yarn render`
- Non-interactive CI renderer: `yarn render:ci <MAP> <MODE>` (e.g. `yarn render:ci SOSARIA.ULT VGA`)
- Regenerate canonical CRCs: `yarn ts-node ./tools/generate-crc.ts`

Output
- Rendered PNG files will be placed into the `out/` folder.
