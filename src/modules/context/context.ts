import { VxdkError } from '../common/error';
import type { ModuleClass, Plugin } from '../common/module';
import { PluginType } from '../common/module';
import { PluginRegistry } from '../common/plugin';
import { FunctionUtils, generateShortId } from '../common/utils';
import { getVersion } from '../common/utils/get-version';

import { createVxdkEvents, EventController } from '../events/event.controller';
import { CONTEXT_EVENT } from '../events/events.dto';
import { OptionsController } from '../options/options.controller';
import type { Options } from '../options/options.dto';
import type { Playback } from '../playback/base_playback';
import { StatePlugin } from '../plugins/state/state.plugin';

import { UIController } from '../ui/ui_controller';
import type { UiPlugin } from '../ui/ui_interface';
import { Controller } from './controller';

import { PlatformBridgeController } from '../platform/platform_bridge.controller';
import { StorageController } from '../storage/storage.controller';

/**
 * VxdkContext class that manages the overall context of the video player
 */
export class Context extends EventController {
  #playback!: Playback;

  /** Platform bridge controller */
  public readonly bridge: PlatformBridgeController;

  /** Unique identifier for this context */
  public readonly id: string;

  readonly #controller: Controller;
  readonly #ui: UIController;
  readonly #storage: StorageController;

  #plugins: Plugin[] = [];

  /**
   * The initial player options.
   * @type {OptionsController}
   */
  #options: OptionsController;

  /**
   * Initializes a new VxdkContext
   * @param element - The HTML element to attach the player to
   * @param options - The initial options for the player
   * @returns {Context} A new VxdkContext instance
   */
  static init(element: HTMLElement, options: Partial<Options>): Context {
    return new Context(element, options);
  }

  /**
   * Constructor for VxdkContext
   * @param $selector - The HTML element to attach the player to
   * @param options - The initial options for the player
   */
  constructor($selector: HTMLElement, options: Partial<Options>) {
    const optionsController = OptionsController.create(options);

    super(createVxdkEvents());
    this.emit(CONTEXT_EVENT.INITIALIZING);

    this.id = generateShortId();
    this.#options = optionsController;

    this.bridge = PlatformBridgeController.create(options);

    this.#storage = StorageController.create(this.bridge);
    this.#controller = Controller.create(this);

    // Initialize UI controller before any other module
    this.#ui = UIController.create($selector, this.#controller);

    // Load playback
    this._loadModules();
  }

  /**
   * Gets the current options
   * @returns {OptionsController} The current options controller
   */
  public get options(): OptionsController {
    return this.#options;
  }

  /**
   * Gets the storage controller
   * @returns {StorageController} The storage controller
   */
  public get storage(): StorageController {
    return this.#storage;
  }

  /**
   * Gets the VxdkController instance
   * @returns {Controller} The VxdkController instance
   */
  public get controller(): Controller {
    return this.#controller;
  }

  /**
   * Loads all necessary modules
   * @private
   */
  private _loadModules = async () => {
    this.#playback = await this._loadPlayback();
    this.emit(CONTEXT_EVENT.PLAYBACK_ADAPTER_LOADED);

    this.#plugins = await this._loadPlugins();
    this.emit(CONTEXT_EVENT.PLUGINS_LOADED);

    this._loadStorage();
    this.emit(CONTEXT_EVENT.STORAGE_LOADED);

    this._connect();

    this.emit(CONTEXT_EVENT.READY);
  };

  /**
   * Loads the storage
   * @private
   */
  private _loadStorage = async () => {
    await this.storage.load();
  };

  /**
   * Loads all plugins
   * @private
   * @returns {Promise<Plugin[]>} A promise that resolves to an array of loaded plugins
   */
  private _loadPlugins = async (): Promise<Plugin[]> => {
    await PluginRegistry.loadPlugins(this);
    const pluginClasses = PluginRegistry.getPlugins();
    const plugins = pluginClasses.map((pluginClass) => new pluginClass(this));

    return plugins;
  };

