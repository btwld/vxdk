import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { useVxdkContext } from '../../providers/ui_context/ui_context';
import { UI_PLUGIN_LOCATION } from '../../ui_interface';
import Spacer from '../atoms/Spacer';

interface DisplayPluginsProps {
  location: UI_PLUGIN_LOCATION;
  spacer?: boolean;
}

export const RenderPlugins: Component<DisplayPluginsProps> = (props) => {
  const { plugins } = useVxdkContext();

  const components = () => {
    if (props.location === UI_PLUGIN_LOCATION.CONTAINER) {
      return plugins.containerPlugins;
    }

    if (props.location === UI_PLUGIN_LOCATION.CONTROL_BAR) {
      return plugins.controlBarPlugins;
    }

    return [] as Component[];
  };
  return (
    <For each={components()}>
      {(Plugin) => (
        <>
          {props.spacer && <Spacer />}
          <Plugin />
        </>
      )}
    </For>
  );
};

export const ContainerPlugins = () => {
  return <RenderPlugins location={UI_PLUGIN_LOCATION.CONTAINER} />;
};

export const PortalPlugins = () => {
  return <RenderPlugins location={UI_PLUGIN_LOCATION.PORTAL} />;
};

export const ControlBarPlugins = () => {
  return (
    <RenderPlugins spacer={true} location={UI_PLUGIN_LOCATION.CONTROL_BAR} />
  );
};
