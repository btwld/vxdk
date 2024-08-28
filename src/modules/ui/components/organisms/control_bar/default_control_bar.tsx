import type { Component } from 'solid-js';
import { createMemo, onCleanup, onMount } from 'solid-js';
import { ConversionUtils } from '../../../../common/utils';
import { useVxdk } from '../../../providers/hooks/use-controller';
import { useVxdkContext } from '../../../providers/ui_context/ui_context';
import { SettingsMenuProvider } from '../../../providers/ui_menu.provider';
import Spacer from '../../atoms/Spacer';
import TimeDisplay from '../../atoms/time_display/time_display';
import { ControlBarPlugins } from '../../molecules/RenderUIPlugins';
import { PlayButton } from '../../molecules/play_button/play_button';
import Seekbar from '../../molecules/seekbar/seekbar';
import { VolumeControl } from '../../molecules/volume_control/volume_control';
import Settings from '../Settings';
import styles from './control.module.css';

const DefaultControlBar: Component = () => {
  const { state } = useVxdkContext();

  const vxdk = useVxdk();

  const togglePlay = () => {
    if (state.playing) {
      vxdk.pause();
    } else {
      vxdk.play();
    }
  };

  const toggleMute = () => {
    vxdk.toggleMute();
  };

  const onVolumeChange = (value: number) => {
    vxdk.setVolume(value / 100);
  };

  const onSeekChange = (value: number) => {
    vxdk.seekToPercentage(value);
  };

  const durationTime = () => ConversionUtils.secondsToHMS(state.duration);

  const currentTime = () => ConversionUtils.secondsToHMS(state.currentTime);

  const progress = createMemo(() =>
    ConversionUtils.timeDurationToPercent(state.currentTime, state.duration),
  );

  const volumePercentage = () => state.volume * 100;

  const shouldDisplay = () =>
    (state.focused || !state.playing) && !state.waitingForUser;

  const videoInstance = () => vxdk.getRootElement().querySelector('video');

  onMount(() => {
    videoInstance()?.addEventListener('click', (event) => {
      if (event.target === videoInstance()) {
        togglePlay();
      }
    });
  });

  onCleanup(() => {
    videoInstance()?.removeEventListener('click', () => {});
  });

  return (
    <div
      data-testid="control_bar"
      class={styles.control}
      classList={{
        'opacity-100': shouldDisplay(),
      }}
    >
      <div class={styles.backdrop} />
      <div
        class={styles.control_container}
        classList={{
          'translate-y-4 invisible': !shouldDisplay(),
        }}
      >
        <div class={styles.control_bar}>
          <div class="flex mb-1">
            <Seekbar
              duration={state.duration}
              value={progress()}
              valueBuffer={state.bufferedPercentage * 100}
              onValueChange={onSeekChange}
            />
          </div>
          <div class="flex items-center">
            <div class="flex flex-1 items-center">
              <PlayButton isPlaying={state.playing} onPress={togglePlay} />
              <Spacer />
              <TimeDisplay
                currentTime={currentTime()}
                duration={durationTime()}
              />
              <Spacer />
              <VolumeControl
                volume={volumePercentage()}
                muted={state.muted}
                onVolumeChange={onVolumeChange}
                toggleMute={toggleMute}
              />
            </div>
            <div class="flex flex-wrap justify-between items-center">
              <SettingsMenuProvider>
                <Settings />
              </SettingsMenuProvider>

              <ControlBarPlugins />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultControlBar;
