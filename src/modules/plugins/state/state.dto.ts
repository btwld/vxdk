/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Options } from 'modules/options/options.dto';
import { Level } from 'modules/playback/playback_types';

export interface State {
  // Vxdk is ready
  ready: boolean;
  // Playback type is live
  live: boolean;
  // Playback quality is HD
  hd: boolean;
  // Main container element is focused
  focused: boolean;
  // Its waiting for user to start playback
  waitingForUser: boolean;
  // Is playing
  playing: boolean;
  // Is paused
  paused: boolean;
  // Is buffering
  buffering: boolean;
  // Playback has started
  started: boolean;
  // Playback has ended
  ended: boolean;
  // Current playback time
  currentTime: number;
  // Duration of video playback
  duration: number;
  // Current options for playback
  options: Options;
  // Percentage of current buffer
  bufferedPercentage: number;
  // Current volume
  volume: number;
  // Is muted
  muted: boolean;
  // Current playback rate
  playbackRate: number;
  // Is fullscreen
  fullscreen: boolean;
  // is picture-in-picture enabled
  pip: boolean;
  // Available quality levels
  levels: Level[];
  // Current selected level
  level: Level | null;
  // Is level auto switch enabled
  levelAutoSwitch: boolean;
  // Current available audio languages
  audioLanguages: string[];
  // Current width of the player
  width: number | null;
  // Current height of the player
  height: number | null;
}
