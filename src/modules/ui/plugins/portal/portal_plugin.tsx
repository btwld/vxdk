import { UiPortalPlugin } from '../../ui_interface';

export class PortalPlugin extends UiPortalPlugin {
  public readonly name = 'portal-plugin';

  public mount() {
    return document.getElementById('portal-plugin');
  }

  public render = () => {
    // const { state } = useVxdkContext();

    return (
      <div style={{ 'background-color': 'red', height: '400', width: '400' }}>
        {' '}
      </div>
    );
  };
}
