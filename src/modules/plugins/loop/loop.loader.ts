import type { PluginLoader } from '../../common/module';
import { LoopPlugin } from './loop';

export const LoopPluginLoader: PluginLoader = {
  get: () => LoopPlugin,
  isSupported: ({ options }): boolean => options.loop,
};
