import type { Options } from '@popperjs/core';
import type { ParentComponent } from 'solid-js';
import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import usePopper from 'solid-popper';
import type { Timer } from '../../../../common/types';
import styles from './tooltip.module.css';

interface TooltipProps {
  delay?: number;
  label: string;
  initialOptions?: Partial<Options>;
  disabled?: boolean;
}

const Tooltip: ParentComponent<TooltipProps> = (props) => {
  const [isOpen, setOpen] = createSignal(false);
  const [anchor, setAnchor] = createSignal<HTMLDivElement>();
  const [popper, setPopper] = createSignal<HTMLDivElement>();

  const popperRef = usePopper(anchor, popper, props.initialOptions);

  let timeout: Timer | undefined;

  const showTip = () => {
    timeout = setTimeout(() => {
      if (props.disabled) return;
      setOpen(true);
    }, props.delay || 100);
  };

  const hideTip = () => {
    if (timeout) {
      clearInterval(timeout);
    }
    setOpen(false);
  };

  const showEvents = ['mouseenter', 'focus'];
  // Hide tooltip if click on element
  const hideEvents = ['mouseleave', 'blur', 'click'];

  onMount(() => {
    showEvents.forEach((event) => {
      anchor()?.addEventListener(event, showTip);
    });

    hideEvents.forEach((event) => {
      anchor()?.addEventListener(event, hideTip);
    });
  });

  onCleanup(() => {
    showEvents.forEach((event) => {
      anchor()?.removeEventListener(event, showTip);
    });

    hideEvents.forEach((event) => {
      anchor()?.removeEventListener(event, hideTip);
    });

    popperRef()?.destroy();
  });

  return (
    <div data-testid="anchor_tooltip" ref={setAnchor}>
      {props.children}
      <Show when={isOpen()}>
        <div data-testid="tooltip" ref={setPopper} class={styles.tooltip}>
          {props.label}
        </div>
      </Show>
    </div>
  );
};

export default Tooltip;
