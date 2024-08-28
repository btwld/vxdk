import type { PluginLoader } from '../../common/module';
import { PersistOptionsPlugin } from './persistOptions';

export const PersistOptionsPluginLoader: PluginLoader = {
  get: () => PersistOptionsPlugin,
  isSupported: (_): boolean => true,
};
