# Ultima Asset Tools

This project provides libraries and supporting tools to decode, understand, and render game assets from the Ultima series. While the initial work focuses on Ultima III (where most of the tooling and examples live today), the project is intended to grow into a general-purpose resource for Ultima I through later entries.

Documentation
- Full project documentation lives in the `documents/` folder. See `documents/index.md` for the landing page.


What this repository contains
- Libraries (`src/`) that implement file decoders (graphics, palettes, maps) and helper utilities.
- Tools (`tools/`) that exercise the libraries, produce example outputs (PNG), and generate canonical checksums for CI.
- Documentation and developer notes in the `documents/` folder.

Philosophy
- The libraries are the primary deliverable: they let other tools or projects reuse decoding logic programmatically.
- Tools are small, executable examples and test harnesses that verify library correctness and produce human-visible outputs.

Quick start

1. Clone and install dependencies:

```bash
git clone https://github.com/DocCaliban/ultima-maps-parser.git
cd ultima-maps-parser
yarn
```

2. Run tests (unit + integration):

```bash
yarn test
```

3. Try the interactive renderer (example tool):

```bash
yarn render
```

4. Run the non-interactive CI renderer to generate a PNG and compute its CRC:

```bash
yarn render:ci SOSARIA.ULT VGA
```


Data files
- Place original game assets (map files, `.IMG`, `.ULT`, palette files) in `assets/` under the matching game folder (e.g. `assets/ultima-3/`). The repository does not ship original game assets; obtain them legally before using the tools.

Documentation and references
- Full documentation, developer guides, and format notes live in `documents/`. Start at `documents/index.md`.

Outputs
- Rendered PNGs are written to the `out/` folder by the tools.

Contributing
- The preferred workflow: fork, create a descriptive branch, add tests and minimal sample data, and submit a pull request. See `documents/developer/coding-guidelines.md` for contributor conventions.

License
- MIT — see `LICENSE`.

