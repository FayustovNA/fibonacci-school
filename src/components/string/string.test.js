import { reverseString } from "./utils";
// Корректно разворачивает строку
// с чётным количеством символов.
// с нечетным количеством символов.
// с одним символом.
// пустую строку

describe("reverseString function", () => {
    it("should reverse a string with even number of characters", async () => {
      expect(await reverseString("test")).toEqual([
        { item: "t", state: 'modified' },
        { item: "s", state: 'modified' },
        { item: "e", state: 'modified'},
        { item: "t", state: 'modified'}
    ]);
});

it('should reverse a string with odd number of characters', async () => {
    expect(await reverseString("world")).toEqual([
      { item: "d", state: 'modified' },
      { item: "l", state: 'modified' },
      { item: "r", state: 'modified'},
      { item: "o", state: 'modified'},
      { item: "w", state: 'modified'}
  ]);
});

it('should return an array with one element if given a string with one character', async () => {
    expect(await reverseString("a")).toEqual([
      { item: "a", state: 'modified' },
  ]);
});

it('should return an empty array if given an empty string', async () => {
    expect(await reverseString("")).toEqual([]);
});

});
