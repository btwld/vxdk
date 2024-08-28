import type { Component } from 'solid-js';
import { For, Show } from 'solid-js';
import OutlineCheckIcon from '../../../icons/check.svg';
import ChevronLeftIcon from '../../../icons/chevron-left.svg';
import styles from './sub_menu.module.css';

export interface Option {
  active: boolean;
  key: string;
  label: string;
}

interface SubMenuProps {
  testId?: string;
  options: Option[];
  label: string;
  onClose: () => void;
  onChange: (value: Option) => void;
}

interface SubMenuOptionProps {
  id?: string;
  testId?: string;
  option: Option;
  onChange: (value: string) => void;
}

const SubMenuOption: Component<SubMenuOptionProps> = (props) => {
  return (
    <label
      data-testid={`submenu_option_label_${props.id}`}
      class={styles.label}
    >
      <span class={styles.icon}>
        <Show when={props.option.active}>
          <OutlineCheckIcon />
        </Show>
      </span>
      <input
        data-testid={`submenu_option_input_${props.id}`}
        name={props.option.label}
        class="sr-only"
        type="radio"
        value={props.option.key}
        checked={props.option.active}
        onInput={(e) => props.onChange(e.currentTarget.value)}
      />
      <span>{props.option.label || props.option.key}</span>
    </label>
  );
};

export const SubMenu: Component<SubMenuProps> = (props) => {
  const handleChange = (value: string) => {
    const selected = props.options.find((option) => option.key === value);
    if (selected) {
      props.onChange(selected);
      props.onClose();
    }
  };

  const handleOnClose = () => props.onClose();

  return (
    <>
      <button
        onClick={handleOnClose}
        class="px-4 py-2 flex items-center border-b border-gray-500 border-opacity-95 w-full transition-colors hover:bg-gray-700"
      >
        <span class="text-white text-2xl -ml-2 mr-2">
          <ChevronLeftIcon />
        </span>
        <span class="font-bold">{props.label}</span>
      </button>

      <For each={props.options}>
        {(option, index) => (
          <SubMenuOption
            id={String(index())}
            option={option}
            onChange={handleChange}
          />
        )}
      </For>
    </>
  );
};

export default SubMenu;
