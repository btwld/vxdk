import { VxdkError } from '../common/error';
import { MimetypeUtils } from '../common/utils';
import type { Context } from '../context/context';
import { PLAYBACK_EVENT } from '../events/events.dto';
import { Playback } from './base_playback';
import type { Level } from './playback_types';
import { PlaybackType } from './playback_types';

/**
 *
 * HTML5Player is a base playback class for HTML5 video playback.
 * It is also used as the base for other playback dependent on HTML5 video.
 /**
 * @extends {Playback<Config>}
 * @category Playback
 */
export class HTML5Player<
  Config = Record<string, unknown>,
> extends Playback<Config> {
  /** The name of the player. */
  public name = 'HTML5Player';

  /** The buffered percentage of the video. */
  private _bufferedPercentage = 0;
  /**
   * The type of playback.
   * @type {PlaybackType}
   */
  public playbackType: PlaybackType = PlaybackType.VOD;

  /**
   * The native HTMLVideoElement used for playback.
   * @private
   * @readonly
   */
  private readonly _nativeEl: HTMLVideoElement;

  /**
   * Creates an instance of HTML5Player.
   * @category Playback
   * @param {Context} context - The context object.
   */
  constructor(context: Context) {
    super(context);

    this._nativeEl = document.createElement('video');

    this.controller.getRootElement().appendChild(this._nativeEl);
    const options = this.controller.getOptions();

    this._nativeEl.src = options.source;
    this._nativeEl.crossOrigin = options.crossOrigin;
    this._nativeEl.playsInline = options.playsInline;
    this._nativeEl.muted = options.muted;
    this._nativeEl.volume = options.muted ? 0 : options.volume;

    // autoplay will be handled by autoplay extension
    // this.nativeEl.autoplay = options.autoplay;
    this._nativeEl.preload = options.preload;
    this._nativeEl.controls = options.nativeControls;
  }

  /**
   * Loads the media, optionally setting the start time.
   * @param startTime - The start time in seconds to set for the media.
   */
  public load(startTime?: number) {
    this.setSource(this.controller.getOptions().source);
    if (startTime) {
      this._nativeEl.currentTime = startTime;
    }
    this._nativeEl.load();
  }

  /**
   * Callback function called when the player is connected to the DOM.
   */
  public connectedCallback() {
    this._nativeEl.addEventListener('playing', () => {
      this.emit(PLAYBACK_EVENT.PLAYING);
    });

    this._nativeEl.addEventListener('ended', () => {
      this.emit(PLAYBACK_EVENT.ENDED);
    });

    this._nativeEl.addEventListener('waiting', () => {
      this.emit(PLAYBACK_EVENT.WAITING);
    });

    this._nativeEl.addEventListener('pause', () => {
      this.emit(PLAYBACK_EVENT.PAUSE);
    });

    this._nativeEl.addEventListener('volumechange', () => {
      this.emit(PLAYBACK_EVENT.VOLUME_CHANGED);
    });

    this._nativeEl.addEventListener('loadeddata', () => {
      this._monitorProgress();

      this.emit(PLAYBACK_EVENT.LOADEDMETADATA);
      this.emit(PLAYBACK_EVENT.DURATION_CHANGED);
    });

    this._nativeEl.addEventListener('loadstart', () => {
      this.emit(PLAYBACK_EVENT.LOADSTART);
    });

    this._nativeEl.addEventListener('progress', () => this._monitorProgress());

    this._nativeEl.addEventListener('ratechange', () => {
      this.emit(PLAYBACK_EVENT.PLAYBACKRATE_CHANGE);
    });
    this._nativeEl.addEventListener('timeupdate', () => {
      this.emit(PLAYBACK_EVENT.TIMEUPDATE);
    });

    this._nativeEl.addEventListener('loadedmetadata', () => {
      this.emit(PLAYBACK_EVENT.DURATION_CHANGED);
    });

    // this.nativeEl.addEventListener("error", (data) => {
    //   this.trigger(PLAYBACK_EVENT.error)w VxdkError("Html5 video error", data));
    // });
  }

  /**
   * Callback function called when the player is disconnected from the DOM.
   */
  public disconnectedCallback() {
    if (this._nativeEl) {
      this._nativeEl.pause();
      this._nativeEl.removeAttribute('src');
      this._nativeEl.remove();
    }
  }

  /**
   * Gets the native HTMLVideoElement used for playback.
   */
  public get nativeEl(): HTMLVideoElement {
    return this._nativeEl;
  }

  /**
   * Sets the source URL for the video.
   * @param src - The URL of the video source.
   */
  public setSource(src: string) {
    this._nativeEl.src = src;
  }

  /**
   * Starts playing the video.
   * @returns A Promise that resolves when playback has begun.
   */
  public play() {
    this.emit(PLAYBACK_EVENT.PLAY);
    return this._nativeEl.play();
  }

  /**
   * Replays the video from the beginning.
   * @returns A Promise that resolves when playback has begun.
   */
  public replay() {
    this.seekTo(0);
    return this.play();
  }

  /**
   * Pauses the video playback.
   */
  public pause() {
    this.emit(PLAYBACK_EVENT.PAUSE);
    this._nativeEl.pause();
  }

  /**
   * Stops the video playback and removes the video source.
   */
  public stop() {
    this.pause();

    this._nativeEl.removeAttribute('src');
    this._nativeEl.load(); // load with no src to stop loading of the previous source and avoid leaks
  }

  /**
   * Gets whether auto level selection is enabled.
   */
  public get autoLevelEnabled() {
    return false;
  }

  /**
   * Seeks to a specific time in the video.
   * @param time - The time in seconds to seek to.
   */
  public seekTo(time: number) {
    this._nativeEl.currentTime = time;
  }

  /**
   * Seeks to a specific percentage of the video duration.
   * @param percentage - The percentage of the video duration to seek to.
   */
  public seekPercentage(percentage: number) {
    const time = this._nativeEl.duration * (percentage / 100);
    this.seekTo(time);
  }

  /**
   * Gets the current volume level.
   */
  public get volume(): number {
    return this._nativeEl.volume;
  }

  /**
   * Sets the volume level.
   * @param volume - The volume level as a number between 0 and 1.
   */
  public setVolume(volume: number) {
    this._nativeEl.volume = volume;
    this._nativeEl.muted = volume === 0;
  }

  /**
   * Gets the duration of the video.
   */
  public get duration(): number {
    return this._nativeEl.duration;
  }

  /**
   * Checks if the video is a live stream.
   */
  public get isLive() {
    return this.playbackType === PlaybackType.LIVE;
  }

  /**
   * Checks if the video is muted.
   */
  public get isMuted(): boolean {
    return this._nativeEl.muted;
  }

  /**
   * Mutes the video.
   */
  public mute() {
    this._nativeEl.muted = true;
  }

  /**
   * Unmutes the video.
   */
  public unmute() {
    this._nativeEl.muted = false;
  }

  /**
   * Gets the current playback rate.
   */
  public get playbackRate(): number {
    return this._nativeEl.playbackRate;
  }

  /**
   * Sets the playback rate.
   * @param playbackRate - The new playback rate as a number.
   */
  public setPlaybackRate(playbackRate: number) {
    this._nativeEl.playbackRate = playbackRate;
  }

  /**
   * Gets the current playback time.
   */
  public get currentTime(): number {
    return this._nativeEl.currentTime;
  }

  /**
   * Gets the buffered percentage of the video.
   */
  public get bufferedPercentage() {
    return this._bufferedPercentage;
  }

  /**
   * Checks if the video is playing.
   */
  public get isPlaying() {
    return !this._nativeEl.paused && !this._nativeEl.ended;
  }

  /**
   * Checks if the video has ended.
   */
  get hasEnded(): boolean {
    return this._nativeEl.ended;
  }

  /**
   * Monitors the video progress and updates the buffered percentage.
   */
  private _monitorProgress() {
    const buffered: any = this._nativeEl.buffered;
    const time: number = this._nativeEl.currentTime;
    let percentage: number;

    for (let range = 0; range < buffered.length; range += 1) {
      if (buffered.start(range) <= time && buffered.end(range) > time) {
        percentage = buffered.end(range) / this._nativeEl.duration;
        if (percentage !== undefined) {
          this._bufferedPercentage = percentage;
          this.emit(PLAYBACK_EVENT.BUFFERED_CHANGED);
        }
        break;
      }
    }
  }

  /**
   * Gets the current video level.
   * @throws Will throw an error since this method is not implemented.
   */
  public get currentLevel(): Level {
    throw new VxdkError('NOT IMPLEMENTED');
  }

  /**
   * Gets the available video levels.
   * @returns An empty array since this method is not implemented.
   */
  public get levels(): Level[] {
    this.logger.error('NOT IMPLEMENTED');
    return [] as Level[];
  }

  /**
   * Selects a video level.
   * @param _ - The LevelDto object or "auto" to select the level (unused).
   */
  public selectLevel(_: Level | 'auto') {
    this.logger.error('NOT IMPLEMENTED');
  }

  /**
   * Selects an audio language.
   * @param _ - The string representing the audio language to select (unused).
   */
  public selectAudioLanguage(_: string) {
    this.logger.error('NOT IMPLEMENTED');
  }

  /**
   * Syncs the video with live playback.
   */
  public syncWithLive() {
    this.logger.error('NOT IMPLEMENTED');
  }

  /**
   * Checks if the current player can play the given source.
   * @param source - The URL of the video source to check.
   * @returns A boolean value indicating if the player can play the source.
   */
  static canPlay(source: string) {
    const mimeTypes = MimetypeUtils.mimeTypeForUrl(source);
    const media = document.createElement('video');
    return !!mimeTypes.filter(
      (mediaType) => !!media.canPlayType(mediaType).replace(/no/, ''),
    )[0];
  }
}
