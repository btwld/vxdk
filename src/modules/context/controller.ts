import { Hook } from '@common/hooks';
import { DimensionsPlugin } from '@plugins/dimensions/dimensions';
import { FullscreenPlugin } from '@plugins/fullscreen/fullscreen';
import type { ModuleClass, Plugin } from '../common/module';

import type { State } from '@plugins/state/state.dto';
import type { Options } from '../options/options.dto';
import type { Playback } from '../playback/base_playback';
import type { Level, PlaybackType } from '../playback/playback_types';
import { PipPlugin } from '../plugins/pip/pip';
import type { Context } from './context';

/**
 * VXDK Controller class that exposes all public APIs for video playback control
 */
export class Controller {
  /** Hook for extending controller functionality */
  public hook: Hook<Controller>;

  /**
   * Private constructor for VxdkController
   * @param context - The VxdkContext instance
   */
  private constructor(private readonly context: Context) {
    this.hook = new Hook(this);
  }

  /**
   * Factory method to create a new instance of VxdkController.
   *
   * @param context - The context object containing playback options and configurations.
   * @returns {Controller} A new instance of the VxdkController.
   */
  static create = (context: Context): Controller => {
    return new Controller(context);
  };

  /**
   * Loads the video source into the playback system.
   *
   * This method initializes the playback by loading the video from the start time specified in the context.
   */
  public load = () => {
    this.context.playback.load(this.context.options.startTime ?? 0);
  };

  /**
   * Sets the video source URL for playback.
   *
   * @param src - The URL of the video source to be played.
   */
  public setSource = (src: string) => {
    this.context.playback.setSource(src);
  };

  /**
   * Starts or resumes video playback.
   * A promise that resolves when playback starts, or void if synchronous.
   */
  public play = (): Promise<void> | void => {
    return this.context.playback.play();
  };

  /**
   * Toggles video playback between playing and paused states.
   *
   * If the video is currently playing, it will be paused. If it is paused, playback will resume.
   */
  public togglePlay = () => {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  };

  /**
   * Replays the video from the beginning.
   *
   * This method resets the playback to the start and begins playing the video from the beginning.
   *
   * @returns {Promise<void> | void} A promise that resolves when playback starts, or void if synchronous.
   */
  public replay = (): Promise<void> | void => {
    return this.context.playback.replay();
  };

  /**
   * Checks if the video is currently playing.
   *
   * @returns {boolean} `true` if the video is currently playing, otherwise `false`.
   */
  public isPlaying = (): boolean => {
    return this.context.playback.isPlaying;
  };

  /**
   * Retrieves the current version of the video player.
   *
   * @returns {string} The version string of the video player.
   */
  public getVersion = (): string => this.context.version;

  /**
   * Pauses video playback.
   *
   * This method stops the video from playing but retains the current playback position.
   */
  public pause = () => {
    this.context.playback.pause();
  };

  /**
   * Stops video playback entirely.
   *
   * This method stops the video and resets the playback position to the start.
   */
  public stop = () => {
    this.context.playback.stop();
  };

  /**
   * Seeks to a specific time in the video.
   *
   * @param time - The time position to seek to, in seconds.
   */
  public seekTo = (time: number) => {
    this.context.playback.seekTo(time);
  };

  /**
   * Seeks to a specific percentage of the video's total duration.
   *
   * @param percentage - The percentage of the video duration to seek to (value between 0 and 100).
   */
  public seekToPercentage = (percentage: number) => {
    const duration = this.getDuration();
    this.seekTo((duration / 100) * percentage);
  };

  /**
   * Binds an event listener
   * @returns The bound event listener function
   */
  public get on() {
    return this.context.on.bind(this.context);
  }

  /**
   * Removes an event listener
   * @returns The function to remove the event listener
   */
  public get off() {
    return this.context.off.bind(this.context);
  }

  /**
   * Binds a one-time event listener
   * @returns The bound one-time event listener function
   */
  public get once() {
    return this.context.once.bind(this.context);
  }

  /**
   * Emits an event
   * @returns The function to emit an event
   */
  public get emit() {
    return this.context.emit.bind(this.context);
  }

  /**
   * Sets the volume of the playback
   * @param volume - The volume level (0-1)
   */
  public setVolume = (volume: number) => {
    if (this.context.playback.setVolume) {
      this.context.playback.setVolume(volume);
    }
  };

  /**
   * Gets the current volume level
   * @returns The current volume level (0-1)
   */
  public getVolume = () => this.context.playback.volume;

  /**
   * Checks if autoplay is enabled
   * @returns true if autoplay is enabled, false otherwise
   */
  public getAutoPlay = () => this.context.options.autoPlay;

