import { BridgeMessageType } from '../platform_bridge.controller';
import type { BridgeRequest } from '../platform_bridge.controller';
import type { StorageController } from '../../storage/storage.controller';

export interface StorageRequest extends BridgeRequest {
  type: BridgeMessageType.STORAGE;
  action: keyof StorageController;
}

export function isStorageRequest(
  command: BridgeRequest,
): command is StorageRequest {
  return (command as StorageRequest).type === BridgeMessageType.STORAGE;
}
