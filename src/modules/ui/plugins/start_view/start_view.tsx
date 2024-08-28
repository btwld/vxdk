import { Show } from 'solid-js';
import PlayIcon from '../../icons/play.svg';
import { useVxdk } from '../../providers/hooks/use-controller';
import { useVxdkState } from '../../providers/hooks/use-state';
import { UiContainerPlugin } from '../../ui_interface';
import styles from './start_view.module.css';

export class StartView extends UiContainerPlugin {
  public readonly name = 'start_view_ui';
  public render = () => {
    const vxdk = useVxdk();
    const { waitingForUser, options } = useVxdkState();

    return (
      <Show when={waitingForUser()}>
        <button
          data-testid="start_view_play"
          class={styles.startview}
          onClick={() => vxdk.play()}
        >
          <div
            class={styles.poster}
            style={{
              'background-image': `url(${options().poster})`,
            }}
          />

          <PlayIcon
            class={styles.button}
            style={{ height: '50px', width: '50px' }}
          />
        </button>
      </Show>
    );
  };
}
