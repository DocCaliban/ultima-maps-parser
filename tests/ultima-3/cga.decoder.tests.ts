import { decodeCgaImageData } from '../../src/graphics/cga/cga.decoder';
import { ImageDecoderOptions } from '../../src/ultima-3/types/decoder.types';
import { rawCgaBrushTile, decodedCgaBrushTile } from './test.constants'

describe('decodeCgaPixelData', () => {
    it('decodes a simple 16x16 tile correctly', () => {
        // Example: 16x16 pixels, 128 bytes per image (for 2 pixels per byte)
        const sampleData = new Uint8Array(128).map((_, i) => i & 0xff); // simple pattern for testing

        const options: ImageDecoderOptions = {
            bytesPerImage: 64,
            pixelDimensions: { x: 16, y: 16 },
        };

        const result = decodeCgaImageData(rawCgaBrushTile, options);

        // Check the result has the correct dimensions
        expect(result.length).toBe(16);          // 16 rows
        expect(result[0]!.length).toBe(16);       // 16 columns

        expect(result).toEqual(decodedCgaBrushTile);

    });

    it('throws if data is too short', () => {
        const shortData = new Uint8Array(10);
        const options: ImageDecoderOptions = { bytesPerImage: 128, pixelDimensions: { x: 16, y: 16 } };
        expect(() => decodeCgaImageData(shortData, options)).toThrow(/Data buffer must be a Uint8Array/);
    });
});
