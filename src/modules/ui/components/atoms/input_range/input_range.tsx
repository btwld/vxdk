import RangeTouch from 'rangetouch';
import type { Component } from 'solid-js';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import styles from './input_range.module.css';

interface InputRangeProps {
  value?: number;
  valueBuffer?: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  theme?: 'white' | 'primary';
  ref?: HTMLInputElement;
}

type EventChange = InputEvent & {
  currentTarget: HTMLInputElement;
};

const InputRange: Component<InputRangeProps> = (props) => {
  const [value, setValue] = createSignal(0);

  onMount(() => {
    const rangeTouch = new RangeTouch(props.ref!);

    onCleanup(() => rangeTouch.destroy());
  });

  createEffect(() => {
    setValue(props.value ?? 0);
  });

  const handleInputChange = (event: EventChange) => {
    const { value: inputValue } = event.currentTarget;

    setValue(Number(inputValue));
    props.onValueChange(Number(inputValue));
  };

  const getPercentString = (percent = 0): string => {
    return `${percent}%`;
  };

  const getColorSchema = () => styles[props.theme || 'primary'];

  return (
    <div class={`${getColorSchema()} ${styles.container}`}>
      <div class={styles.timelineContainer}>
        <div
          class={styles.timelineBuffer}
          style={{ width: getPercentString(props.valueBuffer) }}
        />
        <div
          class={styles.timeline}
          style={{ width: getPercentString(value()) }}
        />
      </div>
      <input
        ref={props.ref}
        dir="ltr"
        type="range"
        class={styles.range}
        min={props.min}
        max={props.max}
        step={props.step}
        value={value()}
        onInput={handleInputChange}
        data-testid="input_range"
      />
    </div>
  );
};

export default InputRange;
