import { generateUUID, Logger } from '../common/utils';
import { Event } from '../events/dispatcher';
import { EventController } from '../events/event.controller';
import { BRIDGE_EVENT, PLAYBACK_EVENT } from '../events/events.dto';

import type { Options } from '../options/options.dto';

import type { NativePlaybackState } from './comm/native_playback';
import { isNativePlaybackMessage } from './comm/native_playback';
import type { PlaybackRequest } from './comm/playback_request';

import { IFrameBridge } from './iframe_bridge.adapter';

type CallbackMap = { [key: string]: BridgeCallback };
export type BridgeCallback<T = any> = (data: T) => void;

export type OnMessageCallback = (res: BridgeMessage) => void;

export function createBridgeEvents() {
  const events = {} as BridgeEvents;
  Object.values(PLAYBACK_EVENT).forEach((value) => {
    events[value] = Event.create<any>();
  });

  Object.values(BRIDGE_EVENT).forEach((value) => {
    events[value] = Event.create<any>();
  });

  return events;
}

export type BridgeEvents = {
  [key in PLAYBACK_EVENT | BRIDGE_EVENT]: Event<any>;
};

export interface IPlatformBridgeAdapter {
  postMessage(req: BridgeRequest): void;
  bindListeners(callback: OnMessageCallback): void;
}

export class PlatformBridgeController extends EventController {
  private callbacks: CallbackMap = {} as CallbackMap;
  private _playbackState: NativePlaybackState;

  protected get logger() {
    return new Logger('PlatformBridgeController');
  }

  private constructor(private readonly adapter: IPlatformBridgeAdapter) {
    super(createBridgeEvents());
    this.adapter.bindListeners(this.onMessage.bind(this));
    this._playbackState = {} as NativePlaybackState;
  }

  public static create(options: Partial<Options>) {
    const bridge = options.bridgeAdapter
      ? new options.bridgeAdapter()
      : new IFrameBridge();

    return new PlatformBridgeController(bridge);
  }

  public async postPlayback<T = any>(
    action: PlaybackRequest['action'],
    args?: PlaybackRequest['args'],
  ): Promise<T> {
    return this.postRequest({
      type: BridgeMessageType.PLAYBACK,
      args,
      action,
    });
  }

  public getPlaybackState() {
    return this._playbackState;
  }

  public async postRequest<T = any>(
    payload: Omit<BridgeRequest, 'id'>,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const req = {
        id: generateUUID(),
        ...payload,
      };

      this.callbacks[req.id] = (res: BridgeMessage<T>) => {
        if (res.error) {
          reject(res.data);
        } else {
          resolve(res.data);
        }
      };
      this.adapter.postMessage(req);
    });
  }
  protected onMessage<T>(res: BridgeMessage<T>) {
    if (isNativePlaybackMessage(res)) {
      this.logger.info('ONMESSSAGE', res);
      this._playbackState = res.data;

      this.emit(res.eventName);
      return;
    }

    // Return if invalid payload
    if (!res || !res.id) return;
    const callback = this.callbacks[res.id];
    // Return if no callback matches id
    if (!callback) return;

    callback(res);
    delete this.callbacks[res.id];
  }
}

export interface IBridgeMessage {
  id: string;
  type: BridgeMessageType;
}
export interface BridgeRequest extends IBridgeMessage {
  action?: string;
  args?: any[];
}

export interface BridgeMessage<T = any> extends IBridgeMessage {
  error: boolean;
  data: T;
}

export enum BridgeMessageType {
  PLAYBACK = 'PLAYBACK',
  STORAGE = 'STORAGE',
  NATIVE_PLAYBACK = 'NATIVE_PLAYBACK',
}
