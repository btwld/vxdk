export type ThrottledFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;
export namespace FunctionUtils {
  // Defers invoking a function until the current call stack has cleared.

  export const defer = (fn: () => void, ...args: any[]) =>
    setTimeout(fn, 1, ...args);

  export const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    ms: number,
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: any;
    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = 0;
        fn(...args);
      }, ms);
    };
  };

  export function throttle<T extends (...args: any) => any>(
    func: T,
    limit: number,
  ): ThrottledFunction<T> {
    let inThrottle: boolean;
    let lastResult: ReturnType<T>;

    return function (this: any): ReturnType<T> {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const context = this;

      if (!inThrottle) {
        inThrottle = true;

        setTimeout(() => (inThrottle = false), limit);

        lastResult = func.apply(context, args as unknown as any[]);
      }

      return lastResult;
    };
  }
}
