import { Plugin } from '@common/module';
import type { Level } from 'modules/playback/playback_types';

import { ArrayUtils } from '@common/utils';
import type { Context } from '../../context/context';
import type { Controller } from '../../context/controller';

import { CONTEXT_EVENT, PLAYBACK_EVENT } from '../../events/events.dto';
import type { Options } from '../../options/options.dto';
import type { State } from './state.dto';

export class StatePlugin extends Plugin {
  public name = 'state';

  private _state: State;

  constructor(context: Context) {
    super(context);
    this._state = cloneDefaultState();
  }

  connectedCallback() {
    // Track if element is in focus
    this.controller.getRootElement().addEventListener(
      'mouseenter',
      this._updateState((state) => {
        state.focused = true;
      }),
    );

    // Track if element loses focus
    this.controller.getRootElement().addEventListener(
      'mouseleave',
      this._updateState((state) => {
        state.focused = false;
      }),
    );

    this.on(
      CONTEXT_EVENT.READY,
      this._updateState((state, controller) => {
        state.ready = true;
        state.waitingForUser = true;
        state.options = controller.getOptions();
      }),
    );

    this.on(
      CONTEXT_EVENT.OPTIONS_CHANGED,
      this._updateState((state, controller) => {
        state.options = controller.getOptions();
      }),
    );

    this.on(
      PLAYBACK_EVENT.PLAY,
      this._updateState((state) => {
        state.paused = false;
      }),
    );

    // // playing
    this.on(
      PLAYBACK_EVENT.PLAYING,
      this._updateState((state) => {
        // if (this.state.adBreak) {
        //   return;
        // }
        state.waitingForUser = false;
        state.playing = true;
        state.started = true;
        state.buffering = false;
        state.paused = false;
        state.ended = false;
      }),
    );

    // paused
    this.on(
      PLAYBACK_EVENT.PAUSE,
      this._updateState((state) => {
        // if (this.state.adBreak) {
        //   return;
        // }
        state.buffering = false;
        state.playing = false;
        state.paused = true;
      }),
    );

    // load
    this.on(
      PLAYBACK_EVENT.LOADSTART,
      this._updateState((state) => {
        // set starting values
        state.muted = this.controller.isMuted();
        state.volume = this.controller.getVolume();
      }),
    );

    // currentTime
    this.on(
      PLAYBACK_EVENT.TIMEUPDATE,
      this._updateState((state) => {
        state.currentTime = this.controller.getCurrentTime();
      }),
    );

    // duration
    this.on(
      PLAYBACK_EVENT.DURATION_CHANGED,
      this._updateState((state) => {
        state.duration = this.controller.getDuration();
      }),
    );

    // buffering
    this.on(
      PLAYBACK_EVENT.WAITING,
      this._updateState((state) => {
        state.buffering = true;
        state.waitingForUser = false;
      }),
    );

    this.on(
      PLAYBACK_EVENT.ENDED,
      this._updateState((state) => {
        // If we can't find a postroll, everything is ended
        state.started = false;
        state.playing = false;
        state.ended = true;
      }),
    );

    this.on(
      PLAYBACK_EVENT.BUFFERED_CHANGED,
      this._updateState((state, controller) => {
        state.bufferedPercentage = controller.getBufferedPercentage();
      }),
    );

    this.on(
      PLAYBACK_EVENT.VOLUME_CHANGED,
      this._updateState((state, controller) => {
        state.muted = controller.isMuted();
        state.volume = controller.getVolume();
      }),
    );

    this.on(
      CONTEXT_EVENT.FULLSCREEN_CHANGED,
      this._updateState((state, controller) => {
        state.fullscreen = controller.isFullscreen();
      }),
    );

    this.on(
      PLAYBACK_EVENT.LEVELS_LOADED,
      this._updateState((state, controller) => {
        const levels = controller.getLevels();
        state.levels = ArrayUtils.sortBy(
          levels,
          (level) => level.height ?? level.id,
        );

        state.live = controller.isLive();
      }),
    );

    this.on(
      PLAYBACK_EVENT.AUTOLEVEL_CHANGED,
      this._updateState((state, controller) => {
        state.levelAutoSwitch = controller.isAutoLevelEnabled();
      }),
    );

    this.on(
      PLAYBACK_EVENT.LEVEL_CHANGED,
      this._updateState((state, controller) => {
        const level = controller.getCurrentLevel();
        state.level = level;
        state.hd = level.hd;
      }),
    );

    this.on(
      PLAYBACK_EVENT.PLAYBACKRATE_CHANGE,
      this._updateState((state, controller) => {
        state.playbackRate = controller.getPlaybackRate();
      }),
    );

    this.on(
      CONTEXT_EVENT.PIP_CHANGED,
      this._updateState((state, controller) => {
        state.pip = controller.isPip();
      }),
    );

    this.on(
      CONTEXT_EVENT.DIMENSION_CHANGED,
      this._updateState((state, controller) => {
        state.width = controller.getWidth();
        state.height = controller.getHeight();
      }),
    );
  }

  private _updateState(
    mutateFn: (state: State, controller: Controller) => void,
  ) {
    const controller = this.controller;
    return () => {
      const snapshot = cloneState(this._state);

      mutateFn(snapshot, controller);

      this._state = snapshot;

      this.emit(CONTEXT_EVENT.STATE_CHANGED);
    };
  }

  public get state(): State {
    return this._state;
  }
}

/**
 * Clones the state object
 * @param state - The state object to clone
 * @returns A new cloned state object
 */
export const cloneState = (state: State): State => {
  return {
    ...state,
    level: { ...state.level } as Level | null,
    levels: state.levels.map((level) => ({ ...level })),
    audioLanguages: [...state.audioLanguages],
  };
};

/**
 * Clones the default state
 * @returns A new cloned default state object
 */
export const cloneDefaultState = () => {
  return cloneState(defaultVxdkState);
};

/**
 * Default state object for the VXDK player
 */
export const defaultVxdkState: State = {
  // Status
  waitingForUser: true,
  ready: false,
  started: false,
  ended: false,
  playing: false,
  paused: false,
  buffering: false,
  focused: false,
  // Playback info
  live: false,
  hd: false,
  currentTime: 0,
  duration: 0,
  options: {} as Options,
  bufferedPercentage: 0,
  volume: 1,
  muted: false,
  fullscreen: false,
  pip: false,
  levels: [],
  level: null,
  levelAutoSwitch: false,
  playbackRate: 1,
  audioLanguages: [],
  width: null,
  height: null,
};