  /**
   * Loads the playback module
   * @private
   * @returns {Promise<Playback>} A promise that resolves to the loaded Playback instance
   */
  private _loadPlayback = async (): Promise<Playback> => {
    await PluginRegistry.loadPlayback(this);
    const playbackClass = PluginRegistry.getPlayback(this.options.source);
    const playback = new playbackClass(this);

    return playback;
  };

  /**
   * Sets new options for the player
   * @param options - The new options to set
   */
  public setOptions = (options: Partial<Options>): void => {
    this.#options = OptionsController.create({
      ...this.#options,
      ...options,
    });

    this.emit(CONTEXT_EVENT.OPTIONS_CHANGED);
    this._reboot();
  };

  /**
   * Gets the current playback instance
   * @returns {Playback} The current playback instance
   */
  public get playback(): Playback {
    return this.#playback;
  }

  /**
   * Gets the UI container element
   * @returns {HTMLElement} The UI container element
   */
  public get $uiContainer(): HTMLElement {
    return this.#ui.$container;
  }

  /**
   * Gets all loaded plugins
   * @returns {Plugin[]} An array of all loaded plugins
   */
  public get plugins(): Plugin[] {
    return this.#plugins;
  }

  /**
   * Gets all UI plugins
   * @returns {UiPlugin[]} An array of all UI plugins
   */
  public get uiPlugins(): UiPlugin[] {
    return this.#plugins.filter(
      (plugin) => plugin.type === PluginType.UI_PLUGIN,
    ) as UiPlugin[];
  }

  /**
   * Connects all plugins and playback
   * @private
   */
  private _connect = () => {
    this.playback.connectedCallback();
    Object.values(this.plugins).forEach((ext) => ext.connectedCallback());
    this.emit(CONTEXT_EVENT.PLUGINS_CONNECTED);
  };

  /**
   * Disconnects all plugins and playback
   * @private
   */
  private _disconnect = () => {
    this.playback.disconnectedCallback();
    Object.values(this.plugins).forEach((ext) => ext.disconnectedCallback());
    this.emit(CONTEXT_EVENT.PLUGINS_DISCONNECTED);
  };

  /**
   * Reboots the player by disconnecting and reconnecting
   * @private
   */
  private _reboot = () => {
    this._disconnect();
    FunctionUtils.defer(() => this._connect());
  };

  /**
   * Destroys the player instance
   */
  public destroy = () => {
    this.emit(CONTEXT_EVENT.DESTROY);
    this._disconnect();
    this.#ui.dispose();
    FunctionUtils.defer(() => this.unregisterEvents());
  };

  /**
   * Gets the current state of the player
   * @returns {StatePlugin['state']} The current state
   */
  public get state(): StatePlugin['state'] {
    return this.getPlugin(StatePlugin).state;
  }

  /**
   * Gets the version of the player
   * @returns {string} The version string
   */
  public get version(): string {
    return getVersion();
  }

  /**
   * Gets a plugin by its name
   * @template T
   * @param {string} name - The name of the plugin
   * @returns {T} The plugin instance
   * @throws {VxdkError} If the plugin is not found
   */
  public getPluginByName = <T extends Plugin>(name: string): T => {
    const plugin = this.#plugins.find((plugin) => {
      return plugin.name === name;
    }) as T;

    if (!plugin) {
      // TODO: improve error handling overall
      throw new VxdkError(`No plugin with ${name} found.`);
    }

    return plugin;
  };

  /**
   * Gets a plugin by its class
   * @template T
   * @param {ModuleClass<T>} pluginClass - The class of the plugin
   * @returns {T} The plugin instance
   * @throws {VxdkError} If the plugin is not found
   */
  public getPlugin = <T extends Plugin>(pluginClass: ModuleClass<T>): T => {
    const plugin = this.#plugins.find((plugin) => {
      return plugin instanceof pluginClass;
    }) as T;

    if (!plugin) {
      // TODO: improve error handling overall
      throw new VxdkError(`No plugin with ${pluginClass.name} found`);
    }

    return plugin;
  };
}
