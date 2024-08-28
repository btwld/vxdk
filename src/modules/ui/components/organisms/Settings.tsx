import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useOnClickOutside } from '../../hooks/clickOutside';
import { useSettingsMenu } from '../../providers/ui_menu.provider';
import Popover from '../molecules/popover/popover';
import SettingsButton from '../molecules/settings_button/settings_button';
import Menu from './menu/menu';

const Settings: Component = () => {
  const { toggleMenu, isOpen } = useSettingsMenu();
  const [menuRef, setMenuRef] = createSignal<HTMLElement>();
  const [buttonRef, setButtonRef] = createSignal<HTMLElement>();

  const offset = {
    name: 'offset',
    options: {
      offset: [-15, 26],
    },
  };

  const onClose = () => {
    if (isOpen()) {
      toggleMenu();
    }
  };

  useOnClickOutside([menuRef, buttonRef], onClose);

  return (
    <Popover
      isOpen={isOpen}
      popoverBody={<Menu ref={setMenuRef} />}
      options={{
        placement: 'top',
        modifiers: [offset],
      }}
    >
      <SettingsButton
        ref={setButtonRef}
        onPress={toggleMenu}
        isActive={isOpen()}
      />
    </Popover>
  );
};

export default Settings;
