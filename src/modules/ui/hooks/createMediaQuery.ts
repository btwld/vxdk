import { createSignal, onCleanup, onMount } from 'solid-js';

/**
 * Creates a very simple and straightforward media query monitor.
 *
 * @param callback Media query to listen for
 * @param boolean Sets the initial state to begin with
 * @param boolean If true watches changes and reports state reactively
 * @returns Boolean value if media query is met or not
 *
 * @example
 * ```ts
 * const isSmall = createMediaQuery("(max-width: 767px)");
 * console.log(isSmall());
 * ```
 */
export const createMediaQuery = (
  query: string,
  initialState = false,
  watchChange = true,
): (() => boolean) => {
  let mql: MediaQueryList;
  const [state, setState] = createSignal(initialState);
  const onChange = () => setState(mql.matches);
  onMount(() => {
    mql = window.matchMedia(query);
    if (watchChange) {
      mql.addEventListener('change', onChange);
    }
    setState(mql.matches);
  });
  onCleanup(() => watchChange && mql.removeEventListener('change', onChange));
  return state;
};

export const useScreenSize = () => {
  const isSmall = createMediaQuery('(max-width: 767px)');
  return { isSmall };
};
