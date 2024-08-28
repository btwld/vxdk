import { ArrayUtils, SortByOrder } from '../array.utils';

describe('ArrayUtils', () => {
  describe('sortBy', () => {
    it('should sort an array in ascending order by default', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
      const sortedArr = ArrayUtils.sortBy(arr);
      expect(sortedArr).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 6, 9]);
    });

    it('should sort an array in descending order when specified', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
      const sortedArr = ArrayUtils.sortBy(arr, undefined, SortByOrder.DESC);
      expect(sortedArr).toEqual([9, 6, 5, 5, 4, 3, 3, 2, 1, 1]);
    });

    it('should sort an array using a custom comparison function', () => {
      const arr = [{ age: 25 }, { age: 30 }, { age: 20 }];
      const sortedArr = ArrayUtils.sortBy(arr, (a, b) => a.age - b.age);
      expect(sortedArr).toEqual([{ age: 20 }, { age: 25 }, { age: 30 }]);
    });
  });

  describe('remove', () => {
    it('should remove an item from an array and return the removed item', () => {
      const arr = [1, 2, 3, 4, 5];
      const removedItem = ArrayUtils.remove(arr, 3);
      expect(arr).toEqual([1, 2, 4, 5]);
      expect(removedItem).toBe(3);
    });

    it('should return null if the item is not found in the array', () => {
      const arr = [1, 2, 3, 4, 5];
      const removedItem = ArrayUtils.remove(arr, 6);
      expect(arr).toEqual([1, 2, 3, 4, 5]);
      expect(removedItem).toBeNull();
    });

    it('should remove the first occurrence of the item if it appears multiple times', () => {
      const arr = [1, 2, 3, 2, 4];
      const removedItem = ArrayUtils.remove(arr, 2);
      expect(arr).toEqual([1, 3, 2, 4]);
      expect(removedItem).toBe(2);
    });
  });
});
