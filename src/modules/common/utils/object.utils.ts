interface IsObjectFn {
  (item: any): boolean;
}

export namespace ObjectUtils {
  /**
   * @description Method to check if an item is an object. Date and Function are considered
   * an object, so if you need to exclude those, please update the method accordingly.
   * @param item - The item that needs to be checked
   * @return {Boolean} Whether or not @item is an object
   */
  export const isObject: IsObjectFn = (item: any): boolean => {
    return item === Object(item) && !Array.isArray(item);
  };

  export const shallowEqual = (item: any, other: any) => {
    const keys1 = Object.keys(item);
    const keys2 = Object.keys(other);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (item[key] !== other[key]) {
        return false;
      }
    }
    return true;
  };

  /**
   * Deep copy function for TypeScript.
   * @param T Generic type of target/copied value.
   * @param target Target value to be copied.
   * @see Source project, ts-deeply https://github.com/ykdr2017/ts-deepcopy
   * @see Code pen https://codepen.io/erikvullings/pen/ejyBYg
   */
  export const deepCopy = <T>(target: T): T => {
    if (target === null) {
      return target;
    }
    if (target instanceof Date) {
      return new Date(target.getTime()) as any;
    }
    // First part is for array and second part is for Realm.Collection
    // if (target instanceof Array || typeof (target as any).type === 'string') {
    if (typeof target === 'object') {
      if (
        typeof (target as { [key: string]: any })[(Symbol as any).iterator] ===
        'function'
      ) {
        const cp = [] as any[];
        if ((target as any as any[]).length > 0) {
          for (const arrayMember of target as any as any[]) {
            cp.push(ObjectUtils.deepCopy(arrayMember));
          }
        }
        return cp as any as T;
      } else {
        const targetKeys = Object.keys(target);
        const cp = {} as { [key: string]: any };
        if (targetKeys.length > 0) {
          for (const key of targetKeys) {
            cp[key] = ObjectUtils.deepCopy(
              (target as { [key: string]: any })[key],
            );
          }
        }
        return cp as T;
      }
    }
    // Means that object is atomic
    return target;
  };
}
