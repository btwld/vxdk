import { StringUtils } from '../string.utils';

describe('StringUtils', () => {
  describe('isString', () => {
    it('should return true for a string primitive', () => {
      expect(StringUtils.isString('hello')).toBe(true);
      expect(StringUtils.isString('')).toBe(true);
    });

    it('should return false for non-string values', () => {
      expect(StringUtils.isString(123)).toBe(false);
      expect(StringUtils.isString(true)).toBe(false);
      expect(StringUtils.isString(null)).toBe(false);
      expect(StringUtils.isString(undefined)).toBe(false);
      expect(StringUtils.isString({})).toBe(false);
      expect(StringUtils.isString([])).toBe(false);
    });

    it('should return false for String objects', () => {
      expect(StringUtils.isString(new String('hello'))).toBe(false);
    });

    it('should correctly infer the return type as boolean', () => {
      const result = StringUtils.isString('test');
      expect(typeof result).toBe('boolean');
    });
  });
});
