import type { PluginLoader } from '../../common/module';
import { AutoplayPlugin } from './autoplay';

export const AutoPlayPluginLoader: PluginLoader = {
  get: () => AutoplayPlugin,
  isSupported: ({ options }): boolean => options.autoPlay,
};
