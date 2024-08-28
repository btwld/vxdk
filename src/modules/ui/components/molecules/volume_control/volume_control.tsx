import { BrowserUtils } from '@common/utils';
import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import { VolumeBar } from '../../atoms/volume_bar/volume_bar';
import { VolumeButton } from '../volume_button';

export interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (volume: number) => void;
  toggleMute: () => void;
}

export const VolumeControl: Component<VolumeControlProps> = (props) => {
  const [isHover, setIsHover] = createSignal(false);

  const supportVolumeBar = () => {
    return !BrowserUtils.isMobile && !BrowserUtils.isIOS;
  };

  return (
    <div
      data-testid="volume_control"
      class="flex items-center h-10"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <VolumeButton
        volume={props.volume}
        muted={props.muted}
        onPress={props.toggleMute}
      />
      <Show when={supportVolumeBar()}>
        <div
          data-testid="container_volume_bar"
          class="flex items-center ml-1 transition-all"
          classList={{
            'opacity-0 w-1': !isHover(),
            'w-20': isHover(),
          }}
        >
          <VolumeBar
            onVolumeChange={props.onVolumeChange}
            value={props.volume}
            muted={props.muted}
          />
        </div>
      </Show>
    </div>
  );
};

export default VolumeControl;