  /**
   * Toggles between muted and unmuted states
   */
  public toggleMute = () => {
    if (this.context.playback.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  };

  /**
   * Checks if the playback is currently muted
   * @returns true if muted, false otherwise
   */

  public isMuted = (): boolean => this.context.playback.isMuted;
  /**
   * Mutes the playback
   */
  public mute = () => this.context.playback.mute();

  /**
   * Unmutes the playback
   */
  public unmute = () => {
    this.context.playback.unmute();
    // If volume 0 set it to minimum
    if (this.context.playback.volume === 0) {
      this.context.playback.setVolume(0.1);
    }
  };

  /**
   * Sets the quality level for playback
   * @param level - The quality level to set, or 'auto' for automatic
   */
  public setLevel = (level: Level | 'auto') => {
    this.context.playback.selectLevel(level);
  };

  /**
   * Selects the audio language for playback
   * @param language - The language code to select
   */
  public selectAudioLanguage = (language: string) => {
    this.context.playback.selectAudioLanguage(language);
  };

  /**
   * Sets the playback rate
   * @param playbackRate - The playback rate (e.g., 1.0 for normal speed)
   */
  public setPlaybackRate = (playbackRate: number) => {
    this.context.playback.setPlaybackRate(playbackRate);
  };

  /**
   * Gets the current playback rate
   * @returns The current playback rate
   */
  public getPlaybackRate = (): number => {
    return this.context.playback.playbackRate;
  };

  /**
   * Gets the current playback type
   * @returns The playback type
   */
  public getPlaybackType = (): PlaybackType => {
    return this.context.playback.playbackType;
  };

  /**
   * Gets the playback adapter
   * @returns The playback adapter instance
   */

  public getPlaybackAdapter = (): Playback => this.context.playback;
  /**
   * Gets the total duration of the video
   * @returns The duration in seconds
   */
  public getDuration = (): number => this.context.playback.duration;

  /**
   * Gets the current quality level
   * @returns The current quality level
   */
  public getCurrentLevel = (): Level => this.context.playback.currentLevel;

  /**
   * Gets the current playback time
   * @returns The current time in seconds
   */
  public getCurrentTime = (): number => this.context.playback.currentTime;

  /**
   * Checks if auto-level selection is enabled
   * @returns true if auto-level is enabled, false otherwise
   */
  public isAutoLevelEnabled = (): boolean =>
    this.context.playback.autoLevelEnabled;

  /**
   * Gets the available quality levels
   * @returns An array of available quality levels
   */
  public getLevels = (): Level[] => this.context.playback.levels;

  /**
   * Gets the percentage of the video that has been buffered
   * @returns The buffered percentage (0-100)
   */
  public getBufferedPercentage = (): number =>
    this.context.playback.bufferedPercentage;

  /**
   * Gets the current state of the player
   * @returns The current state object
   */
  public getState = (): State => this.context.state;

  /**
   * Checks if the current playback is a live stream
   * @returns true if live, false otherwise
   */
  public isLive = (): boolean => this.context.playback.isLive;

  /**
   * Enters fullscreen mode
   * @throws {Error} If the fullscreen API is not supported or permission is denied
   * @returns {void}
   */
  public enterFullscreen = () => this.getPlugin(FullscreenPlugin).enter();

  /**
   * Exits fullscreen mode
   * @throws {Error} If the fullscreen API is not supported or the document is not in fullscreen mode
   * @returns {void}
   */
  public exitFullscreen = () => this.getPlugin(FullscreenPlugin).exit();

  /**
   * Checks if the player is in fullscreen mode
   * @returns true if in fullscreen, false otherwise
   */
  public isFullscreen = (): boolean =>
    this.getPlugin(FullscreenPlugin).isFullscreen;

  /**
   * Toggles fullscreen mode
   */
  public toggleFullscreen = () =>
    this.getPlugin(FullscreenPlugin).toggleFullscreen();

  /**
   * Enters picture-in-picture mode
   */
  public enterPip = () => this.getPlugin(PipPlugin).enter();

  /**
   * Exits picture-in-picture mode
   */
  public exitPip = () => this.getPlugin(PipPlugin).exit();

  /**
   * Checks if the player is in picture-in-picture mode
   * @returns true if in PiP mode, false otherwise
   */
  public isPip = (): boolean => this.getPlugin(PipPlugin).isPip;

  /**
   * Toggles picture-in-picture mode
   */
  public togglePip = () => this.getPlugin(PipPlugin).togglePip();
  /**
   * Gets the root element of the player
   * @returns {HTMLElement} The root HTMLElement of the player
   */
  public getRootElement = (): HTMLElement => this.context.$uiContainer;

  /**
   * Gets the current width of the player
   * @returns {number} The width of the player in pixels
   */
  public getWidth = (): number => this.getPlugin(DimensionsPlugin).width;

  /**
   * Gets the current height of the player
   * @returns {number} The height of the player in pixels
   */
  public getHeight = (): number => this.getPlugin(DimensionsPlugin).height;

  /**
   * Retrieves a plugin instance of the specified type.
   *
   * @template T The type of the plugin that extends the `Plugin` base class.
   * @param {ModuleClass<T>} plugin The class of the plugin to retrieve.
   * @returns {T} The plugin instance of the specified type.
   */
  public getPlugin = <T extends Plugin>(plugin: ModuleClass<T>): T => {
    return this.context.getPlugin(plugin);
  };

  /**
   * Retrieves a plugin instance by its name.
   *
   * @template T The type of the plugin that extends the `Plugin` base class.
   * @param {string} name The name of the plugin to retrieve.
   * @returns {T} The plugin instance of the specified type.
   */
  public getPluginByName = <T extends Plugin>(name: string): T => {
    return this.context.getPluginByName(name);
  };

  /**
   * Retrieves the current options from the context.
   *
   * @returns {Options} The current options object.
   */
  public getOptions = (): Options => this.context.options.options;

  /**
   * Gets the context of the player
   * @returns {Context} The context object
   */
  public getContext = (): Context => this.context;

  /**
   * Destroys the player instance and releases resources
   */
  public destroy = () => this.context.destroy();
}
