const { mean } = require("../utils/testing");

describe("mean", () => {
  test("calculates mean of array [2,2] to be 2", () => {
    const result = mean([2, 2]);
    expect(result).toBe(2);
  });

  test("calculates mean of empty array to be 0", () => {
    const result = mean([]);
    expect(result).toBe(0);
  });
});
