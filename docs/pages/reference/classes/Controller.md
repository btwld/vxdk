# Class: Controller

VXDK Controller class that exposes all public APIs for video playback control

## Properties

### hook

> **hook**: `Hook`\<[`Controller`](Controller.md)\>

Hook for extending controller functionality

#### Defined in

[modules/context/controller.ts:18](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L18)

## Accessors

### emit

> `get` **emit**(): (`name`, `data`?) => `void`

Emits an event

#### Returns

`Function`

The function to emit an event

##### Parameters

• **name**: `string` \| `number`

• **data?**: `undefined`

##### Returns

`void`

#### Defined in

[modules/context/controller.ts:169](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L169)

***

### off

> `get` **off**(): (`name`, `listener`) => `void`

Removes an event listener

#### Returns

`Function`

The function to remove the event listener

##### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

##### Returns

`void`

#### Defined in

[modules/context/controller.ts:153](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L153)

***

### on

> `get` **on**(): (`name`, `listener`) => [`Disposable`](../interfaces/Disposable.md)

Binds an event listener

#### Returns

`Function`

The bound event listener function

##### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

##### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Defined in

[modules/context/controller.ts:145](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L145)

***

### once

> `get` **once**(): (`name`, `listener`) => `void`

Binds a one-time event listener

#### Returns

`Function`

The bound one-time event listener function

##### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

##### Returns

`void`

#### Defined in

[modules/context/controller.ts:161](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L161)

## Methods

### destroy()

> **destroy**(): `void`

Destroys the player instance and releases resources

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:427](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L427)

***

### enterFullscreen()

> **enterFullscreen**(): `void`

Enters fullscreen mode

#### Returns

`void`

#### Throws

If the fullscreen API is not supported or permission is denied

#### Defined in

[modules/context/controller.ts:329](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L329)

***

### enterPip()

> **enterPip**(): `Promise`\<`void`\>

Enters picture-in-picture mode

#### Returns

`Promise`\<`void`\>

#### Defined in

[modules/context/controller.ts:354](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L354)

***

### exitFullscreen()

> **exitFullscreen**(): `void`

Exits fullscreen mode

#### Returns

`void`

#### Throws

If the fullscreen API is not supported or the document is not in fullscreen mode

#### Defined in

[modules/context/controller.ts:336](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L336)

***

### exitPip()

> **exitPip**(): `Promise`\<`void`\>

Exits picture-in-picture mode

#### Returns

`Promise`\<`void`\>

#### Defined in

[modules/context/controller.ts:359](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L359)

***

### getAutoPlay()

> **getAutoPlay**(): `boolean`

Checks if autoplay is enabled

#### Returns

`boolean`

true if autoplay is enabled, false otherwise

#### Defined in

[modules/context/controller.ts:193](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L193)

***

### getBufferedPercentage()

> **getBufferedPercentage**(): `number`

Gets the percentage of the video that has been buffered

#### Returns

`number`

The buffered percentage (0-100)

#### Defined in

[modules/context/controller.ts:309](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L309)

***

### getContext()

> **getContext**(): [`Context`](Context.md)

Gets the context of the player

#### Returns

[`Context`](Context.md)

The context object

#### Defined in

[modules/context/controller.ts:422](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L422)

***

### getCurrentLevel()

> **getCurrentLevel**(): [`Level`](../interfaces/Level.md)

Gets the current quality level

#### Returns

[`Level`](../interfaces/Level.md)

The current quality level

#### Defined in

[modules/context/controller.ts:284](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L284)

***

### getCurrentTime()

> **getCurrentTime**(): `number`

Gets the current playback time

#### Returns

`number`

The current time in seconds

#### Defined in

[modules/context/controller.ts:290](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L290)

***

### getDuration()

> **getDuration**(): `number`

Gets the total duration of the video

#### Returns

`number`

The duration in seconds

#### Defined in

[modules/context/controller.ts:278](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L278)

***

### getHeight()

> **getHeight**(): `number`

Gets the current height of the player

#### Returns

`number`

The height of the player in pixels

#### Defined in

[modules/context/controller.ts:387](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L387)

***

### getLevels()

> **getLevels**(): [`Level`](../interfaces/Level.md)[]

Gets the available quality levels

#### Returns

