/// <reference types="youtube" />

import type { Context } from '../../context/context';
import { PLAYBACK_EVENT } from '../../events/events.dto';
import { Playback } from '../base_playback';
import type { Level } from '../playback_types';
import { PlaybackType } from '../playback_types';
import './youtube.module.css';

/**
 * Enum representing the available YouTube playback quality levels.
 */
export enum YoutubePlaybackQuality {
  small = 'small',
  medium = 'medium',
  large = 'large',
  hd720 = 'hd720',
  hd1080 = 'hd1080',
  highres = 'highres',
}

import type { Timer } from '../../common/types';
import { eventPromise } from '../../common/utils/helpers';
import { parseId } from './youtube.utils';

/** Default options for the YouTube player. */
const defaultYoutubeOptions: Partial<YT.PlayerOptions> = {
  width: '640px',
  height: '360px',
  playerVars: {
    autoplay: 0,
    controls: 0,
    showinfo: 0,
    modestbranding: 1,
    iv_load_policy: 3,
    autohide: 1,
    rel: 0,
    playsinline: 1,
    disablekb: 1,
    origin: window.location.origin,
  },
};

/**
 * YoutubePlayer is a player that uses the YouTube IFrame API to play YouTube videos.
 * It extends the Playback class and provides additional functionality specific to YouTube playback.
 */
export class YoutubePlayer extends Playback {
  /** The name of the player. */
  public name = 'YoutubePlayer';
  /** The container element for the YouTube player iframe. */
  public $iframeContainer: HTMLElement;
  /** The playback type of the video. */
  public playbackType = PlaybackType.VOD;
  /** Queue of functions to be executed when the player is ready. */
  #onReadyQueue: Array<() => void> = [];
  /** The YouTube player instance. */
  public _ytPlayerHolder: YT.Player | null = null;
  /** Flag indicating whether the player is ready. */
  #ready = false;
  /** The interval timer for updating the time. */
  #timeUpdateInterval: Timer | null = null;

  /**
   * Creates an instance of YoutubePlayer.
   * @param ctx - The context object.
   */
  constructor(ctx: Context) {
    super(ctx);

    const playerContainer = document.createElement('div');
    playerContainer.setAttribute('id', 'iframeContainer');
    this.controller.getRootElement().appendChild(playerContainer);
    this.$iframeContainer = playerContainer;
  }

  /**
   * Loads the YouTube player with the specified video ID and start time.
   * @param startTime - The time in seconds where the video should start.
   */
  public load(startTime?: number) {
    const videoId = parseId(this.controller.getOptions().source);

    if (!videoId) {
      throw new Error('Invalid youtube id');
    }

    this._ytPlayerHolder = new window.YT.Player(this.$iframeContainer, {
      ...defaultYoutubeOptions,
      videoId,
      playerVars: {
        ...defaultYoutubeOptions.playerVars,
        start: startTime,
      },
    });

    this.emit(PLAYBACK_EVENT.LOADSTART);

    eventPromise(this._ytPlayerHolder, 'onReady').then(() => {
      this.logger.info('ON READY');
      this.#ready = true;
      this.emit(PLAYBACK_EVENT.DURATION_CHANGED);
      this.emit(PLAYBACK_EVENT.LEVELS_LOADED);
      this.emit(PLAYBACK_EVENT.VOLUME_CHANGED);
      this.bindEvents();
      this.#onReadyQueue.forEach((fn) => fn());
      this.#onReadyQueue = [];
    });
  }

