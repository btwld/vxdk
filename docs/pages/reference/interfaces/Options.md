# Interface: Options

Interface representing player options.

## Properties

### aspectRatio

> **aspectRatio**: `number`

Aspect ratio of the player

#### Defined in

[modules/options/options.dto.ts:65](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L65)

***

### autoPlay

> **autoPlay**: `boolean`

Whether to autoplay the media

#### Defined in

[modules/options/options.dto.ts:77](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L77)

***

### bridgeAdapter?

> `optional` **bridgeAdapter**: `Constructor`\<`IPlatformBridgeAdapter`\>

Constructor for the platform bridge adapter (optional)

#### Defined in

[modules/options/options.dto.ts:92](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L92)

***

### closedCaptions

> **closedCaptions**: `string` \| `string`[]

Closed captions source or sources

#### Defined in

[modules/options/options.dto.ts:95](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L95)

***

### controls

> **controls**: `boolean`

Whether to show controls

#### Defined in

[modules/options/options.dto.ts:71](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L71)

***

### crossOrigin

> **crossOrigin**: `string`

CORS setting for the media

#### Defined in

[modules/options/options.dto.ts:47](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L47)

***

### debug

> **debug**: `boolean`

Whether debug mode is enabled

#### Defined in

[modules/options/options.dto.ts:62](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L62)

***

### keyboardNavigation

> **keyboardNavigation**: `string`

Keyboard navigation settings

#### Defined in

[modules/options/options.dto.ts:68](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L68)

***

### language

> **language**: `SupportedLanguage`

Language setting for the player

#### Defined in

[modules/options/options.dto.ts:59](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L59)

***

### loop

> **loop**: `boolean`

Whether the media should loop

#### Defined in

[modules/options/options.dto.ts:44](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L44)

***

### muted

> **muted**: `boolean`

Whether the media is muted

#### Defined in

[modules/options/options.dto.ts:41](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L41)

***

### nativeControls

> **nativeControls**: `boolean`

Whether to use native controls

#### Defined in

[modules/options/options.dto.ts:74](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L74)

***

### playbackAdapter?

> `optional` **playbackAdapter**: `Constructor`\<[`Playback`](../classes/Playback.md)\<`any`\>\>

Constructor for the playback adapter (optional)

#### Defined in

[modules/options/options.dto.ts:89](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L89)

***

### playsInline

> **playsInline**: `boolean`

Whether the media should play inline on mobile devices

#### Defined in

[modules/options/options.dto.ts:50](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L50)

***

### plugins

> **plugins**: `PluginOptions`

Plugin options

#### Defined in

[modules/options/options.dto.ts:86](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L86)

***

### poster?

> `optional` **poster**: `string`

URL of the poster image (optional)

#### Defined in

[modules/options/options.dto.ts:38](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L38)

***

### preload

> **preload**: `PreloadValue`

Preload behavior for the media

#### Defined in

[modules/options/options.dto.ts:56](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L56)

***

### showUI

> **showUI**: `boolean`

Whether to show the user interface

#### Defined in

[modules/options/options.dto.ts:53](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L53)

***

### source

> **source**: `string`

Source URL of the media

#### Defined in

[modules/options/options.dto.ts:32](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L32)

***

### startTime?

> `optional` **startTime**: `number`

Start time of the media in seconds (optional)

#### Defined in

[modules/options/options.dto.ts:83](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L83)

***

### thumbnails?

> `optional` **thumbnails**: `string`

URL of the thumbnails (optional)

#### Defined in

[modules/options/options.dto.ts:35](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L35)

***

### volume

> **volume**: `number`

Volume level of the media

#### Defined in

[modules/options/options.dto.ts:80](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/options/options.dto.ts#L80)
