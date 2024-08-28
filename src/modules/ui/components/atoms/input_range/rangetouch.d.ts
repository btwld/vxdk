declare module 'rangetouch' {
  class RangeTouch {
    constructor(input: HTMLInputElement | string, options?: any);
    destroy: () => void;
  }

  export default RangeTouch;
}
