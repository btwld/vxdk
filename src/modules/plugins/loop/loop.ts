import { Plugin } from '../../common/module';
import { PLAYBACK_EVENT } from '../../events/events.dto';

type LoopConfig = boolean;

export class LoopPlugin extends Plugin<LoopConfig> {
  public name = 'loop';

  public loop = false;

  connectedCallback() {
    this.loop = this.getConfig();

    if (this.loop) {
      this.on(PLAYBACK_EVENT.ENDED, () => {
        this.controller.replay();
      });
    }
  }
}
