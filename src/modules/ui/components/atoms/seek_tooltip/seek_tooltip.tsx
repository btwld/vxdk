import type { ParentComponent } from 'solid-js';
import { Show } from 'solid-js';

interface SeekToolTipProps {
  position: number;
  show: boolean;
  ref: HTMLDivElement;
}

export const SeekToolTip: ParentComponent<SeekToolTipProps> = (props) => {
  return (
    <Show when={props.show}>
      <div
        data-testid="seek_tooltip"
        ref={props.ref}
        class="absolute bottom-full transform -translate-y-1 tracking-wide text-white text-sm font-normal ordinal tabular-nums bg-gray-900 bg-opacity-90 rounded-md pointer-events-none px-2 py-1"
        style={{ left: `${props.position}%` }}
      >
        {props.children}
      </div>
    </Show>
  );
};

export default SeekToolTip;
