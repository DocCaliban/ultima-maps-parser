
export const alternateCgaPalette: [number, number, number][] = [
    [0, 0, 0],       // black
    [0, 127, 0],     // blue
    [200, 90, 90],   // red
    [0, 148, 255],   // white
];

export const cgaPalette: [number, number, number][] = [
    [0, 0, 0],       // black
    [0, 255, 255],   // cyan
    [255, 0, 255],   // magenta
    [255, 255, 255], // white
];

/**
 * EGA Palette for Ultima III (example from Shapes.ega)
 * Maps pixel index (0-15) → [R,G,B,A]
 */
export const egaPalette: [number, number, number][] = [
    [0, 0, 0], // 0  Black
    [0, 112, 252], // 1  Blue
    [0, 176, 0], // 2  Green
    [0, 252, 252], // 3  Cyan
    [252, 0, 0], // 4  Red
    [128, 128, 128], // 5  Unknown / placeholder
    [252, 144, 0], // 6  Orange
    [176, 176, 176], // 7  Light gray
    [176, 176, 176], // 8  Duplicate light gray
    [0, 0, 252], // 9  Dark blue
    [0, 176, 0], // 10 Green duplicate
    [0, 252, 252], // 11 Cyan duplicate
    [252, 0, 0], // 12 Red duplicate
    [252, 0, 252], // 13 Magenta
    [252, 252, 0], // 14 Yellow
    [252, 252, 252], // 15 White
];

export const palettes = {
    alternateCgaPalette,
    cgaPalette,
    egaPalette
}