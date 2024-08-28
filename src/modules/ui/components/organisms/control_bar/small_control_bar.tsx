import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';
import type { Timer } from '../../../../common/types';
import { ConversionUtils } from '../../../../common/utils';
import { useVxdk } from '../../../providers/hooks/use-controller';
import { useVxdkContext } from '../../../providers/ui_context/ui_context';
import Spacer from '../../atoms/Spacer';
import TimeDisplay from '../../atoms/time_display/time_display';
import { ControlBarPlugins } from '../../molecules/RenderUIPlugins';
import { PlayButton } from '../../molecules/play_button/play_button';
import Seekbar from '../../molecules/seekbar/seekbar';
import { VolumeControl } from '../../molecules/volume_control/volume_control';
import SettingsMobile from '../SettingsMobile';
import styles from './small_control.module.css';

export const SmallScreenControlBar = () => {
  const { state } = useVxdkContext();

  const vxdk = useVxdk();
  const [shouldDisplay, setShouldDisplay] = createSignal(false);
  const [transitionEnded, setTransitionEnded] = createSignal(false);

  const togglePlay = () => {
    if (state.playing) {
      vxdk.pause();
    } else {
      vxdk.play();
    }
  };

  const isPlaying = () => state.playing;
  const isPaused = () => state.paused;

  const onUserInteractionTimeOut = () => {
    if (isPlaying()) {
      setShouldDisplay(false);
    }
  };

  let timer: Timer;
  const onTouchEvent = () => {
    if ((!transitionEnded() && isPlaying()) || isPaused()) {
      clearTimeout(timer);

      setShouldDisplay(true);

      timer = setTimeout(onUserInteractionTimeOut, 2500);
    }
  };

  createEffect(() => {
    if (state.playing) {
      setShouldDisplay(false);
    }
  });

  onMount(() => {
    // // NOTE: This should be works on replay
    vxdk.getRootElement().addEventListener('touchstart', onTouchEvent);
    // TODO:
  });

  onCleanup(() => {
    // // NOTE: This should be works on replay
    vxdk.getRootElement().removeEventListener('touchstart', onTouchEvent);
  });

  const handleClickOverlayToHidenContainer = () => {
    if (transitionEnded()) {
      setShouldDisplay(false);
    }
  };

  const toggleMute = () => {
    vxdk.toggleMute();
  };

  const onVolumeChange = (value: number) => {
    vxdk.setVolume(value / 100);
  };

  const onSeekChange = (value: number) => {
    vxdk.seekTo((state.duration / 100) * value);
  };

  const durationTime = () => ConversionUtils.secondsToHMS(state.duration);

  const currentTime = () => ConversionUtils.secondsToHMS(state.currentTime);

  const progress = createMemo(() =>
    ConversionUtils.timeDurationToPercent(state.currentTime, state.duration),
  );

  const volumePercentage = () => state.volume * 100;

  createEffect(() => {
    if ((state.ended || state.paused) && !state.waitingForUser) {
      setShouldDisplay(true);
    }
  });

  createEffect(() => {
    // NOTE: This refresh variable to use inside setTimeout
    const shouldDisplayState = shouldDisplay();
    setTimeout(() => {
      setTransitionEnded(shouldDisplayState);
    }, 200);
  });

  return (
    <div
      data-testid="small_control_bar"
      class={styles.container}
      classList={{
        [styles.is_hidden]: !shouldDisplay(),
        [styles.transition_ended]: !transitionEnded(),
      }}
    >
      <div class={styles.wrapper}>
        {/* NOTE: overlay used to toggle controlbar */}
        <div
          class={styles.overlay}
          onClick={handleClickOverlayToHidenContainer}
        />
        <div class={styles.right_control}>
          <SettingsMobile />
          <Spacer />
          <VolumeControl
            volume={volumePercentage()}
            muted={state.muted}
            onVolumeChange={onVolumeChange}
            toggleMute={toggleMute}
          />
        </div>
        <div class={styles.center_control}>
          <PlayButton
            isPlaying={state.playing}
            onPress={togglePlay}
            size={50}
          />
        </div>
        <div class={styles.bottom_control}>
          <div>
            <TimeDisplay
              currentTime={currentTime()}
              duration={durationTime()}
            />
          </div>

          <div>
            <ControlBarPlugins />
          </div>
        </div>
        <div class={styles.seekbar_control}>
          <Seekbar
            duration={state.duration}
            value={progress()}
            valueBuffer={state.bufferedPercentage * 100}
            onValueChange={onSeekChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SmallScreenControlBar;
