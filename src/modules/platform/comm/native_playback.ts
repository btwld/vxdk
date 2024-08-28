import type { PLAYBACK_EVENT } from '../../events/events.dto';
import type { BridgeMessage } from '../platform_bridge.controller';
import { BridgeMessageType } from '../platform_bridge.controller';

export type NativePlaybackState = Pick<
  HTMLVideoElement,
  | 'duration'
  | 'muted'
  | 'volume'
  | 'playbackRate'
  | 'ended'
  | 'paused'
  | 'currentTime'
  | 'buffered'
>;

export interface NativePlaybackMesssage extends BridgeMessage {
  type: BridgeMessageType.NATIVE_PLAYBACK;
  eventName: PLAYBACK_EVENT;
}

export function isNativePlaybackMessage(
  message: BridgeMessage,
): message is NativePlaybackMesssage {
  return (message as BridgeMessage).type === BridgeMessageType.NATIVE_PLAYBACK;
}
