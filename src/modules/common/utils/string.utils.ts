export namespace StringUtils {
  // Checks if the given argument is a string. Only works for string primitives.
  export const isString = <T = any>(str: string | T): str is string => {
    return typeof str === 'string';
  };
}
