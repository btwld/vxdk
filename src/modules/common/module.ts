import type { Context } from '../context/context';

import type { Playback } from '../playback/base_playback';
import type { UiPlugin } from '../ui/ui_interface';
import { Hook } from './hooks';
import { Logger } from './utils';

/**
 * Enum representing different types of plugins
 */
export enum PluginType {
  PLUGIN = 'PLUGIN',
  PLAYBACK = 'PLAYBACK',
  UI_PLUGIN = 'UI_PLUGIN',
}

/**
 * Abstract base class for all modules
 */
export abstract class Module {
  public abstract name: string;
  public hooks = new Hook(this);

  /**
   * Callback method called when the module is connected
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public connectedCallback() {}

  /**
   * Callback method called when the module is disconnected
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public disconnectedCallback() {}

  /**
   * Protected getter for the logger instance
   * @returns {Logger} Logger instance for this module
   */
  protected get logger() {
    return new Logger(this.name);
  }
}

/**
 * Abstract base class for all plugins, extending Module
 */
export abstract class Plugin<Config = any> extends Module {
  public readonly type: PluginType = PluginType.PLUGIN;

  /**
   * Constructor for the Plugin class
   * @param ctx - The VxdkContext instance
   */
  constructor(private readonly ctx: Context) {
    super();
    this.registerEvents();
  }

  /**
   * Protected method to get the plugin configuration
   * @returns {Config} The plugin configuration
   */
  protected getConfig = (): Config => {
    return (this.ctx.options.plugins[this.name] ?? {}) as Config;
  };

  /**
   * Protected getter for the storage instance
   */
  protected get storage() {
    return this.ctx.storage;
  }

  /**
   * Protected getter for the controller instance
   */
  protected get controller() {
    return this.ctx.controller;
  }

  /**
   * Protected getter for the bridge instance
   */
  protected get bridge() {
    return this.ctx.bridge;
  }

  /**
   * Protected getter for the 'on' event binding method
   */
  protected get on() {
    return this.ctx.on.bind(this.ctx);
  }

  /**
   * Protected getter for the 'off' event unbinding method
   */
  protected get off() {
    return this.ctx.off.bind(this.ctx);
  }

  /**
   * Protected getter for the 'once' event binding method
   */
  protected get once() {
    return this.ctx.once.bind(this.ctx);
  }

  /**
   * Protected getter for the events array
   * @returns {string[]} Array of event names
   */
  protected get events(): string[] {
    return [];
  }

  /**
   * Private method to register events
   */
  private registerEvents() {
    this.ctx.registerEvents.bind(this.ctx)(this.events);
  }

  /**
   * Protected getter for the 'emit' event emission method
   */
  protected get emit() {
    return this.ctx.emit.bind(this.ctx);
  }

  /**
   * Protected getter for the 'emitIfChanged' event emission method
   */
  protected get emitIfChanged() {
    return this.ctx.emitIfChanged.bind(this.ctx);
  }
}

/**
 * Type definition for a module class constructor
 */
export type ModuleClass<T = Module> = new (ctx: Context) => T;

/**
 * Type definition for a plugin class constructor
 */
export type PluginClass = ModuleClass<Plugin>;

/**
 * Type definition for a UI plugin class constructor
 */
export type UiPluginClass = ModuleClass<UiPlugin>;

/**
 * Interface for a playback class, extending ModuleClass
 */
export interface PlaybackClass extends ModuleClass<Playback> {
  canPlay(url: string): boolean;
}

/**
 * Interface for a module loader
 */
export interface ModuleLoader<T = Module> {
  get(ctx: Context): Promise<ModuleClass<T>> | ModuleClass<T>;
  isSupported(context: Context, isSupportedArgs?: any): boolean;
}

/**
 * Type definition for a plugin loader
 */
export type PluginLoader = ModuleLoader<Plugin>;

/**
 * Type definition for a playback loader
 */
export type PlaybackLoader = ModuleLoader<Playback>;
