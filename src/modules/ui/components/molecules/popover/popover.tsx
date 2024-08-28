import type { Options } from '@popperjs/core';
import type { Accessor, JSX, ParentComponent } from 'solid-js';
import { Show, createSignal, onCleanup } from 'solid-js';
import usePopper from 'solid-popper';
import styles from './popover.module.css';

interface PopoverProps {
  isOpen: Accessor<boolean>;
  popoverBody: JSX.Element;
  options?: Partial<Options>;
}

const Popover: ParentComponent<PopoverProps> = (props) => {
  const [anchor, setAnchor] = createSignal<HTMLDivElement>();
  const [popper, setPopper] = createSignal<HTMLDivElement>();

  // eslint-disable-next-line solid/reactivity
  const popperRef = usePopper(anchor, popper, props.options);

  onCleanup(() => {
    popperRef()?.destroy();
  });

  return (
    <div ref={setAnchor}>
      {props.children}
      <Show when={props.isOpen()}>
        <div class={styles.popper} ref={setPopper}>
          {props.popoverBody}
        </div>
      </Show>
    </div>
  );
};

export default Popover;
