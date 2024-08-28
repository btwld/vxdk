import { BrowserUtils } from '../../common/utils';
import { CONTEXT_EVENT } from '../../events/events.dto';
import type { HTML5Player } from '../../playback/html5';
import { UiControlBarPlugin } from '../../ui/ui_interface';
import type { DocumentPositionDto } from './fullscreen.dto';
import { FullscreenUtils } from './fullscreen.utils';
import FullScreenButton from './fullscreen_button';

export class FullscreenPlugin extends UiControlBarPlugin {
  public name = 'fullscreen';

  public order = 10;

  private documentPos: DocumentPositionDto = null;

  connectedCallback() {
    if (FullscreenUtils.isEnabled()) {
      FullscreenUtils.onChange(() => {
        this._handleDocumentPos(FullscreenUtils.isFullscreen());
        this.emit(CONTEXT_EVENT.FULLSCREEN_CHANGED);
      });

      FullscreenUtils.onError((err: any) => {
        this.logger.error(err);
      });
    }
  }

  public get isFullscreen() {
    return FullscreenUtils.isFullscreen();
  }

  public enter() {
    try {
      FullscreenUtils.request(this.controller.getRootElement());
    } catch (error) {
      this.logger.error('Failed to enter fullscreen', error);
      // Fullscreen the video directly
      if (BrowserUtils.isIOS) {
        const playback = this.controller.getPlaybackAdapter() as HTML5Player;
        (playback.nativeEl as any).webkitEnterFullscreen();
      }
    }
  }

  public exit() {
    FullscreenUtils.exit();
  }

  public toggleFullscreen() {
    if (this.isFullscreen) {
      this.exit();
    } else {
      this.enter();
    }
  }
  // Code below evades the following Chromium bug:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=142427.
  private _handleDocumentPos(isFullscreen: boolean) {
    if (isFullscreen) {
      const x = window.pageXOffset;
      const y = window.pageYOffset;
      if (x || y) {
        this.documentPos = {
          x: x || 0,
          y: y || 0,
        };
      }
    } else {
      if (!this.documentPos) return;

      window.scrollTo(this.documentPos.x, this.documentPos.y);
      this.documentPos = null;
    }
  }

  public render = () => {
    return <FullScreenButton />;
  };
}
