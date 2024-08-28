# Enumeration: PLAYBACK\_EVENT

Enum representing playback events.

## Enumeration Members

### AUDIO\_CHANGED

> **AUDIO\_CHANGED**: `"playback.audio.changed"`

Fired when the audio track changes

#### Defined in

[modules/events/events.dto.ts:42](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L42)

***

### AUTOLEVEL\_CHANGED

> **AUTOLEVEL\_CHANGED**: `"playback.autoLevel.changed"`

Fired when the automatic quality level changes

#### Defined in

[modules/events/events.dto.ts:36](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L36)

***

### BUFFERED\_CHANGED

> **BUFFERED\_CHANGED**: `"playback.buffered.changed"`

Fired when the amount of buffered media changes

#### Defined in

[modules/events/events.dto.ts:32](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L32)

***

### DESTROY

> **DESTROY**: `"playback.destroy"`

Fired when the player instance is destroyed

#### Defined in

[modules/events/events.dto.ts:26](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L26)

***

### DURATION\_CHANGED

> **DURATION\_CHANGED**: `"playback.duration.changed"`

Fired when the duration attribute has been updated

#### Defined in

[modules/events/events.dto.ts:22](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L22)

***

### ENDED

> **ENDED**: `"playback.ended"`

Fired when playback has stopped because the end of the media was reached

#### Defined in

[modules/events/events.dto.ts:18](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L18)

***

### ERROR

> **ERROR**: `"playback.error"`

Fired when an error occurred while fetching the media data, or the type of the resource is not a supported media format

#### Defined in

[modules/events/events.dto.ts:28](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L28)

***

### LEVELS\_LOADED

> **LEVELS\_LOADED**: `"playback.levels.loaded"`

Fired when the available quality levels are loaded

#### Defined in

[modules/events/events.dto.ts:38](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L38)

***

### LEVEL\_CHANGED

> **LEVEL\_CHANGED**: `"playback.level.changed"`

Fired when the current quality level changes

#### Defined in

[modules/events/events.dto.ts:40](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L40)

***

### LOADEDMETADATA

> **LOADEDMETADATA**: `"playback.loadedmetadata"`

Fired when the metadata has been loaded

#### Defined in

[modules/events/events.dto.ts:10](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L10)

***

### LOADSTART

> **LOADSTART**: `"playback.loadstart"`

Fired when the browser has started to load the resource

#### Defined in

[modules/events/events.dto.ts:8](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L8)

***

### PAUSE

> **PAUSE**: `"playback.pause"`

Fired when playback has been paused

#### Defined in

[modules/events/events.dto.ts:14](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L14)

***

### PLAY

> **PLAY**: `"playback.play"`

Fired when playback has begun

#### Defined in

[modules/events/events.dto.ts:12](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L12)

***

### PLAYBACKRATE\_CHANGE

> **PLAYBACKRATE\_CHANGE**: `"playback.playbackrate.change"`

Fired when the playback rate has changed

#### Defined in

[modules/events/events.dto.ts:34](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L34)

***

### PLAYING

> **PLAYING**: `"playback.playing"`

Fired when playback is ready to start after having been paused or delayed due to lack of data

#### Defined in

[modules/events/events.dto.ts:16](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L16)

***

### TIMEUPDATE

> **TIMEUPDATE**: `"playback.timeupdate"`

Fired when the time indicated by the currentTime attribute has been updated

#### Defined in

[modules/events/events.dto.ts:20](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L20)

***

### VOLUME\_CHANGED

> **VOLUME\_CHANGED**: `"playback.volume.changed"`

Fired when the volume has changed

#### Defined in

[modules/events/events.dto.ts:30](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L30)

***

### WAITING

> **WAITING**: `"playback.waiting"`

Fired when playback has stopped because of a temporary lack of data

#### Defined in

[modules/events/events.dto.ts:24](https://github.com/btwld/vxdk/blob/f0c08b605fe2b92843fdce69d1d8f956007afe49/src/modules/events/events.dto.ts#L24)
