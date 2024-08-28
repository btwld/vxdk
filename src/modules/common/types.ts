// Enums

export type Enum<E> = Record<keyof E, number | string> & {
  [k: number]: keyof E;
};

export type Constructor<T = unknown> = new (...args: any[]) => T;
export type AbstractConstructor<T> = abstract new (...args: any[]) => T;

export type LogFunction = (...args: any) => void;

export interface Json {
  [x: string]: string | number | boolean | Date | Json | JsonArray;
}
export type JsonArray = Array<
  string | number | boolean | Date | Json | JsonArray
>;

export interface Listener<T> {
  (event: T): void;
}

export interface Disposable {
  dispose(): void;
}

export type Timer = ReturnType<typeof setTimeout>;

