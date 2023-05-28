import { bubbleSortDownTest, bubbleSortUpTest, selectionSortDownTest, selectionSortUpTest } from "./sorting-page-functions";

// Корректно сортирует 
// пустой массив;
// массив из одного элемента;
// массив из нескольких элементов

describe('selectionSortUpTest', () => {

    it('should correctly sort an empty array', async () => {
        expect(await selectionSortUpTest([])).toEqual([])
    });

    it('should correctly sort an array with one element', async () => {
        expect(await selectionSortUpTest([1])).toEqual([1])
    });

    it('should correctly sort an array with multiple elements', async () => {
        expect(await selectionSortUpTest([5, 4, 3, 2, 1])).toEqual([1,2,3,4,5])
    });

  });
  describe('selectionSortDownTest', () => {

    it('should correctly sort an empty array', async () => {
        expect(await selectionSortDownTest([])).toEqual([])
    });

    it('should correctly sort an array with one element', async () => {
        expect(await selectionSortDownTest([1])).toEqual([1])
    });

    it('should correctly sort an array with multiple elements', async () => {
        expect(await selectionSortDownTest([1, 2, 3, 4, 5])).toEqual([5,4,3,2,1])
    });

  });



  describe('bubbleSortUpTest', () => {

    it('should correctly sort an empty array', async () => {
        expect(await bubbleSortUpTest([])).toEqual([])
    });

    it('should correctly sort an array with one element', async () => {
        expect(await bubbleSortUpTest([1])).toEqual([1])
    });

    it('should correctly sort an array with multiple elements', async () => {
        expect(await bubbleSortUpTest([5, 4, 3, 2, 1])).toEqual([1,2,3,4,5])
    });

  });
  describe('bubbleSortDownTest', () => {

    it('should correctly sort an empty array', async () => {
        expect(await bubbleSortDownTest([])).toEqual([])
    });

    it('should correctly sort an array with one element', async () => {
        expect(await bubbleSortDownTest([1])).toEqual([1])
    });

    it('should correctly sort an array with multiple elements', async () => {
        expect(await bubbleSortDownTest([1, 2, 3, 4, 5])).toEqual([5,4,3,2,1])
    });

  });

