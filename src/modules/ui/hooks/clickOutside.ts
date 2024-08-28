import type { Accessor } from 'solid-js';
import { createEffect, onMount } from 'solid-js';
import { onCleanup } from 'solid-js';

type Event = MouseEvent | TouchEvent;

export function useOnClickOutside(
  refs: Accessor<HTMLElement | undefined>[],
  handlerOutside: () => void,
) {
  const listener = (event: Event) => {
    let contains = false;
    if (refs.length === 0) return;
    for (const refEl of refs) {
      if (refEl()?.contains(event.target as HTMLElement)) {
        contains = true;
      }
    }

    if (!contains) {
      handlerOutside();
    }
  };

  createEffect(() => {});

  onMount(() => {
    window.addEventListener('mousedown', listener);
    window.addEventListener('touchstart', listener);
  });

  onCleanup(() => {
    window.removeEventListener('mousedown', listener);
    window.removeEventListener('touchstart', listener);
  });
}
