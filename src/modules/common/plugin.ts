/* eslint-disable no-inner-declarations */
import type { Context } from '../context/context';
import { HlsJsPlayerLoader } from '../playback/hlsjs/hls.loader';
import { HTML5Player } from '../playback/html5';

import { AirPlayPluginLoader } from '@plugins/airplay/airplay_loader';
import { AutoPlayPluginLoader } from '@plugins/autoplay/autoplay_loader';
import { YoutubePlayerLoader } from '../playback/youtube/youtube.loader';

import { DimensionsPlugin } from '@plugins/dimensions/dimensions';
import { FullscreenPlugin } from '@plugins/fullscreen/fullscreen';
import { PersistOptionsPluginLoader } from '@plugins/persistOptions/persistOptions.loader';

import { LoadPlugin } from '@plugins/load/load.plugin';
import { LoopPluginLoader } from '@plugins/loop/loop.loader';
import { PipPluginLoader } from '@plugins/pip/pip.loader';
import { StatePlugin } from '@plugins/state/state.plugin';
import { DefaultUI } from '@ui/plugins/default_ui';
import { StartView } from '@ui/plugins/start_view/start_view';

import { KeyboardNavigationPluginLoader } from '@plugins/keyboard/keyboard.loader';
import type {
  Module,
  ModuleClass,
  ModuleLoader,
  PlaybackClass,
  PlaybackLoader,
  PluginClass,
  PluginLoader,
} from './module';

export namespace PluginRegistry {
  const playbackRegistry: PlaybackClass[] = [HTML5Player];

  const playbackLoaderRegistry: PlaybackLoader[] = [
    HlsJsPlayerLoader,
    YoutubePlayerLoader,
  ];

  const pluginLoaderRegistry: PluginLoader[] = [
    PipPluginLoader,
    KeyboardNavigationPluginLoader,
    LoopPluginLoader,
    AutoPlayPluginLoader,
    AirPlayPluginLoader,
    PersistOptionsPluginLoader,
  ];

  const pluginRegistry: PluginClass[] = [
    DefaultUI,
    StartView,
    LoadPlugin,
    FullscreenPlugin,
    DimensionsPlugin,
    StatePlugin,
  ];

  export async function loadPlayback(
    context: Context,
    isSupportedArgs?: any,
  ): Promise<void> {
    await _loadAddToRegistry(
      context,
      playbackLoaderRegistry,
      playbackRegistry,
      isSupportedArgs,
    );
  }

  export async function loadPlugins(
    context: Context,
    isSupportedArgs?: any,
  ): Promise<void> {
    await _loadAddToRegistry(
      context,
      pluginLoaderRegistry,
      pluginRegistry,
      isSupportedArgs,
    );
  }

  async function _loadAddToRegistry<T extends Module>(
    context: Context,
    loaders: ModuleLoader[],
    registry: ModuleClass<T>[],
    isSupportedArgs?: any,
  ): Promise<void> {
    const promises: Promise<ModuleClass<T>>[] = [];

    for (const loader of loaders) {
      if (loader.isSupported(context, isSupportedArgs)) {
        const moduleInstance = loader.get(context);
        promises.push(moduleInstance as Promise<ModuleClass<T>>);
      }
    }

    const modules = await Promise.all(promises);

    modules.forEach((module) => {
      // Load if not currently registered

      if (!registry.includes(module)) {
        registry.unshift(module);
      }
    });
  }

  export function getPlugins(): PluginClass[] {
    return pluginRegistry;
  }

  export function getPlayback(source: string): PlaybackClass {
    const playback = playbackRegistry.find((playback) =>
      playback.canPlay(source),
    );

    if (!playback) {
      throw new Error(`No playback found for source ${source}`);
    }

    return playback;
  }

  export function registerPlugin(plugin: PluginClass) {
    pluginRegistry.unshift(plugin);
  }

  export function registerPluginLoader(loader: PluginLoader) {
    pluginLoaderRegistry.unshift(loader);
  }

  export function registerPlayback(playback: PlaybackClass) {
    playbackRegistry.unshift(playback);
  }

  export function registerPlaybackLoader(loader: PlaybackLoader) {
    playbackLoaderRegistry.unshift(loader);
  }
}
