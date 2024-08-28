import type { PluginLoader } from '../../common/module';
import { KeyboardNavigationPlugin } from './keyboard';

export const KeyboardNavigationPluginLoader: PluginLoader = {
  get: () => KeyboardNavigationPlugin,
  isSupported: ({ options }): boolean => !!options.keyboardNavigation,
};
