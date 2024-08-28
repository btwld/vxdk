import type { Component } from 'solid-js';
import styles from './time_display.module.css';

interface TimeDisplayProps {
  currentTime: string;
  duration: string;
}

const TimeDisplay: Component<TimeDisplayProps> = (props) => {
  return (
    <div class={styles.time_display}>
      <time class={styles.time}>{props.currentTime}</time>
      <span class={styles.separator}>/</span>
      <time class={styles.time}>{props.duration}</time>
    </div>
  );
};

export default TimeDisplay;
