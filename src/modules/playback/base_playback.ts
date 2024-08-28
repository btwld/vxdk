import { Logger } from '@common/utils';
import { Plugin, PluginType } from '../common/module';
import type { Level, PlaybackType } from './playback_types';

/**
 * Abstract class representing a playback plugin.
 * It extends the Plugin class and provides common properties and methods for playback functionality.
 * @category Playback
 */
export abstract class Playback<Config = any> extends Plugin<Config> {
  public readonly type = PluginType.PLAYBACK;

  /**
   * Abstract method called when the playback is connected to the DOM.
   */
  abstract connectedCallback(): void;

  /**
   * Abstract method to load the playback with an optional start time.
   * @param startTime - The time in seconds to start the playback from.
   */
  abstract load(startTime?: number): void;

  /**
   * Abstract method called when the playback is disconnected from the DOM.
   */
  abstract disconnectedCallback(): void;

  /**
   * Abstract method to start the playback.
   */
  abstract play(): Promise<void> | void;

  /**
   * Abstract method to stop the playback.
   */
  abstract stop(): void;

  /**
   * Abstract method to pause the playback.
   */
  abstract pause(): void;

  /**
   * Abstract getter to check if the playback is muted.
   */
  abstract get isMuted(): boolean;

  /**
   * Abstract method to mute the playback.
   */
  abstract mute(): void;

  /**
   * Abstract method to unmute the playback.
   */
  abstract unmute(): void;

  /**
   * Abstract getter to check if the playback is live.
   */
  abstract get isLive(): boolean;

  /**
   * Abstract method to replay the playback.
   */
  abstract replay(): Promise<void> | void;

  /**
   * Abstract getter to get the native element of the playback.
   */
  abstract get nativeEl(): unknown;

  /**
   * Abstract getter to get the playback type.
   */
  abstract get playbackType(): PlaybackType;

  /**
   * Abstract method to seek the playback to a given time in seconds.
   * @param seconds - The time in seconds to seek to.
   */
  abstract seekTo(seconds: number): void;

  /**
   * Abstract method to seek the playback to a given percentage of the duration.
   * @param percentage - The percentage (between 0 and 100) to seek to.
   */
  abstract seekPercentage(percentage: number): void;

  /**
   * Abstract getter to get the current volume of the playback.
   */
  abstract get volume(): number;

  /**
   * Abstract method to set the volume of the playback.
   * @param volume - The volume to set.
   */
  abstract setVolume(volume: number): void;

  /**
   * Abstract method to set the source of the playback.
   * @param src - The source URL to set.
   */
  abstract setSource(src: string): void;

  /**
   * Abstract method to set the playback rate.
   * @param playbackRate - The playback rate to set.
   */
  abstract setPlaybackRate(playbackRate: number): void;

  /**
   * Abstract getter to get the current playback rate.
   */
  abstract get playbackRate(): number;

  /**
   * Abstract getter to get the buffered percentage of the playback.
   */
  abstract get bufferedPercentage(): number;

  /**
   * Abstract getter to check if the playback is currently playing.
   */
  abstract get isPlaying(): boolean;

  /**
   * Abstract getter to check if the playback has ended.
   */
  abstract get hasEnded(): boolean;

  /**
   * Abstract getter to get the current time of the playback in seconds.
   */
  abstract get currentTime(): number;

  /**
   * Abstract getter to get the duration of the current source in seconds.
   */
  abstract get duration(): number;

  /**
   * Abstract getter to get the current quality level of the playback.
   */
  abstract get currentLevel(): Level;

  /**
   * Abstract getter to get the available quality levels of the playback.
   */
  abstract get levels(): Level[];

  /**
   * Abstract getter to check if auto level selection is enabled.
   */
  abstract get autoLevelEnabled(): boolean;

  /**
   * Abstract method to select a quality level for the playback.
   * @param level - The level to select. Can be a LevelDto object or "auto".
   */
  abstract selectLevel(level: Level | 'auto'): void;

  /**
   * Abstract method to select an audio language for the playback.
   * @param language - The language code of the audio track to select.
   */
  abstract selectAudioLanguage(language: string): void;

  /**
   * Abstract method to sync the playback with the live edge.
   */
  abstract syncWithLive(): void;

  /**
   * Static method to check if a given source can be played by the playback.
   * @param _ - The source to check.
   * @returns True if the source can be played, false otherwise.
   */
  public static canPlay(_: string): boolean {
    const logger = new Logger('Base Playback');
    logger.error(`${this.constructor.name}.canPlay is not implemented`);
    return false;
  }
}
