import type { Disposable, Listener } from '../common/types';
import { FunctionUtils, ObjectUtils } from '../common/utils';

/**
 * Event class that provides methods to emit and listen to events.
 *
 * @category Events
 */
export class Event<T> {
  private listeners: Listener<T>[] = [];
  private listenersOncer: Listener<T>[] = [];
  private previousData?: T;

  static create<T = void>(): Event<T> {
    return new Event<T>();
  }

  public on(listener: Listener<T>): Disposable {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener),
    };
  }

  public onRateLimited(listener: Listener<T>, ms = 500): Disposable {
    this.listeners.push(FunctionUtils.throttle(listener, ms));
    return {
      dispose: () => this.off(listener),
    };
  }

  public once(listener: Listener<T>): void {
    this.listenersOncer.push(listener);
  }

  public off(listener: Listener<T>) {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  public emit(data: T) {
    /** Update any general listeners */
    this.listeners.forEach((listener) => listener(data));

    /** Clear the `once` queue */
    if (this.listenersOncer.length > 0) {
      const toCall = this.listenersOncer;
      this.listenersOncer = [];
      toCall.forEach((listener) => listener(data));
    }
    this.previousData = data;
  }

  public emitIfChanged(data: T) {
    if (Array.isArray(data)) {
      throw new Error('Arrays are not supported');
    }

    if (!this.previousData && data) {
      this.emit(data);
      return;
    }

    if (ObjectUtils.isObject(data)) {
      if (!ObjectUtils.shallowEqual(data, this.previousData)) {
        this.emit(data);
      }
      return;
    }

    if (data !== this.previousData) {
      this.emit(data);
    }
  }

  public detach() {
    this.listeners = [];
    this.listenersOncer = [];
  }

  public pipe(te: Event<T>): Disposable {
    return this.on((e) => te.emit(e));
  }
}
