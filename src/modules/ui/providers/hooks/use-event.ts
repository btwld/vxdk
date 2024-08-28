import { onCleanup, onMount } from 'solid-js';

import { useVxdk } from './use-controller';

export function useVxdkEvent(
  eventName: string,
  callback: () => void,
  once = false,
) {
  const controller = useVxdk();

  onMount(() => {
    if (once) {
      controller.once(eventName, () => callback());
    } else {
      controller.on(eventName, () => callback());
    }
  });

  onCleanup(() => {
    if (!once) {
      controller.off(eventName, callback);
    }
  });
  return;
}
