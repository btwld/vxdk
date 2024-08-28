import TooltipIconButton from '@ui/components/molecules/tooltip_icon_button/tooltip_icon_button';
import { useLocale } from '@ui/locale';
import { useVxdkEvent } from '@ui/providers/hooks/use-event';
import { useVxdkPlugin } from '@ui/providers/hooks/use-plugin';
import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import { AIRPLAY_EVENTS, AirPlayPlugin } from './airplay';
import AirPlayIcon from './airplay_icon.svg';

const AirPlayButton: Component = () => {
  const [show, setShow] = createSignal(false);
  const airplay = useVxdkPlugin(AirPlayPlugin);

  useVxdkEvent(AIRPLAY_EVENTS.AVAILABILITY_CHANGED, () => {
    setShow(airplay.isEnabled());
  });

  const t = useLocale();

  return (
    <Show when={show()}>
      <TooltipIconButton
        label={t.button.airplay()}
        onClick={() => {
          airplay.showPlaybackTargetPicker();
        }}
      >
        <AirPlayIcon />
      </TooltipIconButton>
    </Show>
  );
};

export default AirPlayButton;
