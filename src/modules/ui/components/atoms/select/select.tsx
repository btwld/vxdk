import type { Component } from 'solid-js';
import { For } from 'solid-js';
import ChevronDownIcon from '../../../icons/chevron-down.svg';
import Icon from '../icon/icon';
import styles from './select.module.css';

export interface SelectOption {
  key: string;
  label: string;
}

type Value = string | number;

export interface SelectProps {
  id?: string;
  value?: Value;
  onChange: (value: string) => void;
  options: SelectOption[];
  testId?: string;
}

const Select: Component<SelectProps> = (props) => {
  return (
    <div class={styles.select_container}>
      <select
        data-testid={props.testId}
        id={props.id}
        class={styles.select}
        value={props.value}
        onInput={(e) => props.onChange(e.currentTarget.value)}
      >
        <For each={props.options}>
          {(option) => <option value={option.key}>{option.label}</option>}
        </For>
      </select>
      <i class={styles.icon}>
        <Icon icon={ChevronDownIcon} size={20} />
      </i>
    </div>
  );
};

export default Select;
