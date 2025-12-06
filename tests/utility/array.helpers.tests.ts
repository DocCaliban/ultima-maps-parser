import { get2dArray } from "../../src/utility/array.helpers";

describe("get2dArray", () => {
  it("creates a 2D array with the correct dimensions", () => {
    const result = get2dArray({ x: 3, y: 2 }, 0);

    expect(result.length).toBe(2);        // height
    expect(result[0]!.length).toBe(3);     // width
  });

  it("fills all elements with the default value", () => {
    const result = get2dArray({ x: 2, y: 2 }, "A");

    expect(result).toEqual([
      ["A", "A"],
      ["A", "A"],
    ]);
  });

  it("returns independent row arrays (no shared references)", () => {
    const result = get2dArray({ x: 2, y: 2 }, 1);

    result[0]![0] = 99;

    // Changing one row should not mutate any other row
    expect(result[1]![0]).toBe(1);
  });

  it("handles a 1×1 matrix", () => {
    const result = get2dArray({ x: 1, y: 1 }, true);

    expect(result).toEqual([[true]]);
  });

  it("handles zero dimensions", () => {
    expect(get2dArray({ x: 0, y: 0 }, 5)).toEqual([]);
  });
});
