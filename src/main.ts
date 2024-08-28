import { PluginRegistry } from '@common/plugin';
import { getVersion } from '@common/utils/get-version';
import { Window as window } from '@common/utils/server_safe_globals';
import { Context } from './modules/context/context';

import type { NextFn } from '@common/hooks';
import type { PluginLoader } from '@common/module';
import { Plugin } from '@common/module';
import type { Disposable, Listener } from '@common/types';
import { BrowserUtils } from '@common/utils';
import type { State } from '@plugins/state/state.dto';
import { Controller } from './modules/context/controller';
import { CONTEXT_EVENT, PLAYBACK_EVENT } from './modules/events/events.dto';
import type { Options } from './modules/options/options.dto';
import { Playback } from './modules/playback/base_playback';
import { HTML5Player } from './modules/playback/html5';
import type { Level, PlaybackType } from './modules/playback/playback_types';

import type { StorageRequest } from './modules/platform/comm/storage_request';

export {
  BrowserUtils,
  Context,
  CONTEXT_EVENT,
  Controller,
  Disposable,
  HTML5Player,
  Level,
  Listener,
  NextFn,
  Options,
  Playback,
  PLAYBACK_EVENT,
  PlaybackType,
  Plugin,
  PluginLoader,
  StorageRequest,
};
export type { State };

declare global {
  interface Window {
    Vxdk: typeof Vxdk;
    VxdkInstances: { [key: string]: Controller };
  }
}

const globalWindow = window as any;
globalWindow.VxdkInstances = {};

const Vxdk = {
  init: (el: HTMLElement, options: Partial<Options>) => {
    const context = Context.init(el, options);
    globalWindow.VxdkInstances[context.id] = context.controller;
    return context.controller;
  },
  version: getVersion(),
  getById: (id: string) => {
    return globalWindow.VxdkInstances[id];
  },

  get: () => {
    return globalWindow.VxdkInstances[
      Object.keys(globalWindow.VxdkInstances)[0]
    ];
  },

  registerPlugin: PluginRegistry.registerPlugin,
  registerPlayback: PluginRegistry.registerPlayback,
  registerPlaybackLoader: PluginRegistry.registerPlaybackLoader,
  registerPluginLoader: PluginRegistry.registerPluginLoader,
};

// Set up the Vxdk global object
globalWindow.Vxdk = Vxdk;

export default Vxdk;
