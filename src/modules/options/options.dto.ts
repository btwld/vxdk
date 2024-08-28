import type { Constructor } from '../common/types';

import type { Playback } from '../playback/base_playback';

import type { IPlatformBridgeAdapter } from '../platform/platform_bridge.controller';

/**
 * Enum representing supported languages.
 */
export enum SupportedLanguage {
  /** English language code */
  en = 'en',
}

/**
 * Interface for plugin options.
 */
export interface PluginOptions {
  [key: string]: { [key: string]: any };
}

/**
 * Type representing preload values.
 */
export type PreloadValue = 'none' | 'metadata' | 'auto' | '';

/**
 * Interface representing player options.
 */
export interface Options {
  /** Source URL of the media */
  source: string;

  /** URL of the thumbnails (optional) */
  thumbnails?: string;

  /** URL of the poster image (optional) */
  poster?: string;

  /** Whether the media is muted */
  muted: boolean;

  /** Whether the media should loop */
  loop: boolean;

  /** CORS setting for the media */
  crossOrigin: string;

  /** Whether the media should play inline on mobile devices */
  playsInline: boolean;

  /** Whether to show the user interface */
  showUI: boolean;

  /** Preload behavior for the media */
  preload: PreloadValue;

  /** Language setting for the player */
  language: SupportedLanguage;

  /** Whether debug mode is enabled */
  debug: boolean;

  /** Aspect ratio of the player */
  aspectRatio: number;

  /** Keyboard navigation settings */
  keyboardNavigation: string;

  /** Whether to show controls */
  controls: boolean;

  /** Whether to use native controls */
  nativeControls: boolean;

  /** Whether to autoplay the media */
  autoPlay: boolean;

  /** Volume level of the media */
  volume: number;

  /** Start time of the media in seconds (optional) */
  startTime?: number;

  /** Plugin options */
  plugins: PluginOptions;

  /** Constructor for the playback adapter (optional) */
  playbackAdapter?: Constructor<Playback>;

  /** Constructor for the platform bridge adapter (optional) */
  bridgeAdapter?: Constructor<IPlatformBridgeAdapter>;

  /** Closed captions source or sources */
  closedCaptions: string | string[];
}
