# Continuous Integration

This project uses a CRC-based CI workflow for verifying map renders without storing binary reference images.

CI runner
- Use `tools/render-ci.ts` to render a map non-interactively and compute a CRC of the generated PNG.
- Example: `yarn render:ci SOSARIA.ULT VGA`

Exit codes
- `0` — Success (CRC matched expected or no expected CRC present and generation succeeded)
- `3` — CRC mismatch (generated CRC differs from expected)
- `4` — Compute/compare error (unable to calculate or compare CRC)

Updating expected CRCs
- When intentional changes are made to the rendering pipeline, re-run `yarn ts-node ./tools/generate-crc.ts` and commit the updated `tools/expected-crc.json`.
