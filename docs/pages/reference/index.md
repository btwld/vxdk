# @bitwild/vxdk

## Playback

| Enumeration, Class | Description |
| ------ | ------ |
| [PlaybackType](enumerations/PlaybackType.md) | Enum representing the different types of playback. |
| [HTML5Player](classes/HTML5Player.md) | HTML5Player is a base playback class for HTML5 video playback. It is also used as the base for other playback dependent on HTML5 video. /** |
| [Playback](classes/Playback.md) | Abstract class representing a playback plugin. It extends the Plugin class and provides common properties and methods for playback functionality. |

## Events

| Enumeration | Description |
| ------ | ------ |
| [CONTEXT\_EVENT](enumerations/CONTEXT_EVENT.md) | Enum representing context events. |
| [PLAYBACK\_EVENT](enumerations/PLAYBACK_EVENT.md) | Enum representing playback events. |

## Other

| Class, Interface, Type alias, Variable | Description |
| ------ | ------ |
| [BrowserUtils](classes/BrowserUtils.md) | - |
| [Context](classes/Context.md) | VxdkContext class that manages the overall context of the video player |
| [Controller](classes/Controller.md) | VXDK Controller class that exposes all public APIs for video playback control |
| [Plugin](classes/Plugin.md) | Abstract base class for all plugins, extending Module |
| [Disposable](interfaces/Disposable.md) | - |
| [Level](interfaces/Level.md) | Interface representing a level DTO (Data Transfer Object). |
| [Listener](interfaces/Listener.md) | - |
| [Options](interfaces/Options.md) | Interface representing player options. |
| [State](interfaces/State.md) | - |
| [StorageRequest](interfaces/StorageRequest.md) | - |
| [NextFn](type-aliases/NextFn.md) | - |
| [PluginLoader](type-aliases/PluginLoader.md) | Type definition for a plugin loader |
| [default](variables/default.md) | - |
