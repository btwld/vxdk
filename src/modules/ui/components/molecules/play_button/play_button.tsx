import { useLocale } from '@ui/locale';
import type { Component } from 'solid-js';
import { mergeProps } from 'solid-js';
import PauseIcon from '../../../icons/pause.svg';
import PlayIcon from '../../../icons/play.svg';
import Icon from '../../atoms/icon/icon';
import TooltipIconButton from '../tooltip_icon_button/tooltip_icon_button';

interface PlayButtonProps {
  isPlaying: boolean;
  onPress(): void;
  size?: number;
}

export const PlayButton: Component<PlayButtonProps> = (props) => {
  const mergedProps = mergeProps({ size: 24, hover: true }, props);
  const t = useLocale();
  const label = () =>
    mergedProps.isPlaying ? t.button.pause() : t.button.play();

  return (
    <TooltipIconButton
      testId="button_play"
      onClick={mergedProps.onPress}
      label={label()}
      offset={[14, 24]}
    >
      {mergedProps.isPlaying ? (
        <Icon icon={PauseIcon} size={mergedProps.size} />
      ) : (
        <Icon icon={PlayIcon} size={mergedProps.size} />
      )}
    </TooltipIconButton>
  );
};

export default PlayButton;
