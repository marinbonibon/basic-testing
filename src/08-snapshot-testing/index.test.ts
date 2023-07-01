// Uncomment the code below and write your tests
import { generateLinkedList } from "./index";

describe("generateLinkedList", () => {
  // Check match by expect(...).toStrictEqual(...)
  test("should generate linked list from values 1", () => {
    const linkedList = { value: 1, next: { value: 2, next: { value: null, next: null } } };
    const res = generateLinkedList([1, 2]);
    expect(res).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test("should generate linked list from values 2", () => {
    const res = generateLinkedList([3, 4]);
    expect(res).toMatchSnapshot();
  });
});
