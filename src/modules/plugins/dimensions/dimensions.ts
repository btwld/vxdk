import { Plugin } from '../../common/module';
import { FunctionUtils } from '../../common/utils/function.utils';
import type { Context } from '../../context/context';
import { CONTEXT_EVENT } from '../../events/events.dto';
import type { ObserverSubscription } from './dimensions.utils';
import { resizeObserver } from './dimensions.utils';

export class DimensionsPlugin extends Plugin {
  public name = 'dimensions';

  private _observer: ObserverSubscription;
  private _width: number;
  private _height: number;

  constructor(ctx: Context) {
    super(ctx);

    const rect = this.controller.getRootElement().getBoundingClientRect();
    this._height = rect.height;
    this._width = rect.width;

    const debouncedOnResizeContainer = FunctionUtils.debounce(
      this._updateDimensions.bind(this),
      250,
    );
    this._observer = resizeObserver(
      this.controller.getRootElement(),
      debouncedOnResizeContainer.bind(this),
    );
  }

  connectedCallback() {
    this.on(CONTEXT_EVENT.READY, this._updateDimensions.bind(this));
  }

  disconnectedCallback() {
    this._observer.remove();
  }

  private _updateDimensions() {
    const rect = this.controller.getRootElement().getBoundingClientRect();
    this._height = rect.height;
    this._width = rect.width;
    this.emit(CONTEXT_EVENT.DIMENSION_CHANGED);
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }
}
