/**
 * Sort by based on the key or function
 */
type SortByFunc<T> = (s1: T, s2: T) => number;

/**
 * Sort order enum
 */
export enum SortByOrder {
  ASC = 1,
  DESC = -1,
}
/**
 * Utility functions for working with arrays
 */
export namespace ArrayUtils {
  /**
   * Sorts an array by a given function or key
   * @param arr The array to sort
   * @param $fn The function or key to sort by
   * @param order The sort order (ascending or descending)
   * @template T The type of the array
   * @returns {T[]} The sorted array
   */
  export function sortBy<T = any>(
    arr: T[],
    $fn: SortByFunc<T> = (s1: any, s2: any) =>
      order * String(s1).localeCompare(String(s2)),
    order: SortByOrder = SortByOrder.ASC,
  ) {
    const fn = $fn;
    return [...arr].sort(fn);
  }

  /**
   * Removes an item from an array.
   * @param array The array that may contain the item to remove
   * @param item The item to remove from the array
   * @template T The type of the array
   * @returns {T | null} The removed item or null if the item was not found
   */
  export function remove<T>(array: T[], item: T): T | null {
    const index = array.indexOf(item);

    if (index > -1) {
      return array.splice(index, 1)[0];
    } else {
      return null;
    }
  }
}
