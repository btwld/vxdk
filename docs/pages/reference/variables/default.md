# Variable: default

> `const` **default**: `object`

## Type declaration

### get()

> **get**: () => `any`

#### Returns

`any`

### getById()

> **getById**: (`id`) => `any`

#### Parameters

• **id**: `string`

#### Returns

`any`

### init()

> **init**: (`el`, `options`) => [`Controller`](../classes/Controller.md)

#### Parameters

• **el**: `HTMLElement`

• **options**: `Partial`\<[`Options`](../interfaces/Options.md)\>

#### Returns

[`Controller`](../classes/Controller.md)

### registerPlayback()

> **registerPlayback**: (`playback`) => `void` = `PluginRegistry.registerPlayback`

#### Parameters

• **playback**: `PlaybackClass`

#### Returns

`void`

### registerPlaybackLoader()

> **registerPlaybackLoader**: (`loader`) => `void` = `PluginRegistry.registerPlaybackLoader`

#### Parameters

• **loader**: `PlaybackLoader`

#### Returns

`void`

### registerPlugin()

> **registerPlugin**: (`plugin`) => `void` = `PluginRegistry.registerPlugin`

#### Parameters

• **plugin**: `PluginClass`

#### Returns

`void`

### registerPluginLoader()

> **registerPluginLoader**: (`loader`) => `void` = `PluginRegistry.registerPluginLoader`

#### Parameters

• **loader**: [`PluginLoader`](../type-aliases/PluginLoader.md)

#### Returns

`void`

### version

> **version**: `string`

## Defined in

[main.ts:51](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/main.ts#L51)
