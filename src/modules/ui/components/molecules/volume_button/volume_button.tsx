import VolumeHighIcon from '@ui/icons/volume-high.svg';
import VolumeMediumIcon from '@ui/icons/volume-medium.svg';
import VolumeOffIcon from '@ui/icons/volume-off.svg';
import { useLocale } from '@ui/locale';
import type { Component } from 'solid-js';
import { Match, Switch } from 'solid-js';
import TooltipIconButton from '../tooltip_icon_button/tooltip_icon_button';

export interface VolumeButtonProps {
  volume: number;
  muted: boolean;
  onPress(): void;
}

export const VolumeButton: Component<VolumeButtonProps> = (props) => {
  const t = useLocale();

  const label = () => {
    return props.muted ? t.button.unmute() : t.button.mute();
  };
  return (
    <TooltipIconButton
      testId="volume_button"
      onClick={() => props.onPress()}
      label={label()}
    >
      <Switch fallback={<VolumeMediumIcon data-testid="volume_medium" />}>
        <Match when={props.muted || props.volume === 0}>
          <VolumeOffIcon data-testid="volume_off" />
        </Match>
        <Match when={props.volume >= 40}>
          <VolumeHighIcon data-testid="volume_high" />
        </Match>
      </Switch>
    </TooltipIconButton>
  );
};
