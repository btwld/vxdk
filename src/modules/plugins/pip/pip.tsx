import type { Context } from '../../context/context';
import { CONTEXT_EVENT } from '../../events/events.dto';
import { UI_PLUGIN_LOCATION, UiPlugin } from '../../ui/ui_interface';
import PipButton from './pip.component';

export class PipPlugin extends UiPlugin {
  public name = 'pip';
  public isPip = false;
  private _mediaElement: HTMLVideoElement;

  public readonly renderLocation = UI_PLUGIN_LOCATION.CONTROL_BAR;

  constructor(ctx: Context) {
    super(ctx);
    // TODO: Make this comparable with other player engines
    this._mediaElement = ctx.playback.nativeEl as HTMLVideoElement;
  }

  connectedCallback() {
    if (!this.isPipSupported) return;
    this._mediaElement?.addEventListener('enterpictureinpicture', () => {
      this.isPip = true;
      this.emit(CONTEXT_EVENT.PIP_CHANGED);
    });

    this._mediaElement.addEventListener('leavepictureinpicture', () => {
      this.isPip = false;
      this.emit(CONTEXT_EVENT.PIP_CHANGED);
    });
  }

  public get isPipSupported(): boolean {
    return 'pictureInPictureEnabled' in document;
  }

  public async enter() {
    if (!this.isPipSupported) return;
    // Exit fullscreen if needed
    if (this.controller.isFullscreen()) {
      this.controller.exitFullscreen();
    }
    await this._mediaElement.requestPictureInPicture();
  }

  public async exit() {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    }
  }
  public async togglePip() {
    if (this.isPip) {
      await this.exit();
    } else {
      await this.enter();
    }
  }

  public render = () => {
    return <PipButton onPress={() => this.togglePip()} />;
  };
}