[`Level`](../interfaces/Level.md)[]

An array of available quality levels

#### Defined in

[modules/context/controller.ts:303](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L303)

***

### getOptions()

> **getOptions**(): [`Options`](../interfaces/Options.md)

Retrieves the current options from the context.

#### Returns

[`Options`](../interfaces/Options.md)

The current options object.

#### Defined in

[modules/context/controller.ts:416](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L416)

***

### getPlaybackAdapter()

> **getPlaybackAdapter**(): [`Playback`](Playback.md)\<`any`\>

Gets the playback adapter

#### Returns

[`Playback`](Playback.md)\<`any`\>

The playback adapter instance

#### Defined in

[modules/context/controller.ts:273](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L273)

***

### getPlaybackRate()

> **getPlaybackRate**(): `number`

Gets the current playback rate

#### Returns

`number`

The current playback rate

#### Defined in

[modules/context/controller.ts:256](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L256)

***

### getPlaybackType()

> **getPlaybackType**(): [`PlaybackType`](../enumerations/PlaybackType.md)

Gets the current playback type

#### Returns

[`PlaybackType`](../enumerations/PlaybackType.md)

The playback type

#### Defined in

[modules/context/controller.ts:264](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L264)

***

### getPlugin()

> **getPlugin**\<`T`\>(`plugin`): `T`

Retrieves a plugin instance of the specified type.

#### Type Parameters

• **T** *extends* [`Plugin`](Plugin.md)\<`any`\>

The type of the plugin that extends the `Plugin` base class.

#### Parameters

• **plugin**: `ModuleClass`\<`T`\>

The class of the plugin to retrieve.

#### Returns

`T`

The plugin instance of the specified type.

#### Defined in

[modules/context/controller.ts:396](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L396)

***

### getPluginByName()

> **getPluginByName**\<`T`\>(`name`): `T`

Retrieves a plugin instance by its name.

#### Type Parameters

• **T** *extends* [`Plugin`](Plugin.md)\<`any`\>

The type of the plugin that extends the `Plugin` base class.

#### Parameters

• **name**: `string`

The name of the plugin to retrieve.

#### Returns

`T`

The plugin instance of the specified type.

#### Defined in

[modules/context/controller.ts:407](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L407)

***

### getRootElement()

> **getRootElement**(): `HTMLElement`

Gets the root element of the player

#### Returns

`HTMLElement`

The root HTMLElement of the player

#### Defined in

[modules/context/controller.ts:375](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L375)

***

### getState()

> **getState**(): [`State`](../interfaces/State.md)

Gets the current state of the player

#### Returns

[`State`](../interfaces/State.md)

The current state object

#### Defined in

[modules/context/controller.ts:316](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L316)

***

### getVersion()

> **getVersion**(): `string`

Retrieves the current version of the video player.

#### Returns

`string`

The version string of the video player.

#### Defined in

[modules/context/controller.ts:102](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L102)

***

### getVolume()

> **getVolume**(): `number`

Gets the current volume level

#### Returns

`number`

The current volume level (0-1)

#### Defined in

[modules/context/controller.ts:187](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L187)

***

### getWidth()

> **getWidth**(): `number`

Gets the current width of the player

#### Returns

`number`

The width of the player in pixels

#### Defined in

[modules/context/controller.ts:381](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L381)

***

### isAutoLevelEnabled()

> **isAutoLevelEnabled**(): `boolean`

Checks if auto-level selection is enabled

#### Returns

`boolean`

true if auto-level is enabled, false otherwise

#### Defined in

[modules/context/controller.ts:296](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L296)

***

### isFullscreen()

> **isFullscreen**(): `boolean`

Checks if the player is in fullscreen mode

#### Returns

`boolean`

true if in fullscreen, false otherwise

#### Defined in

[modules/context/controller.ts:342](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L342)

***

### isLive()

> **isLive**(): `boolean`

Checks if the current playback is a live stream

#### Returns

`boolean`

true if live, false otherwise

#### Defined in

[modules/context/controller.ts:322](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L322)

***

### isMuted()

> **isMuted**(): `boolean`

Checks if the playback is currently muted

#### Returns

`boolean`

true if muted, false otherwise

#### Defined in

[modules/context/controller.ts:211](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L211)

***

### isPip()

> **isPip**(): `boolean`

