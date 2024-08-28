import type { Component } from 'solid-js';
import { onCleanup, onMount } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

import type { State } from '@plugins/state/state.dto';
import type { Controller } from '../../../context/controller';

import { cloneDefaultState } from '@plugins/state/state.plugin';
import { CONTEXT_EVENT } from '../../../events/events.dto';
import { UI_PLUGIN_LOCATION } from '../../ui_interface';
export interface UIPluginsStore {
  containerPlugins: Component[];
  controlBarPlugins: Component[];
}

export function createVxdk(controller: Controller) {
  const [state, setState] = createStore<State>(cloneDefaultState());
  const [plugins, setPlugins] = createStore<UIPluginsStore>({
    containerPlugins: [],
    controlBarPlugins: [],
  });

  const reconcileState = () => {
    const contextState = controller.getState();
    setState(reconcile(contextState));
  };

  const reconcilePlugins = () => {
    const uiPlugins = controller.getContext().uiPlugins;

    const containerPlugins = [] as Component[];
    const controlBarPlugins = [] as Component[];

    uiPlugins.forEach((plugin) => {
      if (plugin.renderLocation === UI_PLUGIN_LOCATION.CONTAINER) {
        containerPlugins.push(plugin.render);
      }

      if (plugin.renderLocation === UI_PLUGIN_LOCATION.CONTROL_BAR) {
        controlBarPlugins.push(plugin.render);
      }
    });

    setPlugins(reconcile({ containerPlugins, controlBarPlugins }));
  };

  onMount(() => {
    controller.on(CONTEXT_EVENT.STATE_CHANGED, reconcileState);
    controller.on(CONTEXT_EVENT.PLUGINS_LOADED, reconcilePlugins);
  });

  onCleanup(() => {
    controller.off(CONTEXT_EVENT.STATE_CHANGED, reconcileState);
  });
  return { state, plugins };
}
