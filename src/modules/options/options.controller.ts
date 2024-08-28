import type { Constructor } from '../common/types';

import type { Playback } from '../playback/base_playback';

import type { Options, PluginOptions, SupportedLanguage } from './options.dto';

export class OptionsController implements Options {
  private constructor(private _options: Options) {}

  static create(options: Partial<Options>): OptionsController {
    const mergedOptions = {
      ...OptionsController.defaults,
      ...options,
    } as Options;
    return new OptionsController(mergedOptions);
  }

  public get options(): Options {
    return this._options;
  }

  public get source(): string {
    return this._options.source;
  }

  public get thumbnails(): string | undefined {
    return this._options.thumbnails;
  }
  public get poster(): string | undefined {
    return this._options.poster;
  }

  public get muted(): boolean {
    return this._options.muted;
  }

  public get loop(): boolean {
    return this._options.loop;
  }

  public get crossOrigin(): string {
    return this._options.crossOrigin;
  }

  public get showUI(): boolean {
    return this._options.showUI;
  }

  public get playsInline(): boolean {
    return this._options.playsInline;
  }

  public get preload() {
    return this._options.preload;
  }

  public get language(): SupportedLanguage {
    return this._options.language;
  }

  public get debug(): boolean {
    return this._options.debug;
  }

  public get aspectRatio(): number {
    return this._options.aspectRatio;
  }

  public get keyboardNavigation(): string {
    return this._options.keyboardNavigation;
  }

  public get controls(): boolean {
    return this._options.controls;
  }

  public get nativeControls(): boolean {
    return this._options.nativeControls;
  }
  public get autoPlay(): boolean {
    return this._options.autoPlay;
  }

  public get volume(): number {
    return this._options.volume;
  }

  public get startTime(): number | undefined {
    return this._options.startTime;
  }

  public get plugins(): PluginOptions {
    return this._options.plugins;
  }

  public get playbackAdapter(): Constructor<Playback> | undefined {
    return this._options.playbackAdapter;
  }

  public get closedCaptions(): string | string[] {
    return this._options.closedCaptions;
  }

  static defaults: Partial<Options> = {
    volume: 0.5,
    debug: false,
    aspectRatio: 16 / 9,
    controls: true,
    loop: false,
    showUI: true,
    autoPlay: false,
    playsInline: true,
    crossOrigin: 'anonymous',
    nativeControls: false,
    preload: 'metadata',
    plugins: {},
    keyboardNavigation: 'focus',
    closedCaptions: [],
  };
}
