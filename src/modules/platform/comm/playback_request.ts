import { BridgeMessageType } from '../platform_bridge.controller';
import type { BridgeRequest } from '../platform_bridge.controller';
import type { Playback } from '../../playback/base_playback';

export interface PlaybackRequest extends BridgeRequest {
  type: BridgeMessageType.PLAYBACK;
  action: keyof Playback;
}

export function isPlaybackRequest(
  command: BridgeRequest,
): command is PlaybackRequest {
  return (command as PlaybackRequest).type === BridgeMessageType.PLAYBACK;
}
