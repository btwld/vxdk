import type { PlaybackLoader } from '../../common/module';

export const HlsJsPlayerLoader: PlaybackLoader = {
  get: async () => {
    const { HlsJsPlayer } = await import('./hls');
    return HlsJsPlayer;
  },

  isSupported: (_): boolean => true,
};
