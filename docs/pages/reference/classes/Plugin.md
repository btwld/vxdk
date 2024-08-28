# Class: `abstract` Plugin\<Config\>

Abstract base class for all plugins, extending Module

## Extends

- `Module`

## Extended by

- [`Playback`](Playback.md)

## Type Parameters

• **Config** = `any`

## Constructors

### new Plugin()

> **new Plugin**\<`Config`\>(`ctx`): [`Plugin`](Plugin.md)\<`Config`\>

Constructor for the Plugin class

#### Parameters

• **ctx**: [`Context`](Context.md)

The VxdkContext instance

#### Returns

[`Plugin`](Plugin.md)\<`Config`\>

#### Overrides

`Module.constructor`

#### Defined in

[modules/common/module.ts:55](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L55)

## Properties

### hooks

> **hooks**: `Hook`\<[`Plugin`](Plugin.md)\<`Config`\>\>

#### Inherited from

`Module.hooks`

#### Defined in

[modules/common/module.ts:22](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L22)

***

### name

> `abstract` **name**: `string`

#### Inherited from

`Module.name`

#### Defined in

[modules/common/module.ts:21](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L21)

***

### type

> `readonly` **type**: `PluginType` = `PluginType.PLUGIN`

#### Defined in

[modules/common/module.ts:49](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L49)

## Accessors

### bridge

> `get` `protected` **bridge**(): `PlatformBridgeController`

Protected getter for the bridge instance

#### Returns

`PlatformBridgeController`

#### Defined in

[modules/common/module.ts:85](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L85)

***

### controller

> `get` `protected` **controller**(): [`Controller`](Controller.md)

Protected getter for the controller instance

#### Returns

[`Controller`](Controller.md)

#### Defined in

[modules/common/module.ts:78](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L78)

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

#### Defined in

[modules/common/module.ts:135](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L135)

***

### events

> `get` `protected` **events**(): `string`[]

Protected getter for the events array

#### Returns

`string`[]

Array of event names

#### Defined in

[modules/common/module.ts:114](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L114)

***

### logger

> `get` `protected` **logger**(): `Logger`

Protected getter for the logger instance

#### Returns

`Logger`

Logger instance for this module

#### Inherited from

`Module.logger`

#### Defined in

[modules/common/module.ts:40](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L40)

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

#### Defined in

[modules/common/module.ts:106](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L106)

***

### storage

> `get` `protected` **storage**(): `StorageController`

Protected getter for the storage instance

#### Returns

`StorageController`

#### Defined in

[modules/common/module.ts:71](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L71)

## Methods

### connectedCallback()

> **connectedCallback**(): `void`

Callback method called when the module is connected

#### Returns

`void`

#### Inherited from

`Module.connectedCallback`

#### Defined in

[modules/common/module.ts:28](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L28)

***

### disconnectedCallback()

> **disconnectedCallback**(): `void`

Callback method called when the module is disconnected

#### Returns

`void`

#### Inherited from

`Module.disconnectedCallback`

#### Defined in

[modules/common/module.ts:34](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L34)

***

### getConfig()

> `protected` **getConfig**(): `Config`

Protected method to get the plugin configuration

#### Returns

`Config`

The plugin configuration

#### Defined in

[modules/common/module.ts:64](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/common/module.ts#L64)
