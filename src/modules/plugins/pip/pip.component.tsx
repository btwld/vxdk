import { useLocale } from '@ui/locale';
import type { Component } from 'solid-js';
import TooltipIconButton from '../../ui/components/molecules/tooltip_icon_button/tooltip_icon_button';
import PipIcon from './pip-bottom-right.svg';

export interface PipButtonProps {
  onPress(): void;
}

export const PipButton: Component<PipButtonProps> = (props) => {
  const t = useLocale();
  return (
    <TooltipIconButton onClick={props.onPress} label={t.button.miniplayer()}>
      <PipIcon />
    </TooltipIconButton>
  );
};

export default PipButton;
