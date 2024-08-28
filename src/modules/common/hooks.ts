export type NextFn = (...args: any) => void;
export type BeforeHookCallback = (nextFn: () => void, ...args: any) => void;

interface HookFn {
  name: string;
  callback: NextFn;
}

interface BeforeHookFn extends HookFn {
  callback: BeforeHookCallback;
}

export class Hook<T> {
  private beforeHooks: BeforeHookFn[] = [];
  private afterHooks: HookFn[] = [];

  private origFunctions: any = {};

  constructor(private readonly module: T) {}

  public before(name: keyof T, callback: BeforeHookCallback) {
    this.hookFunction(name);

    this.beforeHooks.push({
      name: name as string,
      callback,
    });
  }

  public removeBefore(name: keyof T, callback: BeforeHookCallback) {
    this.beforeHooks = this.beforeHooks.filter((cb) => {
      return cb.name !== name || cb.callback !== callback;
    });
  }

  public after(name: keyof T, callback: NextFn) {
    this.hookFunction(name);

    this.afterHooks.push({
      name: name as string,
      callback,
    });
  }

  public removeAfter(name: keyof T, callback: BeforeHookCallback) {
    this.afterHooks = this.afterHooks.filter((cb) => {
      return cb.name !== name || cb.callback !== callback;
    });
  }

  private hookFunction(name: keyof T) {
    if (typeof this.module[name] !== 'function') {
      throw new Error(`The method "${String(name)}" does not exist in ${this}`);
    }

    if (this.origFunctions[name]) {
      return;
    }

    // Store the original function and apply a hook.
    this.origFunctions[name] = this.module[name];

    this.module[name] = this.runHookedFunction(name as string) as any;
  }

  private runHookedFunction =
    (name: string) =>
    (...args: any) => {
      const filterFn = (h: HookFn) => h.name === name;
      const selectedBeforeHooks = this.beforeHooks.filter(filterFn);
      const selectedAfterHooks = this.afterHooks.filter(filterFn);
      let beforeIndex = -1;
      let afterIndex = -1;

      const runOrigFunction = () =>
        this.origFunctions[name].call(this.module, ...args);

      const runAfterHook = () => {
        const hook = selectedAfterHooks[(afterIndex += 1)];

        // End if there are no more hooks
        if (!hook) return;
        // We've got a hook to call, call it.
        hook.callback.call(null, ...args);
        runAfterHook();
      };

      const runBeforeHook = () => {
        const hook = selectedBeforeHooks[(beforeIndex += 1)];

        // If we have no hook to call anymore, call the original function.
        if (!hook) {
          runOrigFunction();
          runAfterHook();
          return;
        }

        let proceed = false;
        const next = () => (proceed = true);

        // We've got a hook to call, call it.
        hook.callback.call(null, next, ...args);

        // Did the hook proceed?
        if (proceed) runBeforeHook();
      };

      runBeforeHook();
    };
}
