import type { HTML5Player } from '../../playback/html5';
import type { Playback } from '../../playback/base_playback';

export function isHTML5Player(playback: Playback): playback is HTML5Player {
  return playback.nativeEl instanceof HTMLVideoElement;
}
