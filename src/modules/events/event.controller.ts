import type { Listener } from '../common/types';

import { Event } from './dispatcher';
import { CONTEXT_EVENT, PLAYBACK_EVENT } from './events.dto';

type ExtractEventType<P> = P extends Event<infer T> ? T : never;

/**
 * Event controller class that provides methods to emit and listen to events.
 * @category Events
 */

export class EventController {
  private readonly _events: VxdkEvents;

  constructor(events: VxdkEvents) {
    this._events = events;
  }

  public emit = (
    name: keyof VxdkEvents,
    data?: ExtractEventType<VxdkEvents>,
  ) => {
    this._events[name].emit(data);
  };

  public emitIfChanged = (name: keyof VxdkEvents, data: any) => {
    this._events[name].emitIfChanged(data);
  };

  public off = (name: keyof VxdkEvents, listener: Listener<void>) => {
    this._events[name].off(listener);
  };

  public on = (name: keyof VxdkEvents, listener: Listener<void>) => {
    return this._events[name].on(listener);
  };

  public once = (name: keyof VxdkEvents, listener: Listener<void>) => {
    return this._events[name].once(listener);
  };

  public registerEvents(eventNames: string[]) {
    eventNames.forEach((eventName) => {
      this._events[eventName] = Event.create();
    });
  }

  protected unregisterEvents = () => {
    for (const key of Object.entries(this._events)) {
      key[1].detach();
    }
  };
}

export function createVxdkEvents() {
  const events = {} as VxdkEvents;

  Object.values(CONTEXT_EVENT).forEach((value) => {
    events[value] = Event.create();
  });

  Object.values(PLAYBACK_EVENT).forEach((value) => {
    events[value] = Event.create();
  });

  return events;
}

export type VxdkEvents = {
  [key: string]: Event<any>;
};
