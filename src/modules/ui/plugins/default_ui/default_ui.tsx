import { Show } from 'solid-js';
import ControlBar from '../../components/organisms/control_bar/control_bar';
import Loading from '../../components/organisms/loading/loading';
import { useVxdkContext } from '../../providers/ui_context/ui_context';
import { UiContainerPlugin } from '../../ui_interface';

export class DefaultUI extends UiContainerPlugin {
  public readonly name = 'default_ui';

  public render = () => {
    const { state } = useVxdkContext();

    return (
      <>
        <Loading />
        <Show when={state.options.showUI} fallback={<div />}>
          <ControlBar />
        </Show>
      </>
    );
  };
}
