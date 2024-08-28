import type { PluginLoader } from '../../common/module';
import { isHTML5Player } from '../../common/utils/is-video-element';
import { AirPlayPlugin } from './airplay';

export const AirPlayPluginLoader: PluginLoader = {
  get: () => AirPlayPlugin,
  isSupported: ({ playback }) =>
    // If it has airplay event load
    isHTML5Player(playback) &&
    Boolean((window as any).WebKitPlaybackTargetAvailabilityEvent),
};
