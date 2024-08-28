import type { Constructor } from '../common/types';

import type { Playback } from '../playback/base_playback';

import type { IPlatformBridgeAdapter } from '../platform/platform_bridge.controller';
import type { PluginOptions, SupportedLanguage } from './options.dto';
export type PreloadValue = 'none' | 'metadata' | 'auto' | '';
export interface IOptions {
  source: string;
  thumbnails?: string;
  poster?: string;
  muted: boolean;
  loop: boolean;
  crossOrigin: string;
  playsInline: boolean;
  showUI: boolean;
  preload: PreloadValue;
  language: SupportedLanguage;
  debug: boolean;
  aspectRatio: number;
  keyboardNavigation: string;
  controls: boolean;
  nativeControls: boolean;
  autoPlay: boolean;
  volume: number;
  startTime?: number;
  plugins: PluginOptions;
  playbackAdapter?: Constructor<Playback>;
  bridgeAdapter?: Constructor<IPlatformBridgeAdapter>;
  closedCaptions: string | string[];
}
