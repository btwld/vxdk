import type { Context } from '../../context/context';
import type { HTML5Player } from '../../playback/html5';
import { UiControlBarPlugin } from '../../ui/ui_interface';
import AirPlayButton from './airplay_component';

export enum AIRPLAY_EVENTS {
  AVAILABILITY_CHANGED = 'airplay.availability.changed',
  PLAYBACK_TARGET_CHANGED = 'airplay.playback.target.changed',
}

const airplayAvailableEvent = 'webkitplaybacktargetavailabilitychanged';
const airplayTargetEvent = 'webkitcurrentplaybacktargetiswirelesschanged';

export class AirPlayPlugin extends UiControlBarPlugin {
  public name = 'airplay';

  private _enabled = false;

  constructor(ctx: Context) {
    super(ctx);
  }

  protected get events() {
    return [
      AIRPLAY_EVENTS.AVAILABILITY_CHANGED,
      AIRPLAY_EVENTS.PLAYBACK_TARGET_CHANGED,
    ];
  }

  public connectedCallback(): void {
    const availableCb = (event: any) => {
      this._enabled = event.availability === 'available';

      if (this._enabled) {
        this._nativeEl.removeEventListener(airplayAvailableEvent, availableCb);
      }

      this.emit(AIRPLAY_EVENTS.AVAILABILITY_CHANGED);
    };

    this._nativeEl.addEventListener(airplayAvailableEvent, availableCb);

    this._nativeEl.addEventListener(airplayTargetEvent, () => {
      this.emit(AIRPLAY_EVENTS.PLAYBACK_TARGET_CHANGED);
    });
  }

  private get _nativeEl(): HTMLVideoElement {
    const playback = this.controller.getContext().playback as HTML5Player;
    return playback.nativeEl;
  }

  public showPlaybackTargetPicker() {
    (this._nativeEl as any).webkitShowPlaybackTargetPicker();
  }

  public isEnabled = () => {
    return this._enabled;
  };

  public readonly render = () => {
    return <AirPlayButton />;
  };
}
