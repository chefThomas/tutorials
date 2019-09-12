// import functions for unit testing
const { palindrome } = require("../utils/testing");

describe("palindrome", () => {
  test("palindrome of a", () => {
    const result = palindrome("a");

    expect(result).toBe("a");
  });

  test("palindrome of abc", () => {
    const result = palindrome("abc");

    expect(result).toBe("cba");
  });
});
