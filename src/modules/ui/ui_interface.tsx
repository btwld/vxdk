import type { Component } from 'solid-js';
import { Plugin, PluginType } from '../common/module';


/**
 * Enum representing the different locations where a UI plugin can be rendered.
 */
export enum UI_PLUGIN_LOCATION {
  CONTAINER = 'CONTAINER',
  CONTROL_BAR = 'CONTROL_BAR',
  PORTAL = 'PORTAL',
}

/**
 * Abstract base class for UI plugins.
 * @template Config - The type of the plugin configuration.
 */
export abstract class UiPlugin<Config = any> extends Plugin<Config> {
  public readonly type = PluginType.UI_PLUGIN;
  public readonly order: number = 0;
  public readonly minSupportedVersion = '0.0.0';
  /**
   * The location where the plugin should be rendered.
   */
  abstract renderLocation: UI_PLUGIN_LOCATION;
  /**
   * The component to render for the plugin.
   */
  abstract render: Component;
}

/**
 * Abstract base class for UI container plugins.
 * @template Config - The type of the plugin configuration.
 */
export abstract class UiContainerPlugin<Config = any> extends UiPlugin<Config> {
  public readonly renderLocation = UI_PLUGIN_LOCATION.CONTAINER;
}

/**
 * Abstract base class for UI portal plugins.
 * @template Config - The type of the plugin configuration.
 */
export abstract class UiPortalPlugin<Config = any> extends UiPlugin<Config> {
  public readonly renderLocation = UI_PLUGIN_LOCATION.PORTAL;
  /**
   * Mounts the plugin and returns the mounted element.
   * @returns The mounted element or null.
   */
  abstract mount(): HTMLElement | Node | null;
}

/**
 * Abstract base class for UI control bar plugins.
 * @template Config - The type of the plugin configuration.
 */
export abstract class UiControlBarPlugin<
  Config = any,
> extends UiPlugin<Config> {
  public readonly renderLocation = UI_PLUGIN_LOCATION.CONTROL_BAR;
}
