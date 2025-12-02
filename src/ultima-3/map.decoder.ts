import { Monster, MoonPhase, OverworldMap, Whirlpool } from "../types/default.types";

interface DecodeWorldMapOptions {
    width?: number;   // optional map width in tiles
    height?: number;  // optional map height in tiles
}

export const decodeWorldMap = (
    data: Uint8Array,
    options: DecodeWorldMapOptions = {}
): OverworldMap => {
    const width = options.width ?? Math.sqrt(0x1180); // fallback if not supplied
    const height = options.height ?? Math.sqrt(0x1180);

    // --- Map tiles ---
    const mapTiles: number[][] = [];
    for (let y = 0; y < height; y++) {
        const row: number[] = [];
        for (let x = 0; x < width; x++) {
            const tileByte = data[y * width + x];
            row.push(tileByte ?? 0);
        }
        mapTiles.push(row);
    }

    // --- Monsters ---
    const monsters: Monster[] = [];
    for (let i = 0; i < 32; i++) {
        const tile = (data[0x1180 + i] ?? 0) >> 2;        // divide by 4 to get real tile number
        const floorTile = (data[0x11A0 + i] ?? 0) >> 2;   // floor under monster
        const x = data[0x11C0 + i] ?? 0;
        const y = data[0x11E0 + i] ?? 0;
        const movementFlag = data[0x1200 + i] ?? 0;

        monsters.push({ tile, floorTile, x, y, movementFlag });
    }

    // --- Whirlpool ---
    const whirlpool: Whirlpool = {
        x: data[0x1220] ?? 0,
        y: data[0x1221] ?? 0,
        dx: (data[0x1222] ?? 0) << 24 >> 24, // signed byte
        dy: (data[0x1223] ?? 0) << 24 >> 24, // signed byte
    };

    // --- Moon phases ---
    const moonPhase: MoonPhase = {
        left: data[0x1224] ?? 0,
        right: data[0x1225] ?? 0,
        leftSub: data[0x1226] ?? 0,
        rightSub: data[0x1227] ?? 0,
    };

    return {
        mapTiles,
        monsters,
        whirlpool,
        moonPhase,
    };
};
