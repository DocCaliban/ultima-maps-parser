import { reorderInterleavedRows } from "../../src/utility/cga.row.interleaver";

describe("reorderInterleavedRows", () => {
  test("interleaves an even number of rows correctly", () => {
    const input = [
      [1], // row 0
      [2], // row 1
      [3], // row 2
      [4], // row 3
    ];

    // half = 2
    // output length = 4 (same as input)

    const expected = [
      [1], // 0
      [3], // 2
      [2], // 1
      [4], // 3
    ];

    expect(reorderInterleavedRows(input)).toEqual(expected);
  });

  test("interleaves an odd number of rows (last row comes from first half)", () => {
    const input = [
      [10], // 0
      [20], // 1
      [30], // 2
    ];

    // half = 1
    // pattern:
    // out[0] = in[0]
    // out[1] = in[1]
    // out[2] = in[1] (fallback because in[2] doesn't exist)

    const expected = [
      [10],
      [20],
      [20],
    ];

    expect(reorderInterleavedRows(input)).toEqual(expected);
  });

  test("handles a single row safely", () => {
    const input = [
      [7],
    ];

    const expected = [
      [7],
    ];

    expect(reorderInterleavedRows(input)).toEqual(expected);
  });

  test("returns empty array for empty input", () => {
    expect(reorderInterleavedRows([])).toEqual([]);
  });
});
