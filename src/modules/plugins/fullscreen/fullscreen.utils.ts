const prefixes = ['', 'moz', 'webkit', 'ms'];
export namespace FullscreenUtils {
  export function fullscreenElement() {
    return (
      (document as any).fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );
  }

  export function onChange(callback: () => void) {
    prefixes.forEach(function (prefix) {
      document.addEventListener(prefix + 'fullscreenchange', () => callback());
    });
  }

  export function onError(callback: (error: Event) => void) {
    prefixes.forEach(function (prefix) {
      document.addEventListener(prefix + 'fullscreenerror', (err) =>
        callback(err),
      );
    });
  }

  export function request(el: HTMLElement) {
    const elem = el as any;
    if (elem.requestFullscreen) {
      return elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      if (typeof elem.then === 'function')
        return elem.webkitRequestFullscreen();
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      return elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      return elem.msRequestFullscreen();
    } else if (
      elem.querySelector &&
      elem.querySelector('video') &&
      elem.querySelector('video').webkitEnterFullScreen
    ) {
      elem.querySelector('video').webkitEnterFullScreen();
    } else if (elem.webkitEnterFullScreen) {
      elem.webkitEnterFullScreen();
    }
  }
  export function isFullscreen() {
    return !!fullscreenElement();
  }
  export function exit() {
    const doc = document as any;
    if (doc.exitFullscreen) doc.exitFullscreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    /* Safari */ else if (doc.webkitCancelFullScreen)
      doc.webkitCancelFullScreen();
    /* Old Safari */ else if (doc.mozCancelFullScreen)
      doc.mozCancelFullScreen();
    /*  Old Firefox */ else if (doc.msExitFullscreen)
      doc.msExitFullscreen(); /* IE11 */
  }
  export function isEnabled() {
    return !!(
      document.fullscreenEnabled ||
      (document as any).webkitFullscreenEnabled ||
      (document as any).mozFullScreenEnabled ||
      (document as any).msFullscreenEnabled
    );
  }
}
