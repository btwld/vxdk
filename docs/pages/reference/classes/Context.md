# Class: Context

VxdkContext class that manages the overall context of the video player

## Extends

- `EventController`

## Constructors

### new Context()

> **new Context**(`$selector`, `options`): [`Context`](Context.md)

Constructor for VxdkContext

#### Parameters

• **$selector**: `HTMLElement`

The HTML element to attach the player to

• **options**: `Partial`\<[`Options`](../interfaces/Options.md)\>

The initial options for the player

#### Returns

[`Context`](Context.md)

#### Overrides

`EventController.constructor`

#### Defined in

[modules/context/context.ts:61](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L61)

## Properties

### bridge

> `readonly` **bridge**: `PlatformBridgeController`

Platform bridge controller

#### Defined in

[modules/context/context.ts:29](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L29)

***

### id

> `readonly` **id**: `string`

Unique identifier for this context

#### Defined in

[modules/context/context.ts:32](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L32)

## Accessors

### $uiContainer

> `get` **$uiContainer**(): `HTMLElement`

Gets the UI container element

#### Returns

`HTMLElement`

The UI container element

#### Defined in

[modules/context/context.ts:185](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L185)

***

### controller

> `get` **controller**(): [`Controller`](Controller.md)

Gets the VxdkController instance

#### Returns

[`Controller`](Controller.md)

The VxdkController instance

#### Defined in

[modules/context/context.ts:102](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L102)

***

### options

> `get` **options**(): `OptionsController`

Gets the current options

#### Returns

`OptionsController`

The current options controller

#### Defined in

[modules/context/context.ts:86](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L86)

***

### playback

> `get` **playback**(): [`Playback`](Playback.md)\<`any`\>

Gets the current playback instance

#### Returns

[`Playback`](Playback.md)\<`any`\>

The current playback instance

#### Defined in

[modules/context/context.ts:177](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L177)

***

### plugins

> `get` **plugins**(): [`Plugin`](Plugin.md)\<`any`\>[]

Gets all loaded plugins

#### Returns

[`Plugin`](Plugin.md)\<`any`\>[]

An array of all loaded plugins

#### Defined in

[modules/context/context.ts:193](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L193)

***

### state

> `get` **state**(): [`State`](../interfaces/State.md)

Gets the current state of the player

#### Returns

[`State`](../interfaces/State.md)

The current state

#### Defined in

[modules/context/context.ts:250](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L250)

***

### storage

> `get` **storage**(): `StorageController`

Gets the storage controller

#### Returns

`StorageController`

The storage controller

#### Defined in

[modules/context/context.ts:94](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L94)

***

### uiPlugins

> `get` **uiPlugins**(): `UiPlugin`\<`any`\>[]

Gets all UI plugins

#### Returns

`UiPlugin`\<`any`\>[]

An array of all UI plugins

#### Defined in

[modules/context/context.ts:201](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L201)

***

### version

> `get` **version**(): `string`

Gets the version of the player

#### Returns

`string`

The version string

#### Defined in

[modules/context/context.ts:258](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L258)

## Methods

### destroy()

> **destroy**(): `void`

Destroys the player instance

#### Returns

`void`

#### Defined in

[modules/context/context.ts:239](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L239)

***

### emit()

> **emit**(`name`, `data`?): `void`

#### Parameters

• **name**: `string` \| `number`

• **data?**: `undefined`

#### Returns

`void`

#### Inherited from

`EventController.emit`

#### Defined in

[modules/events/event.controller.ts:20](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/event.controller.ts#L20)

***

### emitIfChanged()

> **emitIfChanged**(`name`, `data`): `void`

#### Parameters

• **name**: `string` \| `number`

• **data**: `any`

#### Returns

`void`

#### Inherited from

`EventController.emitIfChanged`

#### Defined in

[modules/events/event.controller.ts:27](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/event.controller.ts#L27)

***

### getPlugin()

> **getPlugin**\<`T`\>(`pluginClass`): `T`

Gets a plugin by its class

#### Type Parameters

• **T** *extends* [`Plugin`](Plugin.md)\<`any`\>

#### Parameters

• **pluginClass**: `ModuleClass`\<`T`\>

The class of the plugin

#### Returns

`T`

The plugin instance

#### Throws

If the plugin is not found

#### Defined in

[modules/context/context.ts:289](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L289)

***

### getPluginByName()

> **getPluginByName**\<`T`\>(`name`): `T`

Gets a plugin by its name

#### Type Parameters

• **T** *extends* [`Plugin`](Plugin.md)\<`any`\>

#### Parameters

• **name**: `string`

The name of the plugin

#### Returns

`T`

The plugin instance

#### Throws

If the plugin is not found

#### Defined in

[modules/context/context.ts:269](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L269)

***

### off()

> **off**(`name`, `listener`): `void`

#### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

#### Returns

`void`

#### Inherited from

`EventController.off`

#### Defined in

[modules/events/event.controller.ts:31](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/event.controller.ts#L31)

***

### on()

> **on**(`name`, `listener`): [`Disposable`](../interfaces/Disposable.md)

#### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

#### Returns

[`Disposable`](../interfaces/Disposable.md)

#### Inherited from

`EventController.on`

#### Defined in

[modules/events/event.controller.ts:35](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/event.controller.ts#L35)

***

### once()

> **once**(`name`, `listener`): `void`

#### Parameters

• **name**: `string` \| `number`

• **listener**: [`Listener`](../interfaces/Listener.md)\<`void`\>

#### Returns

`void`

#### Inherited from

`EventController.once`

#### Defined in

[modules/events/event.controller.ts:39](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/event.controller.ts#L39)

***

### registerEvents()

> **registerEvents**(`eventNames`): `void`

#### Parameters

• **eventNames**: `string`[]

#### Returns

`void`

#### Inherited from

`EventController.registerEvents`

#### Defined in

[modules/events/event.controller.ts:43](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/event.controller.ts#L43)

***

### setOptions()

> **setOptions**(`options`): `void`

Sets new options for the player

#### Parameters

• **options**: `Partial`\<[`Options`](../interfaces/Options.md)\>

The new options to set

#### Returns

`void`

#### Defined in

[modules/context/context.ts:163](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L163)

***

### unregisterEvents()

> `protected` **unregisterEvents**(): `void`

#### Returns

`void`

#### Inherited from

`EventController.unregisterEvents`

#### Defined in

[modules/events/event.controller.ts:49](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/event.controller.ts#L49)

***

### init()

> `static` **init**(`element`, `options`): [`Context`](Context.md)

Initializes a new VxdkContext

#### Parameters

• **element**: `HTMLElement`

The HTML element to attach the player to

• **options**: `Partial`\<[`Options`](../interfaces/Options.md)\>

The initial options for the player

#### Returns

[`Context`](Context.md)

A new VxdkContext instance

#### Defined in

[modules/context/context.ts:52](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/context/context.ts#L52)
