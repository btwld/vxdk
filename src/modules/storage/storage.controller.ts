import type { StorageRequest } from '../../main';
import type { PlatformBridgeController } from '../platform/platform_bridge.controller';
import { BridgeMessageType } from '../platform/platform_bridge.controller';
import { LocalStorage } from './local_storage';

export type StorageKey = string;
export type StorageData = Map<string, any>;

export abstract class IStorageAdapter {
  abstract getItem<T>(key: string): T | null;
  abstract setItem<T>(key: string, value: T): void;
  abstract removeItem(key: string): void;
  abstract clear(): void;
  abstract getAllKeys(): string[];
  abstract length: number;
}
export class StorageController {
  private readonly _adapter: IStorageAdapter;
  private readonly _bridge: PlatformBridgeController;
  private _namespace = 'vxdk';

  private constructor(_bridge: PlatformBridgeController) {
    this._adapter = new LocalStorage();
    this._bridge = _bridge;
  }

  protected buildKey(key: string) {
    return this._namespace + '-' + key;
  }

  static create(bridge: PlatformBridgeController): StorageController {
    return new StorageController(bridge);
  }

  private async bridgeRequest<T>(
    action: StorageRequest['action'],
    key?: string,
    value?: any,
  ) {
    const args = [];

    if (key) args.push(key);
    if (value) args.push(value);

    return (await this._bridge.postRequest({
      type: BridgeMessageType.STORAGE,
      action,
      args: args,
    } as StorageRequest)) as T;
  }

  public async load(): Promise<void> {
    const keys = await this.bridgeRequest<string[] | null>('getAllKeys');

    if (!keys) return;

    for (const key of keys) {
      const value = await this.bridgeRequest<string[] | null>('getItem', key);

      this._initialSetItem(key, value);
    }
  }

  private _initialSetItem<T>(key: string, value: T) {
    this._adapter.setItem<T>(key, value);
  }

  public getItem<T>(key: string) {
    return this._adapter.getItem<T>(this.buildKey(key));
  }
  public setItem<T>(key: string, value: T) {
    this._adapter.setItem<T>(this.buildKey(key), value);
    this.bridgeRequest('setItem', this.buildKey(key), value);
  }
  public removeItem(key: string) {
    this._adapter.removeItem(this.buildKey(key));
    this.bridgeRequest('removeItem', this.buildKey(key));
  }
  public clear() {
    this._adapter.clear();
    this.bridgeRequest('clear');
  }
  public getAllKeys() {
    return this._adapter.getAllKeys();
  }
  public get length() {
    return this._adapter.length;
  }
}
