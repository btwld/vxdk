/**
 * Waits until a specified condition is met.
 *
 * @param condition - A function that returns a boolean or a truthy/falsy value.
 * @returns A promise that resolves when the condition is met.
 */
export async function waitUntil(
  condition: () => boolean | any,
  timeout?: number,
  interval = 50,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkCondition = () => {
      const result = condition();
      if (result) {
        resolve(result);
      } else if (timeout && Date.now() - startTime >= timeout) {
        reject(new Error('Timeout reached before condition was met'));
      } else {
        setTimeout(checkCondition, interval);
      }
    };

    checkCondition();
  });
}

/**
 * Creates a promise that resolves when a specific event is emitted.
 *
 * @param eventEmitter - An object that implements the EventEmitter interface.
 * @param eventType - The type of event to listen for.
 * @returns A promise that resolves with the event data when the specified event is emitted.
 */
export async function eventPromise(
  eventEmitter: {
    addEventListener: (event: any, listener: (event: any) => void) => void;
  },
  eventType: string,
): Promise<any> {
  return new Promise((resolve) => {
    eventEmitter.addEventListener(eventType, resolve);
  });
}
