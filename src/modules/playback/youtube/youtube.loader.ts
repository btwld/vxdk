import loadjs from 'loadjs';
import type { PlaybackLoader } from '../../common/module';
import { waitUntil } from '../../common/utils/helpers';
import { YoutubePlayer } from './youtube';

import { parseId } from './youtube.utils';

export const YoutubePlayerLoader: PlaybackLoader = {
  get: async () => {
    await loadYoutubeAPI();
    return YoutubePlayer;
  },

  isSupported: ({ options }): boolean => {
    return !!parseId(options.source);
  },
};

async function loadYoutubeAPI(): Promise<void> {
  if (typeof YT === 'undefined') {
    await loadjs('https://www.youtube.com/iframe_api', {
      returnPromise: true,
    });
  }
  await waitUntil(() => window['YT']);

  return;
}
