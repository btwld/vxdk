import { useLocale } from '@ui/locale';
import type { Component } from 'solid-js';
import SettingsIcon from '../../../icons/cog.svg';
import TooltipIconButton from '../tooltip_icon_button/tooltip_icon_button';

interface SettingsButtonProps {
  onPress: () => void;
  isActive?: boolean;
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void) | undefined;
}

export const SettingsButton: Component<SettingsButtonProps> = (props) => {
  const t = useLocale();
  return (
    <TooltipIconButton
      testId="settings_button"
      ref={props.ref}
      onClick={props.onPress}
      label={t.button.settings()}
      isActive={props.isActive}
    >
      <SettingsIcon />
    </TooltipIconButton>
  );
};

export default SettingsButton;
