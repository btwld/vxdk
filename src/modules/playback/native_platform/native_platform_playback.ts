import { VxdkError } from '../../common/error';

import type { Context } from '../../context/context';
import { PLAYBACK_EVENT } from '../../events/events.dto';
import type { NativePlaybackState } from '../../platform/comm/native_playback';

import { Playback } from '../base_playback';
import type { Level } from '../playback_types';
import { PlaybackType } from '../playback_types';

export class NativePlatformPlayer<Config = any> extends Playback<Config> {
  public name = 'NativePlatformPlayer';

  private _bufferedPercentage = 0;
  public playbackType = PlaybackType.VOD;

  private _nativeEl: NativePlaybackState;

  constructor(ctx: Context) {
    super(ctx);
    this._nativeEl = this.bridge.getPlaybackState();
  }

  public async load(startTime?: number) {
    await this.setSource(this.controller.getOptions().source);
    this.bridge.postPlayback('load', [startTime]);
  }

  public connectedCallback() {
    // Pass through event playback events
    Object.values(PLAYBACK_EVENT).forEach((eventName) => {
      this.bridge.on(eventName, () => {
        this.emit(eventName);
      });
    });
  }

  public disconnectedCallback() {
    Object.values(PLAYBACK_EVENT).forEach((eventName) => {
      this.bridge.off(eventName, () => {
        this.emit(eventName);
      });
    });
  }

  public get nativeEl(): NativePlaybackState {
    return this.bridge.getPlaybackState();
  }

  public async setSource(src: string) {
    await this.bridge.postPlayback('setSource', [src]);
  }

  public async play() {
    this.emit(PLAYBACK_EVENT.PLAY);
    await this.bridge.postPlayback('play');
  }

  public replay() {
    this.seekTo(0);
    return this.play();
  }

  public async pause() {
    this.emit(PLAYBACK_EVENT.PAUSE);
    await this.bridge.postPlayback('pause');
  }

  public async stop() {
    await this.pause();
    await this.bridge.postPlayback('stop');
  }

  public get autoLevelEnabled() {
    return false;
  }

  public async seekTo(time: number) {
    await this.bridge.postPlayback('seekTo', [time]);
  }

  public seekPercentage(percentage: number) {
    this.bridge.postPlayback('seekPercentage', [percentage]);
  }

  public get volume(): number {
    return this._nativeEl.volume;
  }

  public async setVolume(volume: number) {
    await this.bridge.postPlayback('setVolume', [volume]);
  }

  public get duration(): number {
    return this._nativeEl.duration;
  }

  public get isLive() {
    return this.playbackType === PlaybackType.LIVE;
  }

  public get isMuted(): boolean {
    return this._nativeEl.muted;
  }

  public async mute() {
    await this.bridge.postPlayback('mute');
  }

  public async unmute() {
    await this.bridge.postPlayback('unmute');
  }

  public get playbackRate(): number {
    return this._nativeEl.playbackRate;
  }

  public async setPlaybackRate(playbackRate: number) {
    await this.bridge.postPlayback('setPlaybackRate', [playbackRate]);
  }

  public get currentTime(): number {
    return this._nativeEl.currentTime;
  }

  public get bufferedPercentage() {
    return this._bufferedPercentage;
  }

  public get isPlaying() {
    return !this._nativeEl.paused && !this._nativeEl.ended;
  }

  get hasEnded() {
    return this._nativeEl.ended;
  }

  public get currentLevel(): Level {
    throw new VxdkError('NOT IMPLEMENTED ');
  }

  public get levels(): Level[] {
    this.logger.error('NOT IMPLEMENTED ');
    return [] as Level[];
  }

  public async selectLevel(level: Level | 'auto') {
    await this.bridge.postPlayback('selectLevel', [level]);
  }

  public async selectAudioLanguage(language: string) {
    await this.bridge.postPlayback('selectAudioLanguage', [language]);
  }

  public async syncWithLive() {
    await this.bridge.postPlayback('syncWithLive');
  }

  static canPlay(_: string) {
    return true;
  }
}
