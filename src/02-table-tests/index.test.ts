// Uncomment the code below and write your tests
import { simpleCalculator, Action } from "./index";

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: "4", b: 2, action: Action.Exponentiate, expected: null },
  { a: 2, b: 2, action: Action, expected: null }
];

describe("simpleCalculator", () => {
  test.each(testCases)("should return expected after the action with a and b", ({ a, b, action,  expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
