import { writePngToFile } from "../../src/utility/file.helpers";
import { PNG } from "pngjs";
import fs from "fs/promises";
import path from "path";

describe("writePngToFile", () => {
  const outputPath = "some/folder/output.png";
  let png: PNG;

  beforeEach(() => {
    jest.restoreAllMocks(); // reset any previous mocks
    png = new PNG({ width: 1, height: 1 });
  });

  it("creates the directory if it doesn't exist", async () => {
    const mkdirSpy = jest.spyOn(fs, "mkdir").mockResolvedValue(undefined);
    const writeSpy = jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);
    jest.spyOn(PNG.sync, "write").mockReturnValue(Buffer.from([1, 2, 3]));

    await writePngToFile(png, outputPath);

    expect(mkdirSpy).toHaveBeenCalledWith(path.dirname(outputPath), { recursive: true });
    expect(writeSpy).toHaveBeenCalledWith(outputPath, Buffer.from([1, 2, 3]));
  });

  it("writes the PNG buffer to the specified file", async () => {
    jest.spyOn(fs, "mkdir").mockResolvedValue(undefined);
    const writeSpy = jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);
    const pngWriteSpy = jest.spyOn(PNG.sync, "write").mockReturnValue(Buffer.from([4, 5, 6]));

    await writePngToFile(png, outputPath);

    expect(pngWriteSpy).toHaveBeenCalledWith(png);
    expect(writeSpy).toHaveBeenCalledWith(outputPath, Buffer.from([4, 5, 6]));
  });
});
