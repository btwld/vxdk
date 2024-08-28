import type { State } from '@plugins/state/state.dto';
import type { Spread } from '@solid-primitives/destructure';
import { destructure } from '@solid-primitives/destructure';
import { useVxdkContext } from '../ui_context/ui_context';

export function useVxdkState(): Spread<State> {
  const { state } = useVxdkContext();

  return destructure(state);
}
