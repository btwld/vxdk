import { ObjectUtils } from '../object.utils';

describe('ObjectUtils', () => {
  describe('isObject', () => {
    it('should return true for an object', () => {
      const obj = { a: 1, b: 2 };
      expect(ObjectUtils.isObject(obj)).toBe(true);
    });

    it('should return false for an array', () => {
      const arr = [1, 2, 3];
      expect(ObjectUtils.isObject(arr)).toBe(false);
    });

    it('should return false for a primitive value', () => {
      expect(ObjectUtils.isObject(42)).toBe(false);
      expect(ObjectUtils.isObject('hello')).toBe(false);
      expect(ObjectUtils.isObject(true)).toBe(false);
      expect(ObjectUtils.isObject(null)).toBe(false);
      expect(ObjectUtils.isObject(undefined)).toBe(false);
    });
  });

  describe('shallowEqual', () => {
    it('should return true for objects with the same properties and values', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2 };
      expect(ObjectUtils.shallowEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for objects with different properties', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, c: 3 };
      expect(ObjectUtils.shallowEqual(obj1, obj2)).toBe(false);
    });

    it('should return false for objects with different values', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };
      expect(ObjectUtils.shallowEqual(obj1, obj2)).toBe(false);
    });
  });

  describe('deepCopy', () => {
    it('should create a deep copy of an object', () => {
      const obj = { a: 1, b: { c: 2 } };
      const copy = ObjectUtils.deepCopy(obj);
      expect(copy).toEqual(obj);
      expect(copy).not.toBe(obj);
      expect(copy.b).not.toBe(obj.b);
    });

    it('should create a deep copy of an array', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const copy = ObjectUtils.deepCopy(arr);
      expect(copy).toEqual(arr);
      expect(copy).not.toBe(arr);
      expect(copy[1]).not.toBe(arr[1]);
      expect(copy[2]).not.toBe(arr[2]);
    });

    it('should return the same value for primitives', () => {
      expect(ObjectUtils.deepCopy(42)).toBe(42);
      expect(ObjectUtils.deepCopy('hello')).toBe('hello');
      expect(ObjectUtils.deepCopy(true)).toBe(true);
      expect(ObjectUtils.deepCopy(null)).toBe(null);
      expect(ObjectUtils.deepCopy(undefined)).toBe(undefined);
    });

    it('should create a new Date object for Date instances', () => {
      const date = new Date();
      const copy = ObjectUtils.deepCopy(date);
      expect(copy).toEqual(date);
      expect(copy).not.toBe(date);
    });
  });
});
