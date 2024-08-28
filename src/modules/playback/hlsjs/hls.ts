import type { HlsConfig, Level as HlsLevel, LevelLoadedData } from 'hls.js';
import Hls from 'hls.js';
import { MimetypeUtils } from '../../common/utils';
import type { Context } from '../../context/context';
import { PLAYBACK_EVENT } from '../../events/events.dto';
import { HTML5Player } from '../html5';
import type { Level } from '../playback_types';
import { PlaybackType } from '../playback_types';

/**
 * HlsJsPlayer is a player that uses the hls.js library to play HLS streams.
 * It extends the HTML5Player class and provides additional functionality specific to HLS playback.
 *
 * @extends HTML5Player<HlsConfig>
 * @category Playback
 */
export class HlsJsPlayer extends HTML5Player<HlsConfig> {
  /** The name of the player. */
  public name = 'hlsjs';
  /** The hls.js instance used for playback. */
  public hlsjs!: Hls;

  /** The timer used for updating the DVR time. */
  #dvrTimeUpdateTimer: number | undefined;
  /** The duration of a segment in seconds. */
  #segmentDuration = 0;
  /** The options passed to the hls.js constructor. */
  #hlsOptions: HlsConfig;

  /**
   * Creates an instance of HlsJsPlayer.
   * @param context - The context object.
   */
  constructor(context: Context) {
    super(context);
    this.#hlsOptions = this.getConfig();

    if (Hls.isSupported()) {
      this.hlsjs = new Hls({
        ...{
          autoStartLoad: false,
          enableWebVTT: false,
          backBufferLength: 90,
          maxBufferHole: 2,
        },
        ...this.#hlsOptions,
      });
    }
  }

  /**
   * Callback function called when the player is connected to the DOM.
   */
  connectedCallback() {
    super.connectedCallback();

    const preload = this.controller.getOptions().preload;

    this._attachMedia();

    if (preload === 'metadata') {
      this._loadMetadata();
    }

    if (preload === 'auto') {
      this.load();
    }

    this._bindListeners();
  }

  /**
   * Loads the metadata of the HLS stream.
   */
  private _loadMetadata = () => {
    const source = this.controller.getOptions().source;
    this.hlsjs.loadSource(source);
  };

  /**
   * Attaches the HLS stream to the media element.
   */
  private _attachMedia = () => {
    if (Hls.isSupported()) {
      this.hlsjs.attachMedia(this.nativeEl);
    }
  };

  /**
   * Loads the HLS stream and starts playback.
   * @param startTime - The time in seconds to start playback from.
   */
  public load(startTime?: number) {
    if (!Hls.isSupported()) {
      super.load(startTime);
      return;
    }

    const source = this.controller.getOptions().source;

    if (!source) {
      this.logger.error('No source found.');
      return;
    }

    this.hlsjs.once(Hls.Events.MANIFEST_PARSED, () => {
      this.hlsjs.startLoad(startTime);
    });

    this.hlsjs.loadSource(source);
  }