  /**
   * Checks if the player is ready and executes the provided function if ready.
   * If not ready, adds the function to the onReadyQueue.
   * @param fn - The function to be executed when the player is ready.
   */
  private checkIfReadyOrRun<T>(fn: () => T) {
    if (this.#ready) return fn();

    this.#onReadyQueue.push(fn);
    return;
  }

  /**
   * Gets the native element of the player.
   */
  public get nativeEl(): HTMLElement {
    return this.$iframeContainer;
  }

  /**
   * Gets the YouTube player instance.
   * Throws an error if the player is not ready.
   */
  public get ytPlayer(): YT.Player {
    if (!this._ytPlayerHolder) {
      throw new Error('Youtube player is not ready');
    } else {
      return this._ytPlayerHolder;
    }
  }

  /**
   * Binds event listeners to the YouTube player.
   */
  private bindEvents() {
    this.ytPlayer.addEventListener(
      'onStateChange',
      (event: YT.OnStateChangeEvent) => {
        switch (event.data) {
          case YT.PlayerState.PLAYING:
            this.emit(PLAYBACK_EVENT.PLAYING);
            break;
          case YT.PlayerState.PAUSED:
            this.emit(PLAYBACK_EVENT.PAUSE);
            break;
          case YT.PlayerState.ENDED:
            this.emit(PLAYBACK_EVENT.ENDED);
            break;
          case YT.PlayerState.BUFFERING:
            this.emit(PLAYBACK_EVENT.WAITING);
            break;
          default:
            break;
        }

        this.ytPlayer.addEventListener('onPlaybackRateChange', (_) => {
          this.emit(PLAYBACK_EVENT.PLAYBACKRATE_CHANGE);
        });

        this.ytPlayer.addEventListener('onPlaybackQualityChange', (_) => {
          this.emit(PLAYBACK_EVENT.LEVEL_CHANGED);
        });

        this.#timeUpdateInterval = setInterval(() => {
          this.emit(PLAYBACK_EVENT.TIMEUPDATE);
        }, 25);
      },
    );
  }

  /**
   * Callback function called when the player is connected to the DOM.
   */
  public connectedCallback() {
    // Placeholder for any necessary logic when the player is connected to the DOM.
  }

  /**
   * Callback function called when the player is disconnected from the DOM.
   */
  public disconnectedCallback() {
    if (this._ytPlayerHolder) {
      this._ytPlayerHolder.destroy();
    }

    if (this.#timeUpdateInterval) {
      clearInterval(this.#timeUpdateInterval);
    }
  }

  /**
   * Sets the source of the YouTube player.
   * @param src - The source URL of the video.
   * @param startTime - The time in seconds where the video should start.
   */
  public setSource(src: string, startTime?: number) {
    this.checkIfReadyOrRun(() => {
      this.ytPlayer.loadVideoByUrl(src, startTime);
    });
  }

  /**
   * Plays the YouTube player.
   */
  public play() {
    this.checkIfReadyOrRun(() => {
      this.emit(PLAYBACK_EVENT.PLAY);
      this.ytPlayer.playVideo();
    });
  }

  /**
   * Replays the video from the beginning.
   */
  public replay() {
    this.checkIfReadyOrRun(() => {
      this.seekTo(0);
      return this.play();
    });
  }

  /**
   * Pauses the YouTube player.
   */
  public pause() {
    this.checkIfReadyOrRun(() => {
      this.ytPlayer.pauseVideo();
    });
  }

  /**
   * Stops the YouTube player.
   */
  public stop() {
    this.checkIfReadyOrRun(() => {
      this.ytPlayer.stopVideo();
    });
  }

  /**
   * Gets whether auto level selection is enabled.
   */
  public get autoLevelEnabled() {
    return false;
  }

  /**
   * Seeks to a given time in the video.
   * @param time - The time in seconds to seek to.
   */
  public seekTo(time: number) {
    this.checkIfReadyOrRun(() => {
      this.ytPlayer.seekTo(time, true);
    });
  }

  /**
   * Seeks to a given percentage in the video.
   * @param percentage - The percentage to seek to.
   */
  public seekPercentage(percentage: number) {
    this.checkIfReadyOrRun(() => {
      const time = this.ytPlayer.getDuration() * (percentage / 100);
      this.seekTo(time);
    });
  }

  /**
   * Gets the current volume of the YouTube player.
   */
  public get volume(): number {
    if (!this.#ready) return 0;
    return this.ytPlayer.getVolume() / 100;
  }

  /**
   * Sets the volume of the YouTube player.
   * @param volume - The volume to set (0-1).
   */
  public setVolume(volume: number) {
    this.checkIfReadyOrRun(() => {
      this.ytPlayer.setVolume(volume * 100);

      this._triggerVolumeChanged();
    });
  }

  /**
   * Gets the duration of the video.
   */
  public get duration(): number {
    if (!this.#ready) return 0;
    return this.ytPlayer.getDuration();
  }

  /**
   * Gets whether the video is live.
   */
  public get isLive() {
    return this.playbackType === PlaybackType.LIVE;
  }

  /**
   * Triggers the volume changed event after a delay.
   */
  private _triggerVolumeChanged() {
    setTimeout(() => {
      this.emit(PLAYBACK_EVENT.VOLUME_CHANGED);
    }, 50);
  }

  /**
   * Gets whether the YouTube player is muted.
   */
  public get isMuted(): boolean {
    if (!this.#ready) return false;

    return this.ytPlayer.isMuted();
  }

  /**
   * Mutes the YouTube player.
   */
  public mute() {
    this.checkIfReadyOrRun(() => {
      this.ytPlayer.mute();
      this._triggerVolumeChanged();
    });
  }

  /**
   * Unmutes the YouTube player.
   */
  public unmute() {
    this.checkIfReadyOrRun(() => {
      this.ytPlayer.unMute();
      this._triggerVolumeChanged();
    });
  }

  /**
   * Gets the current playback rate of the YouTube player.
   */
  public get playbackRate(): number {
    if (!this.#ready) return 1;
    return this.ytPlayer.getPlaybackRate();
  }

  /**
   * Sets the playback rate of the YouTube player.
   * @param playbackRate - The playback rate to set.
   */
  public setPlaybackRate(playbackRate: number) {
    this.checkIfReadyOrRun(() => {
      this.ytPlayer.setPlaybackRate(playbackRate);
    });
  }

  /**
   * Gets the current time of the video.
   */
  public get currentTime(): number {
    if (!this.#ready) return 0;
    return this.ytPlayer.getCurrentTime();
  }

  /**
   * Gets the buffered percentage of the video.
   */
  public get bufferedPercentage() {
    if (!this.#ready) return 0;
    return this.ytPlayer.getVideoLoadedFraction() * 100;
  }

  /**
   * Gets whether the YouTube player is paused.
   */
  private get isPaused() {
    return !!(
      [
        YT.PlayerState.UNSTARTED,
        YT.PlayerState.ENDED,
        YT.PlayerState.PAUSED,
        YT.PlayerState.CUED,
      ].indexOf(this.ytPlayer.getPlayerState()) > YT.PlayerState.UNSTARTED
    );
  }

  /**
   * Gets whether the YouTube player is playing.
   */
  public get isPlaying() {
    return !this.isPaused;
  }

  /**
   * Gets whether the video has ended.
   */
  get hasEnded() {
    return this.ytPlayer.getPlayerState() === YT.PlayerState.ENDED;
  }

  /**
   * Gets the current quality level of the YouTube player.
   */
  public get currentLevel(): Level {
    if (!this.#ready) return {} as Level;
    const level = this.ytPlayer.getPlaybackQuality();
    return { id: 0, name: level, hd: this._checkLevelIsHD(level) };
  }

  /**
   * Checks if a given quality level is considered HD.
   * @param level - The quality level to check.
   * @returns True if the level is HD, false otherwise.
   */
  _checkLevelIsHD(level: string) {
    if (
      level === YoutubePlaybackQuality.hd1080 ||
      level === YoutubePlaybackQuality.hd720 ||
      level === YoutubePlaybackQuality.highres
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Gets the available quality levels of the YouTube player.
   */
  public get levels(): Level[] {
    const listLevels = this.ytPlayer.getAvailableQualityLevels();

    return listLevels.map((name, index) => {
      return { id: index, name: name, hd: this._checkLevelIsHD(name) };
    });
  }

  /**
   * Selects the specified level for the YouTube player.
   * @param level - The level to be selected.
   */
  public selectLevel(level: Level | 'auto') {
    const youtubeLevel =
      level === 'auto'
        ? ('default' as YT.VideoQualityDefault)
        : (level.name as YT.SuggestedVideoQuality);
    this.ytPlayer.setPlaybackQuality(youtubeLevel);
  }

  /**
   * Selects the audio language for the YouTube player.
   * @param _ - The language to select (not implemented).
   */
  public selectAudioLanguage(_: string) {
    this.logger.error('NOT IMPLEMENTED ');
  }

  /**
   * Syncs the playback with the live edge (not implemented).
   */
  public syncWithLive() {
    this.logger.error('NOT IMPLEMENTED ');
  }

  /**
   * Checks whether a given source can be played by the YoutubePlayer.
   * @param source - The source to check.
   * @returns True if the source can be played, false otherwise.
   */
  static canPlay(source: string) {
    return parseId(source) ? true : false;
  }
}
