import type { Component } from 'solid-js';
import ChevronRightIcon from '../../../icons/chevron-right.svg';
import styles from './menu_option.module.css';

export interface MenuOptionProps {
  label: string;
  activeLabel?: string;
  onPress: () => void;
  testId?: string;
}

export const MenuOption: Component<MenuOptionProps> = (props) => {
  const handleOpenSubmenu = () => {
    props.onPress();
  };

  return (
    <button
      data-testid={props.testId}
      class={styles.button}
      onClick={handleOpenSubmenu}
    >
      <span class={styles.label}>{props.label}</span>
      <div class={styles.active_label}>
        {props.activeLabel}
        <span class={styles.icon}>
          <ChevronRightIcon />
        </span>
      </div>
    </button>
  );
};

export default MenuOption;
