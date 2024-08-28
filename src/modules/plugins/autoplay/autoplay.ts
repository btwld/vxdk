import { Plugin } from '../../common/module';
import { canAutoPlay } from '../../common/utils/canautoplay';
import { PLAYBACK_EVENT } from '../../events/events.dto';

interface AutoPlayData {
  autoplayAllowed: boolean;
  autoplayRequiresMuted: boolean;
}

export class AutoplayPlugin extends Plugin {
  public name = 'autoplay';
  private _checked = false;
  private _data: AutoPlayData = {
    autoplayAllowed: false,
    autoplayRequiresMuted: false,
  };

  public get autoplayAllowed() {
    return this._data;
  }
  public get autoplayRequiresMuted() {
    return this._data;
  }

  connectedCallback() {
    // Get data from storage
    const data = this.storage.getItem<AutoPlayData>(this.name);
    if (data) {
      this._checked = true;
      this._data = data;
    }
    this.on(PLAYBACK_EVENT.LOADSTART, () => {
      this._checkAutoPlay();
    });
  }

  private async _checkAutoPlay() {
    // If value has not been checked, run check
    if (this._checked === false) {
      // Check if can autoplay if not muted
      const { result } = await canAutoPlay.video({
        timeout: 500,
        muted: false,
      });

      if (result === false) {
        this._data.autoplayAllowed = false;
      } else {
        this._data.autoplayAllowed = true;
      }
      // If could not autoplay with muted, check if it can autoplay with muted
      if (result === false) {
        const { result: mutedResult } = await canAutoPlay.video({
          timeout: 500,
          muted: true,
        });
        if (mutedResult !== false) {
          this._data.autoplayRequiresMuted = true;
        }
      }

      this._checked = true;
      // Store response in localstorage
      this.storage.setItem(this.name, this._data);
      // Try to auto play
    }
    this._tryAutoPlay();
  }

  private async _tryAutoPlay() {
    try {
      if (this._data.autoplayAllowed) {
        this.controller.play();
        return;
      }

      if (this._data.autoplayRequiresMuted) {
        if (this.controller.getOptions().muted) {
          this.controller.play();
          return;
        } else {
          this.logger.warn('Autoplay requires video to be muted');
          this.controller.mute();
          this.controller.play();
          return;
        }
      }
    } catch (err) {
      this.logger.error('Error trying to autoplay', err);
    }
  }
}
