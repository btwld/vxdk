import { Plugin } from '../../common/module';

enum KeyCodes {
  SPACEBAR = 32,
  K = 75,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  M = 77,
  F = 70,
  C = 67,
  I = 73,
}

const SKIP_CURRENTTIME_OFFSET = 5;

const SKIP_VOLUME_OFFSET = 0.1;

export class KeyboardNavigationPlugin extends Plugin {
  public name = 'keyboard';

  private _hasFocus = false;

  connectedCallback() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
    window.removeEventListener('mousedown', this.onMouseDown.bind(this));
  }

  private onMouseDown(event: MouseEvent) {
    this._hasFocus =
      // Its the element itself
      event.target === this.controller.getRootElement() ||
      // Its a nested element
      this.controller.getRootElement().contains(event.target as Node);
  }

  private onKeyDown(event: KeyboardEvent) {
    if (
      this.controller.getOptions().keyboardNavigation !== 'focus' ||
      !this._hasFocus
    ) {
      return;
    }

    let prevTime = this.controller.getCurrentTime() - SKIP_CURRENTTIME_OFFSET;
    let nextTime = this.controller.getCurrentTime() + SKIP_CURRENTTIME_OFFSET;
    let nextVolume = this.controller.getVolume() + SKIP_VOLUME_OFFSET;
    let prevVolume = this.controller.getVolume() - SKIP_VOLUME_OFFSET;

    switch (event.which || event.keyCode) {
      // Toggles play and pause.
      case KeyCodes.SPACEBAR:
      case KeyCodes.K:
        if (this.controller.isPlaying()) {
          this.controller.pause();
        } else {
          this.controller.play();
        }
        event.preventDefault();
        break;

      // Seeks back x seconds.
      case KeyCodes.LEFT_ARROW:
        if (prevTime < 0) {
          prevTime = 0;
        }
        this.controller.seekTo(prevTime);

        event.preventDefault();
        break;

      // Seeks forward x seconds.
      case KeyCodes.RIGHT_ARROW:
        if (nextTime > this.controller.getDuration()) {
          nextTime = this.controller.getDuration();
        }
        this.controller.seekTo(nextTime);

        event.preventDefault();
        break;

      // Increases the volume.
      case KeyCodes.UP_ARROW:
        if (nextVolume > 1) {
          nextVolume = 1;
        }
        this.controller.setVolume(nextVolume);

        event.preventDefault();
        break;

      // Decreases the volume.
      case KeyCodes.DOWN_ARROW:
        if (prevVolume < 0) {
          prevVolume = 0;
        }

        this.controller.setVolume(prevVolume);

        event.preventDefault();
        break;

      // Toggles mute.
      case KeyCodes.M:
        if (this.controller.getVolume() > 0) {
          this.controller.setVolume(0);
        } else {
          this.controller.setVolume(1);
        }
        event.preventDefault();
        break;

      // Toggles fullscreen.
      case KeyCodes.F:
        this.controller.toggleFullscreen();

        event.preventDefault();

        break;

      case KeyCodes.C:
        event.preventDefault();
        break;

      case KeyCodes.I:
        event.preventDefault();
        break;
    }
  }
}
