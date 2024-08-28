import type { IStorageAdapter } from './storage.controller';

export class LocalStorage implements IStorageAdapter {
  public getItem<T>(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;

      let data = value;
      try {
        data = JSON.parse(value);
      } catch (_) {
        data = value;
      }

      return data as unknown as T;
    } catch (_) {
      return null;
    }
  }

  public setItem<T>(key: string, value: T) {
    if (!key) throw Error('No key provided');

    localStorage.setItem(key, JSON.stringify(value));
  }

  public getAllKeys() {
    return Object.keys(localStorage);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public get length() {
    return localStorage.length;
  }

  public clear() {
    localStorage.clear();
  }
}
