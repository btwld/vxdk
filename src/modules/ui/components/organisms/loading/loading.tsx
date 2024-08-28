import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { useVxdkState } from '../../../providers/hooks/use-state';
import styles from './loading.module.css';

const Loading: Component = () => {
  const { buffering } = useVxdkState();
  return (
    <Show when={buffering()}>
      <div class="flex justify-center items-center absolute inset-0 z-10">
        <div class={styles.spinner} />
      </div>
    </Show>
  );
};

export default Loading;
