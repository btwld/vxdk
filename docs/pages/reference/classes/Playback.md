# Class: `abstract` Playback\<Config\>

Abstract class representing a playback plugin.
It extends the Plugin class and provides common properties and methods for playback functionality.

## Extends

- [`Plugin`](Plugin.md)\<`Config`\>

## Extended by

- [`HTML5Player`](HTML5Player.md)

## Type Parameters

• **Config** = `any`

## Constructors

### new Playback()

> **new Playback**\<`Config`\>(`ctx`): [`Playback`](Playback.md)\<`Config`\>

Constructor for the Plugin class

#### Parameters

• **ctx**: [`Context`](Context.md)

The VxdkContext instance

#### Returns

[`Playback`](Playback.md)\<`Config`\>

#### Inherited from

[`Plugin`](Plugin.md).[`constructor`](Plugin.md#constructors)

#### Defined in

[modules/common/module.ts:55](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L55)

## Properties

### hooks

> **hooks**: `Hook`\<[`Playback`](Playback.md)\<`Config`\>\>

#### Inherited from

[`Plugin`](Plugin.md).[`hooks`](Plugin.md#hooks)

#### Defined in

[modules/common/module.ts:22](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L22)

***

### name

> `abstract` **name**: `string`

#### Inherited from

[`Plugin`](Plugin.md).[`name`](Plugin.md#name)

#### Defined in

[modules/common/module.ts:21](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L21)

***

### type

> `readonly` **type**: `PLAYBACK` = `PluginType.PLAYBACK`

#### Overrides

[`Plugin`](Plugin.md).[`type`](Plugin.md#type)

#### Defined in

[modules/playback/base\_playback.ts:11](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L11)

## Accessors

### autoLevelEnabled

> `get` `abstract` **autoLevelEnabled**(): `boolean`

Abstract getter to check if auto level selection is enabled.

#### Returns

`boolean`

#### Defined in

[modules/playback/base\_playback.ts:157](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L157)

***

### bridge

> `get` `protected` **bridge**(): `PlatformBridgeController`

Protected getter for the bridge instance

#### Returns

`PlatformBridgeController`

#### Inherited from

[`Plugin`](Plugin.md).[`bridge`](Plugin.md#bridge)

#### Defined in

[modules/common/module.ts:85](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L85)

***

### bufferedPercentage

> `get` `abstract` **bufferedPercentage**(): `number`

Abstract getter to get the buffered percentage of the playback.

#### Returns

`number`

#### Defined in

[modules/playback/base\_playback.ts:122](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L122)

***

### controller

> `get` `protected` **controller**(): [`Controller`](Controller.md)

Protected getter for the controller instance

#### Returns

[`Controller`](Controller.md)

#### Inherited from

[`Plugin`](Plugin.md).[`controller`](Plugin.md#controller)

#### Defined in

[modules/common/module.ts:78](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L78)

***

### currentLevel

> `get` `abstract` **currentLevel**(): [`Level`](../interfaces/Level.md)

Abstract getter to get the current quality level of the playback.

#### Returns

[`Level`](../interfaces/Level.md)

#### Defined in

[modules/playback/base\_playback.ts:147](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L147)

***

### currentTime

> `get` `abstract` **currentTime**(): `number`

Abstract getter to get the current time of the playback in seconds.

#### Returns

`number`

#### Defined in

[modules/playback/base\_playback.ts:137](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L137)

***

### duration

> `get` `abstract` **duration**(): `number`

Abstract getter to get the duration of the current source in seconds.

#### Returns

`number`

#### Defined in

[modules/playback/base\_playback.ts:142](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L142)

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

[`Plugin`](Plugin.md).[`emit`](Plugin.md#emit)

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

[`Plugin`](Plugin.md).[`emitIfChanged`](Plugin.md#emitifchanged)

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

[`Plugin`](Plugin.md).[`events`](Plugin.md#events)

#### Defined in

[modules/common/module.ts:114](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L114)

***

### hasEnded

> `get` `abstract` **hasEnded**(): `boolean`

Abstract getter to check if the playback has ended.

#### Returns

`boolean`

#### Defined in

[modules/playback/base\_playback.ts:132](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L132)

***

### isLive

> `get` `abstract` **isLive**(): `boolean`

Abstract getter to check if the playback is live.

#### Returns

`boolean`

#### Defined in

[modules/playback/base\_playback.ts:62](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L62)

***

### isMuted

> `get` `abstract` **isMuted**(): `boolean`

Abstract getter to check if the playback is muted.

#### Returns

`boolean`

#### Defined in

[modules/playback/base\_playback.ts:47](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L47)

***

### isPlaying

> `get` `abstract` **isPlaying**(): `boolean`

Abstract getter to check if the playback is currently playing.

#### Returns

`boolean`

#### Defined in

[modules/playback/base\_playback.ts:127](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L127)

***

### levels

> `get` `abstract` **levels**(): [`Level`](../interfaces/Level.md)[]

Abstract getter to get the available quality levels of the playback.

#### Returns

[`Level`](../interfaces/Level.md)[]

#### Defined in

[modules/playback/base\_playback.ts:152](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L152)

***

### logger

> `get` `protected` **logger**(): `Logger`

Protected getter for the logger instance

#### Returns

`Logger`

Logger instance for this module

#### Inherited from

[`Plugin`](Plugin.md).[`logger`](Plugin.md#logger)

#### Defined in

[modules/common/module.ts:40](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L40)

***

### nativeEl

> `get` `abstract` **nativeEl**(): `unknown`

Abstract getter to get the native element of the playback.

#### Returns

`unknown`

#### Defined in

[modules/playback/base\_playback.ts:72](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L72)

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

[`Plugin`](Plugin.md).[`off`](Plugin.md#off)

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

[`Plugin`](Plugin.md).[`on`](Plugin.md#on)

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

[`Plugin`](Plugin.md).[`once`](Plugin.md#once)

#### Defined in

[modules/common/module.ts:106](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L106)

***

### playbackRate

> `get` `abstract` **playbackRate**(): `number`

Abstract getter to get the current playback rate.

#### Returns

`number`

#### Defined in

[modules/playback/base\_playback.ts:117](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L117)

***

### playbackType

> `get` `abstract` **playbackType**(): [`PlaybackType`](../enumerations/PlaybackType.md)

Abstract getter to get the playback type.

#### Returns

[`PlaybackType`](../enumerations/PlaybackType.md)

#### Defined in

[modules/playback/base\_playback.ts:77](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L77)

***

### storage

> `get` `protected` **storage**(): `StorageController`

Protected getter for the storage instance

#### Returns

`StorageController`

#### Inherited from

[`Plugin`](Plugin.md).[`storage`](Plugin.md#storage)

#### Defined in

[modules/common/module.ts:71](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L71)

***

### volume

> `get` `abstract` **volume**(): `number`

Abstract getter to get the current volume of the playback.

#### Returns

`number`

#### Defined in

[modules/playback/base\_playback.ts:94](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L94)

## Methods

### connectedCallback()

> `abstract` **connectedCallback**(): `void`

Abstract method called when the playback is connected to the DOM.

#### Returns

`void`

#### Overrides

[`Plugin`](Plugin.md).[`connectedCallback`](Plugin.md#connectedcallback)

#### Defined in

[modules/playback/base\_playback.ts:16](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L16)

***

### disconnectedCallback()

> `abstract` **disconnectedCallback**(): `void`

Abstract method called when the playback is disconnected from the DOM.

#### Returns

`void`

#### Overrides

[`Plugin`](Plugin.md).[`disconnectedCallback`](Plugin.md#disconnectedcallback)

#### Defined in

[modules/playback/base\_playback.ts:27](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L27)

***

### getConfig()

> `protected` **getConfig**(): `Config`

Protected method to get the plugin configuration

#### Returns

`Config`

The plugin configuration

#### Inherited from

[`Plugin`](Plugin.md).[`getConfig`](Plugin.md#getconfig)

#### Defined in

[modules/common/module.ts:64](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L64)

***

### load()

> `abstract` **load**(`startTime`?): `void`

Abstract method to load the playback with an optional start time.

#### Parameters

• **startTime?**: `number`

The time in seconds to start the playback from.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:22](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L22)

***

### mute()

> `abstract` **mute**(): `void`

Abstract method to mute the playback.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:52](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L52)

***

### pause()

> `abstract` **pause**(): `void`

Abstract method to pause the playback.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:42](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L42)

***

### play()

> `abstract` **play**(): `void` \| `Promise`\<`void`\>

Abstract method to start the playback.

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[modules/playback/base\_playback.ts:32](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L32)

***

### replay()

> `abstract` **replay**(): `void` \| `Promise`\<`void`\>

Abstract method to replay the playback.

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[modules/playback/base\_playback.ts:67](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L67)

***

### seekPercentage()

> `abstract` **seekPercentage**(`percentage`): `void`

Abstract method to seek the playback to a given percentage of the duration.

#### Parameters

• **percentage**: `number`

The percentage (between 0 and 100) to seek to.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:89](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L89)

***

### seekTo()

> `abstract` **seekTo**(`seconds`): `void`

Abstract method to seek the playback to a given time in seconds.

#### Parameters

• **seconds**: `number`

The time in seconds to seek to.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:83](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L83)

***

### selectAudioLanguage()

> `abstract` **selectAudioLanguage**(`language`): `void`

Abstract method to select an audio language for the playback.

#### Parameters

• **language**: `string`

The language code of the audio track to select.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:169](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L169)

***

### selectLevel()

> `abstract` **selectLevel**(`level`): `void`

Abstract method to select a quality level for the playback.

#### Parameters

• **level**: `"auto"` \| [`Level`](../interfaces/Level.md)

The level to select. Can be a LevelDto object or "auto".

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:163](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L163)

***

### setPlaybackRate()

> `abstract` **setPlaybackRate**(`playbackRate`): `void`

Abstract method to set the playback rate.

#### Parameters

• **playbackRate**: `number`

The playback rate to set.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:112](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L112)

***

### setSource()

> `abstract` **setSource**(`src`): `void`

Abstract method to set the source of the playback.

#### Parameters

• **src**: `string`

The source URL to set.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:106](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L106)

***

### setVolume()

> `abstract` **setVolume**(`volume`): `void`

Abstract method to set the volume of the playback.

#### Parameters

• **volume**: `number`

The volume to set.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:100](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L100)

***

### stop()

> `abstract` **stop**(): `void`

Abstract method to stop the playback.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:37](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L37)

***

### syncWithLive()

> `abstract` **syncWithLive**(): `void`

Abstract method to sync the playback with the live edge.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:174](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L174)

***

### unmute()

> `abstract` **unmute**(): `void`

Abstract method to unmute the playback.

#### Returns

`void`

#### Defined in

[modules/playback/base\_playback.ts:57](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L57)

***

### canPlay()

> `static` **canPlay**(`_`): `boolean`

Static method to check if a given source can be played by the playback.

#### Parameters

• **\_**: `string`

The source to check.

#### Returns

`boolean`

True if the source can be played, false otherwise.

#### Defined in

[modules/playback/base\_playback.ts:181](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/playback/base_playback.ts#L181)
