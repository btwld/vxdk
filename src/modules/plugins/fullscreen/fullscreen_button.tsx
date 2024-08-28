import { useLocale } from '@ui/locale';
import type { Component } from 'solid-js';
import TooltipIconButton from '../../ui/components/molecules/tooltip_icon_button/tooltip_icon_button';
import { useVxdk } from '../../ui/providers/hooks/use-controller';
import { useVxdkState } from '../../ui/providers/hooks/use-state';
import EnterFullScreenIcon from './assets/enter_fullscreen_icon.svg';
import ExitFullScreenIcon from './assets/exit_fullscreen_icon.svg';

const FullScreenButton: Component = () => {
  const vxdk = useVxdk();
  const { fullscreen } = useVxdkState();

  const t = useLocale();

  const label = () =>
    fullscreen() ? t.button.exit_fullscreen() : t.button.enter_fullscreen();

  const icon = () =>
    fullscreen() ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />;

  const onPress = () => {
    vxdk.toggleFullscreen();
  };

  return (
    <TooltipIconButton onClick={onPress} label={label()} offset={[-24, 26]}>
      {icon()}
    </TooltipIconButton>
  );
};

export default FullScreenButton;
