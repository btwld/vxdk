/**
 * Enum representing playback events.
 * @enum {string}
 * @category Events
 */
export enum PLAYBACK_EVENT {
  /** Fired when the browser has started to load the resource */
  LOADSTART = 'playback.loadstart',
  /** Fired when the metadata has been loaded */
  LOADEDMETADATA = 'playback.loadedmetadata',
  /** Fired when playback has begun */
  PLAY = 'playback.play',
  /** Fired when playback has been paused */
  PAUSE = 'playback.pause',
  /** Fired when playback is ready to start after having been paused or delayed due to lack of data */
  PLAYING = 'playback.playing',
  /** Fired when playback has stopped because the end of the media was reached */
  ENDED = 'playback.ended',
  /** Fired when the time indicated by the currentTime attribute has been updated */
  TIMEUPDATE = 'playback.timeupdate',
  /** Fired when the duration attribute has been updated */
  DURATION_CHANGED = 'playback.duration.changed',
  /** Fired when playback has stopped because of a temporary lack of data */
  WAITING = 'playback.waiting',
  /** Fired when the player instance is destroyed */
  DESTROY = 'playback.destroy',
  /** Fired when an error occurred while fetching the media data, or the type of the resource is not a supported media format */
  ERROR = 'playback.error',
  /** Fired when the volume has changed */
  VOLUME_CHANGED = 'playback.volume.changed',
  /** Fired when the amount of buffered media changes */
  BUFFERED_CHANGED = 'playback.buffered.changed',
  /** Fired when the playback rate has changed */
  PLAYBACKRATE_CHANGE = 'playback.playbackrate.change',
  /** Fired when the automatic quality level changes */
  AUTOLEVEL_CHANGED = 'playback.autoLevel.changed',
  /** Fired when the available quality levels are loaded */
  LEVELS_LOADED = 'playback.levels.loaded',
  /** Fired when the current quality level changes */
  LEVEL_CHANGED = 'playback.level.changed',
  /** Fired when the audio track changes */
  AUDIO_CHANGED = 'playback.audio.changed',
}

/**
 * Enum representing context events.
 * @enum {string}
 * @category Events
 */
export enum CONTEXT_EVENT {
  /** Fired when the context is initializing */
  INITIALIZING = 'context.initializing',
  /** Fired when all plugins are loaded */
  PLUGINS_LOADED = 'context.plugins.loaded',
  /** Fired when plugins are connected */
  PLUGINS_CONNECTED = 'context.plugins.connected',
  /** Fired when plugins are disconnected */
  PLUGINS_DISCONNECTED = 'context.plugins.disconnected',
  /** Fired when the playback adapter is loaded */
  PLAYBACK_ADAPTER_LOADED = 'context.playback.adapter.loaded',
  /** Fired when the storage is loaded */
  STORAGE_LOADED = 'context.storage.loaded',
  /** Fired when the context is ready */
  READY = 'context.ready',
  /** Fired when the dimensions of the player change */
  DIMENSION_CHANGED = 'context.dimension.changed',
  /** Fired when the fullscreen state changes */
  FULLSCREEN_CHANGED = 'context.fullscreen.changed',
  /** Fired when the picture-in-picture state changes */
  PIP_CHANGED = 'context.pip.changed',
  /** Fired when the context is destroyed */
  DESTROY = 'context.destroy',
  /** Fired when the state of the context changes */
  STATE_CHANGED = 'context.state.changed',
  /** Fired when the options of the context change */
  OPTIONS_CHANGED = 'context.options.changed',
}

/**
 * Enum representing bridge events.
 * @enum {string}
 * @category Events
 */
export enum BRIDGE_EVENT {
  /** Fired when a message is received from the bridge */
  MESSAGE = 'bridge.message',
}
