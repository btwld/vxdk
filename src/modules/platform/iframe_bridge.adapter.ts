import { BrowserUtils } from '../common/utils';
import type {
  BridgeRequest,
  OnMessageCallback,
} from './platform_bridge.controller';
import type { IPlatformBridgeAdapter } from './platform_bridge.controller';

export class IFrameBridge implements IPlatformBridgeAdapter {
  public postMessage(req: BridgeRequest): void {
    if (BrowserUtils.isIframe) {
      window.parent.postMessage(req, '*');
    }
  }

  public bindListeners = (callback: OnMessageCallback) => {
    if (BrowserUtils.isIframe) {
      window.addEventListener('message', ({ data }) => callback(data));
    }
  };
}
