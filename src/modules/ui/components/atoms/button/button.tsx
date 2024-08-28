import type { ParentComponent } from 'solid-js';
import styles from './button.module.css';

interface ButtonProps {
  onClick: () => void;
  label?: string;
  isActive?: boolean;
  class?: string;
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void) | undefined;
  testId?: string;
}
const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      data-testid={props.testId}
      ref={props.ref}
      type="button"
      class={`${styles.button} ${props.class}`}
      classList={{
        [styles.button_active]: props.isActive,
      }}
      onClick={() => props.onClick()}
      aria-label={props.label}
    >
      {props.children}
    </button>
  );
};

export default Button;