  /**
   * Binds event listeners to the hls.js instance.
   */
  private _bindListeners() {
    this.hlsjs.on(Hls.Events.MANIFEST_PARSED, (_, __) => {
      this.emit(PLAYBACK_EVENT.LEVELS_LOADED);
    });

    this.hlsjs.on(Hls.Events.LEVEL_SWITCHED, (_, __) => this._onLevelSwitch());

    this.hlsjs.on(Hls.Events.LEVEL_LOADED, (_, data) => {
      this._onLevelLoaded(data);

      this.#segmentDuration = data.details.targetduration;
    });

    this.hlsjs.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          this.hlsjs.startLoad();
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          this.hlsjs.recoverMediaError();
        } else {
          //
        }
      }
    });
  }

  /**
   * Seeks to a given time in the video.
   * @param time - The time in seconds to seek to. If set to Infinity, it seeks to the live sync position.
   */
  public seekTo(time: number) {
    if (this.playbackType === PlaybackType.LIVE) {
      const liveSyncPosition = this.hlsjs.liveSyncPosition;
      if (time >= liveSyncPosition!) {
        super.seekTo(liveSyncPosition!);
      } else {
        const maxDvrOffset = this.hlsjs.maxLatency || 30;
        const targetTime = Math.max(liveSyncPosition! - maxDvrOffset, time);
        super.seekTo(targetTime);
      }
    } else {
      super.seekTo(time);
    }
  }

  /**
   * Unloads the player and destroys the hls.js instance.
   */
  public unload() {
    clearInterval(this.#dvrTimeUpdateTimer);
    this.hlsjs.destroy();
  }

  /**
   * Gets the current quality level.
   */
  public get currentLevel() {
    return this.formatLevel(
      this.hlsjs.levels[this.hlsjs.currentLevel],
      this.hlsjs.currentLevel,
    );
  }

  /**
   * Selects a quality level.
   * @param level - The level to select. Can be a LevelDto object or "auto".
   */
  public selectLevel(level: Level | 'auto') {
    if (level === 'auto') {
      this.hlsjs.currentLevel = -1;
    } else {
      this.hlsjs.currentLevel = (level as Level).id;
    }

    this.emit(PLAYBACK_EVENT.AUTOLEVEL_CHANGED);
  }

  /**
   * Gets the available quality levels.
   */
  public get levels(): Level[] {
    return this.hlsjs.levels
      .map(this.formatLevel)
      .sort((a, b) => b.bandwidth! - a.bandwidth!);
  }

  /**
   * Gets whether auto level selection is enabled.
   */
  public get autoLevelEnabled() {
    return this.hlsjs.autoLevelEnabled;
  }

  /**
   * Selects an audio track by language.
   * @param language - The language code of the audio track to select.
   */
  public selectAudioLanguage(language: string) {
    const audioTracks = this.hlsjs.audioTracks;
    const audioTrack = audioTracks.find((track) => track.lang === language);

    if (audioTrack) {
      this.hlsjs.audioTrack = audioTrack.id;
      this.emit(PLAYBACK_EVENT.AUDIO_CHANGED);
    }
  }

  /**
   * Formats a Level object into a LevelDto object.
   * @param track - The Level object to format.
   * @param id - The ID of the level.
   * @returns The formatted LevelDto object.
   */
  private formatLevel = (track: HlsLevel, id: number): Level => {
    const hd = track.height >= 720 || track.bitrate / 1000 >= 2000;
    return {
      id,
      hd,
      name: `${track.height}`,
      width: track.width,
      height: track.height,
      bandwidth: track.bitrate,
    };
  };

  /**
   * Callback function called when the quality level is switched.
   */
  private _onLevelSwitch() {
    this.emit(PLAYBACK_EVENT.LEVEL_CHANGED);
    this.emit(PLAYBACK_EVENT.AUTOLEVEL_CHANGED);
  }

  /**
   * Callback function called when a quality level is loaded.
   * @param data - The LevelLoadedData object.
   */
  private _onLevelLoaded(data: LevelLoadedData) {
    this.playbackType = data.details.live
      ? PlaybackType.LIVE
      : PlaybackType.VOD;

    this.emit(PLAYBACK_EVENT.LEVELS_LOADED);
  }

  /**
   * Checks whether the playback is at the live edge.
   * @returns True if the playback is at the live edge, false otherwise.
   */
  public isPlaybackAtLiveEdge() {
    if (this.playbackType === PlaybackType.LIVE) {
      const liveSyncPosition = this.hlsjs.liveSyncPosition;
      const currentTime = this.currentTime;
      const edgeThreshold = this.#segmentDuration;
      return liveSyncPosition! - currentTime <= edgeThreshold;
    }
    return false;
  }

  /**
   * Syncs the playback with the live edge.
   */
  public syncWithLive() {
    if (this.playbackType === PlaybackType.LIVE) {
      const liveSyncPosition = this.hlsjs.liveSyncPosition;
      super.seekTo(liveSyncPosition!);
    }
  }

  /**
   * Checks whether a given source can be played by the HlsJsPlayer.
   * @param source - The source to check.
   * @returns True if the source can be played, false otherwise.
   */
  public static canPlay(source: string) {
    const isHls = MimetypeUtils.isHls(source);
    const payload = !!(Hls.isSupported() && isHls);
    return payload;
  }
}
