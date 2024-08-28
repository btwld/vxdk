# Class: HTML5Player\<Config\>

HTML5Player is a base playback class for HTML5 video playback.
It is also used as the base for other playback dependent on HTML5 video.
/**

## Extends

- [`Playback`](Playback.md)\<`Config`\>

## Type Parameters

• **Config** = `Record`\<`string`, `unknown`\>

## Constructors

### new HTML5Player()

> **new HTML5Player**\<`Config`\>(`context`): [`HTML5Player`](HTML5Player.md)\<`Config`\>

Creates an instance of HTML5Player.

#### Parameters

• **context**: [`Context`](Context.md)

The context object.

#### Returns

[`HTML5Player`](HTML5Player.md)\<`Config`\>

#### Overrides

[`Playback`](Playback.md).[`constructor`](Playback.md#constructors)

#### Defined in

[modules/playback/html5.ts:43](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L43)

## Other

### hooks

> **hooks**: `Hook`\<[`HTML5Player`](HTML5Player.md)\<`Config`\>\>

#### Inherited from

[`Playback`](Playback.md).[`hooks`](Playback.md#hooks)

#### Defined in

[modules/common/module.ts:22](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L22)

***

### name

> **name**: `string` = `'HTML5Player'`

The name of the player.

#### Overrides

[`Playback`](Playback.md).[`name`](Playback.md#name)

#### Defined in

[modules/playback/html5.ts:21](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L21)

***

### playbackType

> **playbackType**: [`PlaybackType`](../enumerations/PlaybackType.md) = `PlaybackType.VOD`

The type of playback.

#### Overrides

[`Playback`](Playback.md).[`playbackType`](Playback.md#playbacktype)

#### Defined in

[modules/playback/html5.ts:29](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L29)

***

### type

> `readonly` **type**: `PLAYBACK` = `PluginType.PLAYBACK`

#### Inherited from

[`Playback`](Playback.md).[`type`](Playback.md#type)

#### Defined in

[modules/playback/base\_playback.ts:11](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L11)

***

### autoLevelEnabled

> `get` **autoLevelEnabled**(): `boolean`

Gets whether auto level selection is enabled.

#### Returns

`boolean`

#### Overrides

[`Playback`](Playback.md).[`autoLevelEnabled`](Playback.md#autolevelenabled)

#### Defined in

[modules/playback/html5.ts:193](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L193)

***

### bridge

> `get` `protected` **bridge**(): `PlatformBridgeController`

Protected getter for the bridge instance

#### Returns

`PlatformBridgeController`

#### Inherited from

[`Playback`](Playback.md).[`bridge`](Playback.md#bridge)

#### Defined in

[modules/common/module.ts:85](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L85)

***

### bufferedPercentage

> `get` **bufferedPercentage**(): `number`

Gets the buffered percentage of the video.

#### Returns

`number`

#### Overrides

[`Playback`](Playback.md).[`bufferedPercentage`](Playback.md#bufferedpercentage)

#### Defined in

[modules/playback/html5.ts:290](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L290)

***

### controller

> `get` `protected` **controller**(): [`Controller`](Controller.md)

Protected getter for the controller instance

#### Returns

[`Controller`](Controller.md)

#### Inherited from

[`Playback`](Playback.md).[`controller`](Playback.md#controller)

#### Defined in

[modules/common/module.ts:78](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L78)

***

### currentLevel

> `get` **currentLevel**(): [`Level`](../interfaces/Level.md)

Gets the current video level.

#### Throws

Will throw an error since this method is not implemented.

#### Returns

[`Level`](../interfaces/Level.md)

#### Overrides

[`Playback`](Playback.md).[`currentLevel`](Playback.md#currentlevel)

#### Defined in

[modules/playback/html5.ts:332](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L332)

***

### currentTime

> `get` **currentTime**(): `number`

Gets the current playback time.

#### Returns

`number`

#### Overrides

[`Playback`](Playback.md).[`currentTime`](Playback.md#currenttime)

#### Defined in

[modules/playback/html5.ts:283](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L283)

***

### duration

> `get` **duration**(): `number`

Gets the duration of the video.

#### Returns

`number`

#### Overrides

[`Playback`](Playback.md).[`duration`](Playback.md#duration)

#### Defined in

[modules/playback/html5.ts:233](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L233)

***

### emit

> `get` `protected` **emit**(): (`name`, `data`?) => `void`

Protected getter for the 'emit' event emission method

#### Returns

`Function`

##### Parameters

• **name**: `string` \| `number`

• **data?**: `undefined`

##### Returns

`void`

#### Inherited from

[`Playback`](Playback.md).[`emit`](Playback.md#emit)

#### Defined in

[modules/common/module.ts:128](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L128)

***

### emitIfChanged

> `get` `protected` **emitIfChanged**(): (`name`, `data`) => `void`

Protected getter for the 'emitIfChanged' event emission method

#### Returns

`Function`

##### Parameters

• **name**: `string` \| `number`

• **data**: `any`

##### Returns

`void`

#### Inherited from

[`Playback`](Playback.md).[`emitIfChanged`](Playback.md#emitifchanged)

#### Defined in

[modules/common/module.ts:135](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L135)

***

### events

> `get` `protected` **events**(): `string`[]

Protected getter for the events array

#### Returns

`string`[]

Array of event names

#### Inherited from

[`Playback`](Playback.md).[`events`](Playback.md#events)

#### Defined in

[modules/common/module.ts:114](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L114)

***

### hasEnded

> `get` **hasEnded**(): `boolean`

Checks if the video has ended.

#### Returns

`boolean`

#### Overrides

[`Playback`](Playback.md).[`hasEnded`](Playback.md#hasended)

#### Defined in

[modules/playback/html5.ts:304](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L304)

***

### isLive

> `get` **isLive**(): `boolean`

Checks if the video is a live stream.

#### Returns

`boolean`

#### Overrides

[`Playback`](Playback.md).[`isLive`](Playback.md#islive)

#### Defined in

[modules/playback/html5.ts:240](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L240)

***

### isMuted

> `get` **isMuted**(): `boolean`

Checks if the video is muted.

#### Returns

`boolean`

#### Overrides

[`Playback`](Playback.md).[`isMuted`](Playback.md#ismuted)

#### Defined in

[modules/playback/html5.ts:247](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L247)

***

### isPlaying

> `get` **isPlaying**(): `boolean`

Checks if the video is playing.

#### Returns

`boolean`

#### Overrides

[`Playback`](Playback.md).[`isPlaying`](Playback.md#isplaying)

#### Defined in

[modules/playback/html5.ts:297](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L297)

***

### levels

> `get` **levels**(): [`Level`](../interfaces/Level.md)[]

Gets the available video levels.

#### Returns

[`Level`](../interfaces/Level.md)[]

An empty array since this method is not implemented.

#### Overrides

[`Playback`](Playback.md).[`levels`](Playback.md#levels)

#### Defined in

[modules/playback/html5.ts:340](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L340)

***

### logger

> `get` `protected` **logger**(): `Logger`

Protected getter for the logger instance

#### Returns

`Logger`

Logger instance for this module

#### Inherited from

[`Playback`](Playback.md).[`logger`](Playback.md#logger)

#### Defined in

[modules/common/module.ts:40](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L40)

***

### nativeEl

> `get` **nativeEl**(): `HTMLVideoElement`

Gets the native HTMLVideoElement used for playback.

#### Returns

`HTMLVideoElement`

#### Overrides

[`Playback`](Playback.md).[`nativeEl`](Playback.md#nativeel)

#### Defined in

[modules/playback/html5.ts:142](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L142)

***

### off

> `get` `protected` **off**(): (`name`, `listener`) => `void`

Protected getter for the 'off' event unbinding method

#### Returns

`Function`

##### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

##### Returns

`void`

#### Inherited from

[`Playback`](Playback.md).[`off`](Playback.md#off)

#### Defined in

[modules/common/module.ts:99](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L99)

***

### on

> `get` `protected` **on**(): (`name`, `listener`) => [`Disposable`](../interfaces/Disposable.md)

Protected getter for the 'on' event binding method

#### Returns

`Function`

##### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

##### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

[`Playback`](Playback.md).[`on`](Playback.md#on)

#### Defined in

[modules/common/module.ts:92](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L92)

***

### once

> `get` `protected` **once**(): (`name`, `listener`) => `void`

Protected getter for the 'once' event binding method

#### Returns

`Function`

##### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

##### Returns

`void`

#### Inherited from

[`Playback`](Playback.md).[`once`](Playback.md#once)

#### Defined in

[modules/common/module.ts:106](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L106)

***

### playbackRate

> `get` **playbackRate**(): `number`

Gets the current playback rate.

#### Returns

`number`

#### Overrides

[`Playback`](Playback.md).[`playbackRate`](Playback.md#playbackrate)

#### Defined in

[modules/playback/html5.ts:268](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L268)

***

### storage

> `get` `protected` **storage**(): `StorageController`

Protected getter for the storage instance

#### Returns

`StorageController`

#### Inherited from

[`Playback`](Playback.md).[`storage`](Playback.md#storage)

#### Defined in

[modules/common/module.ts:71](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L71)

***

### volume

> `get` **volume**(): `number`

Gets the current volume level.

#### Returns

`number`

#### Overrides

[`Playback`](Playback.md).[`volume`](Playback.md#volume)

#### Defined in

[modules/playback/html5.ts:217](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L217)

***

### connectedCallback()

> **connectedCallback**(): `void`

Callback function called when the player is connected to the DOM.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`connectedCallback`](Playback.md#connectedcallback)

#### Defined in

[modules/playback/html5.ts:78](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L78)

***

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Callback function called when the player is disconnected from the DOM.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`disconnectedCallback`](Playback.md#disconnectedcallback)

#### Defined in

[modules/playback/html5.ts:131](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L131)

***

### getConfig()

> `protected` **getConfig**(): `Config`

Protected method to get the plugin configuration

#### Returns

`Config`

The plugin configuration

#### Inherited from

[`Playback`](Playback.md).[`getConfig`](Playback.md#getconfig)

#### Defined in

[modules/common/module.ts:64](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L64)

***

### load()

> **load**(`startTime`?): `void`

Loads the media, optionally setting the start time.

#### Parameters

• **startTime?**: `number`

The start time in seconds to set for the media.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`load`](Playback.md#load)

#### Defined in

[modules/playback/html5.ts:67](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L67)

***

### mute()

> **mute**(): `void`

Mutes the video.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`mute`](Playback.md#mute)

#### Defined in

[modules/playback/html5.ts:254](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L254)

***

### pause()

> **pause**(): `void`

Pauses the video playback.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`pause`](Playback.md#pause)

#### Defined in

[modules/playback/html5.ts:175](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L175)

***

### play()

> **play**(): `Promise`\<`void`\>

Starts playing the video.

#### Returns

`Promise`\<`void`\>

A Promise that resolves when playback has begun.

#### Overrides

[`Playback`](Playback.md).[`play`](Playback.md#play)

#### Defined in

[modules/playback/html5.ts:158](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L158)

***

### replay()

> **replay**(): `Promise`\<`void`\>

Replays the video from the beginning.

#### Returns

`Promise`\<`void`\>

A Promise that resolves when playback has begun.

#### Overrides

[`Playback`](Playback.md).[`replay`](Playback.md#replay)

#### Defined in

[modules/playback/html5.ts:167](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L167)

***

### seekPercentage()

> **seekPercentage**(`percentage`): `void`

Seeks to a specific percentage of the video duration.

#### Parameters

• **percentage**: `number`

The percentage of the video duration to seek to.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`seekPercentage`](Playback.md#seekpercentage)

#### Defined in

[modules/playback/html5.ts:209](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L209)

***

### seekTo()

> **seekTo**(`time`): `void`

Seeks to a specific time in the video.

#### Parameters

• **time**: `number`

The time in seconds to seek to.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`seekTo`](Playback.md#seekto)

#### Defined in

[modules/playback/html5.ts:201](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L201)

***

### selectAudioLanguage()

> **selectAudioLanguage**(`_`): `void`

Selects an audio language.

#### Parameters

• **\_**: `string`

The string representing the audio language to select (unused).

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`selectAudioLanguage`](Playback.md#selectaudiolanguage)

#### Defined in

[modules/playback/html5.ts:357](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L357)

***

### selectLevel()

> **selectLevel**(`_`): `void`

Selects a video level.

#### Parameters

• **\_**: `"auto"` \| [`Level`](../interfaces/Level.md)

The LevelDto object or "auto" to select the level (unused).

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`selectLevel`](Playback.md#selectlevel)

#### Defined in

[modules/playback/html5.ts:349](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L349)

***

### setPlaybackRate()

> **setPlaybackRate**(`playbackRate`): `void`

Sets the playback rate.

#### Parameters

• **playbackRate**: `number`

The new playback rate as a number.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`setPlaybackRate`](Playback.md#setplaybackrate)

#### Defined in

[modules/playback/html5.ts:276](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L276)

***

### setSource()

> **setSource**(`src`): `void`

Sets the source URL for the video.

#### Parameters

• **src**: `string`

The URL of the video source.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`setSource`](Playback.md#setsource)

#### Defined in

[modules/playback/html5.ts:150](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L150)

***

### setVolume()

> **setVolume**(`volume`): `void`

Sets the volume level.

#### Parameters

• **volume**: `number`

The volume level as a number between 0 and 1.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`setVolume`](Playback.md#setvolume)

#### Defined in

[modules/playback/html5.ts:225](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L225)

***

### stop()

> **stop**(): `void`

Stops the video playback and removes the video source.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`stop`](Playback.md#stop)

#### Defined in

[modules/playback/html5.ts:183](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L183)

***

### syncWithLive()

> **syncWithLive**(): `void`

Syncs the video with live playback.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`syncWithLive`](Playback.md#syncwithlive)

#### Defined in

[modules/playback/html5.ts:364](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L364)

***

### unmute()

> **unmute**(): `void`

Unmutes the video.

#### Returns

`void`

#### Overrides

[`Playback`](Playback.md).[`unmute`](Playback.md#unmute)

#### Defined in

[modules/playback/html5.ts:261](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L261)

***

### canPlay()

> `static` **canPlay**(`source`): `boolean`

Checks if the current player can play the given source.

#### Parameters

• **source**: `string`

The URL of the video source to check.

#### Returns

`boolean`

A boolean value indicating if the player can play the source.

#### Overrides

[`Playback`](Playback.md).[`canPlay`](Playback.md#canplay)

#### Defined in

[modules/playback/html5.ts:373](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/html5.ts#L373)
