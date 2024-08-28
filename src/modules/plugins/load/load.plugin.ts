import type { NextFn } from '../../common/hooks';
import { Plugin } from '../../common/module';
import { PLAYBACK_EVENT } from '../../events/events.dto';

type LoadConfig = boolean;

// Plugin that guarantees that video will be loaded when Play method is called
export class LoadPlugin extends Plugin<LoadConfig> {
  public name = 'loadOnPlay';

  public hasLoaded = false;

  connectedCallback() {
    const triggerHasLoaded = () => {
      this.hasLoaded = true;
    };

    const onBeforePlay = async (next: NextFn) => {
      if (!this.hasLoaded) {
        this.controller.load();
        this.hasLoaded = true;
        next();

        this.off(PLAYBACK_EVENT.LOADEDMETADATA, triggerHasLoaded);
        this.controller.hook.removeBefore('play', onBeforePlay);
      } else {
        next();
      }
    };

    this.on(PLAYBACK_EVENT.LOADEDMETADATA, triggerHasLoaded);
    this.controller.hook.before('play', onBeforePlay);
  }
}
