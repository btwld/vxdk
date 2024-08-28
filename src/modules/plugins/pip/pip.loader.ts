import type { PluginLoader } from '../../common/module';
import { isHTML5Player } from '../../common/utils/is-video-element';
import { PipPlugin } from './pip';

export const PipPluginLoader: PluginLoader = {
  get: () => PipPlugin,
  isSupported: ({ playback }): boolean => {
    return document.pictureInPictureEnabled && isHTML5Player(playback);
  },
};
