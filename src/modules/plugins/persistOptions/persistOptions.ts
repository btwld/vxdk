import { Plugin } from '../../common/module';
import { PLAYBACK_EVENT } from '../../events/events.dto';

export class PersistOptionsPlugin extends Plugin {
  public name = 'persist-mute';
  private _isMuted = false;
  private _playbackRate = 1;

  connectedCallback() {
    const persistedIsMuted = this.storage.getItem<boolean>('isMuted');
    const persistedPlaybackRate = this.storage.getItem<number>('playbackRate');

    const ctx = this.controller.getContext();

    if (persistedIsMuted === null) {
      this._isMuted = ctx.options.muted;
    } else {
      this._isMuted = persistedIsMuted;
    }

    if (persistedPlaybackRate === null) {
      this._playbackRate = ctx.playback.playbackRate;
    } else {
      this._playbackRate = persistedPlaybackRate;
    }

    this.on(PLAYBACK_EVENT.LOADSTART, () => {
      this.controller.setPlaybackRate(this._playbackRate);

      if (this._isMuted) {
        this.controller.mute();
      } else {
        this.controller.unmute();
      }
    });

    this.on(PLAYBACK_EVENT.VOLUME_CHANGED, () => {
      const isMuted = this.controller.isMuted();
      this._isMuted = isMuted;
      try {
        this.storage.setItem('isMuted', isMuted);
      } catch (error) {
        this.logger.error('Failed to persist isMuted:', error);
      }
    });

    this.on(PLAYBACK_EVENT.PLAYBACKRATE_CHANGE, () => {
      const rate = this.controller.getPlaybackRate();
      this._playbackRate = rate;
      try {
        this.storage.setItem('playbackRate', rate);
      } catch (error) {
        this.logger.error('Failed to persist playbackRate:', error);
      }
    });
  }
}