Checks if the player is in picture-in-picture mode

#### Returns

`boolean`

true if in PiP mode, false otherwise

#### Defined in

[modules/context/controller.ts:365](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L365)

***

### isPlaying()

> **isPlaying**(): `boolean`

Checks if the video is currently playing.

#### Returns

`boolean`

`true` if the video is currently playing, otherwise `false`.

#### Defined in

[modules/context/controller.ts:93](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L93)

***

### load()

> **load**(): `void`

Loads the video source into the playback system.

This method initializes the playback by loading the video from the start time specified in the context.

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:43](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L43)

***

### mute()

> **mute**(): `void`

Mutes the playback

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:215](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L215)

***

### pause()

> **pause**(): `void`

Pauses video playback.

This method stops the video from playing but retains the current playback position.

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:109](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L109)

***

### play()

> **play**(): `void` \| `Promise`\<`void`\>

Starts or resumes video playback.
A promise that resolves when playback starts, or void if synchronous.

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[modules/context/controller.ts:60](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L60)

***

### replay()

> **replay**(): `void` \| `Promise`\<`void`\>

Replays the video from the beginning.

This method resets the playback to the start and begins playing the video from the beginning.

#### Returns

`void` \| `Promise`\<`void`\>

A promise that resolves when playback starts, or void if synchronous.

#### Defined in

[modules/context/controller.ts:84](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L84)

***

### seekTo()

> **seekTo**(`time`): `void`

Seeks to a specific time in the video.

#### Parameters

• **time**: `number`

The time position to seek to, in seconds.

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:127](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L127)

***

### seekToPercentage()

> **seekToPercentage**(`percentage`): `void`

Seeks to a specific percentage of the video's total duration.

#### Parameters

• **percentage**: `number`

The percentage of the video duration to seek to (value between 0 and 100).

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:136](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L136)

***

### selectAudioLanguage()

> **selectAudioLanguage**(`language`): `void`

Selects the audio language for playback

#### Parameters

• **language**: `string`

The language code to select

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:240](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L240)

***

### setLevel()

> **setLevel**(`level`): `void`

Sets the quality level for playback

#### Parameters

• **level**: `"auto"` \| [`Level`](../interfaces/Level.md)

The quality level to set, or 'auto' for automatic

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:232](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L232)

***

### setPlaybackRate()

> **setPlaybackRate**(`playbackRate`): `void`

Sets the playback rate

#### Parameters

• **playbackRate**: `number`

The playback rate (e.g., 1.0 for normal speed)

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:248](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L248)

***

### setSource()

> **setSource**(`src`): `void`

Sets the video source URL for playback.

#### Parameters

• **src**: `string`

The URL of the video source to be played.

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:52](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L52)

***

### setVolume()

> **setVolume**(`volume`): `void`

Sets the volume of the playback

#### Parameters

• **volume**: `number`

The volume level (0-1)

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:177](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L177)

***

### stop()

> **stop**(): `void`

Stops video playback entirely.

This method stops the video and resets the playback position to the start.

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:118](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L118)

***

### toggleFullscreen()

> **toggleFullscreen**(): `void`

Toggles fullscreen mode

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:348](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L348)

***

### toggleMute()

> **toggleMute**(): `void`

Toggles between muted and unmuted states

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:198](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L198)

***

### togglePip()

> **togglePip**(): `Promise`\<`void`\>

Toggles picture-in-picture mode

#### Returns

`Promise`\<`void`\>

#### Defined in

[modules/context/controller.ts:370](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L370)

***

### togglePlay()

> **togglePlay**(): `void`

Toggles video playback between playing and paused states.

If the video is currently playing, it will be paused. If it is paused, playback will resume.

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:69](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L69)

***

### unmute()

> **unmute**(): `void`

Unmutes the playback

#### Returns

`void`

#### Defined in

[modules/context/controller.ts:220](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L220)

***

### create()

> `static` **create**(`context`): [`Controller`](Controller.md)

Factory method to create a new instance of VxdkController.

#### Parameters

• **context**: [`Context`](Context.md)

The context object containing playback options and configurations.

#### Returns

[`Controller`](Controller.md)

A new instance of the VxdkController.

#### Defined in

[modules/context/controller.ts:34](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/controller.ts#L34)
