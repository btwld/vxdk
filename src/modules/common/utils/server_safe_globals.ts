const windowShim = {
  HTMLElement: function HTMLElement() {
    return {
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    };
  },
  customElements: {
    get: () => {},
    define: () => {},
    whenDefined: () => {},
  },
  CustomEvent: () => {},
};

const documentShim = {
  createElement: function () {
    return windowShim.HTMLElement();
  },
  dispatchEvent: () => {},
};

export const isServer =
  typeof window === 'undefined' || typeof window.customElements === 'undefined';
export const Window = isServer ? windowShim : window;
export const Document = isServer ? documentShim : window.document;
