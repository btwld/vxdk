import type { ModuleClass, Plugin } from '../../../common/module';
import type { Controller } from '../../../context/controller';
import { useVxdkController } from './use-controller';

export function useVxdkPlugin<T extends Plugin>(
  plugin: ModuleClass<T> | string,
) {
  return typeof plugin === 'string'
    ? useVxdkController<T>(selectPluginByName(plugin))
    : useVxdkController<T>(selectPlugin(plugin));
}

function selectPlugin<T extends Plugin>(pluginClass: ModuleClass<T>) {
  return (controller: Controller) => {
    return controller.getPlugin<T>(pluginClass);
  };
}

function selectPluginByName<T extends Plugin>(pluginName: string) {
  return (controller: Controller) => {
    return controller.getPluginByName<T>(pluginName);
  };
}
