import type { State } from '@plugins/state/state.dto';
import type { ComponentProps, ParentComponent } from 'solid-js';
import { createContext, useContext } from 'solid-js';
import { type Store } from 'solid-js/store';
import { BrowserUtils } from '../../../common/utils';
import type { Controller } from '../../../context/controller';
import {
    ContainerPlugins,
    PortalPlugins,
} from '../../components/molecules/RenderUIPlugins';

import { SettingsProvider } from '@ui/providers/ui_settings.provider';
import { I18nProvider } from '../../locale/i18n_provider';
import type { UIComponentsStore } from '../../ui_controller';
import { createVxdk } from '../hooks/create-vxdk';
import styles from './ui_context.module.css';

interface UIContainerContextValues {
  state: Store<State>;
  controller: Controller;
  plugins: UIComponentsStore;
}

const UIContainerContext = createContext<UIContainerContextValues>(
  {} as UIContainerContextValues,
);

interface UIContainerProviderProps {
  initialController: Controller;
  ref?: ComponentProps<'div'>['ref'];
}

export const UIContainerProvider: ParentComponent<UIContainerProviderProps> = (
  props,
) => {
  const { state, plugins } = createVxdk(props.initialController);

  const providerValues = () => {
    return {
      controller: props.initialController,
      state: state,
      plugins: plugins,
    };
  };

  return (
    <UIContainerContext.Provider value={providerValues()}>
      <I18nProvider>
        <SettingsProvider>
          <div
            data-testid="root_container"
            class={styles.container}
            ref={props.ref}
            classList={{
              [styles.is_iframe]: BrowserUtils.isIframe,
            }}
          >
            <ContainerPlugins />
            <PortalPlugins />
          </div>
        </SettingsProvider>
      </I18nProvider>
    </UIContainerContext.Provider>
  );
};

export const useVxdkContext = () => useContext(UIContainerContext);

export default UIContainerProvider;
