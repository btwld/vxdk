import type { Accessor, ParentComponent } from 'solid-js';
import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from 'solid-js';

export type SettingsMenuContextValue = {
  navigation: Accessor<SettingsNavigation>;
  isOpen: Accessor<boolean>;
  inSubMenu: Accessor<boolean>;
  inMainMenu: Accessor<boolean>;
  toggleMenu: () => void;
  goto: (navigation: SettingsNavigation) => void;
  goBack: () => void;
};

export enum SettingsNavigation {
  closed,
  main,
  speed,
  quality,
}

export const SettingsMenuContext = createContext<SettingsMenuContextValue>();

export const SettingsMenuProvider: ParentComponent = (props) => {
  const [navigation, setNavigation] = createSignal(SettingsNavigation.closed);
  const [isOpen, setIsOpen] = createSignal(false);
  const [inSubMenu, setInSubMenu] = createSignal(false);
  const [inMainMenu, setInMainMenu] = createSignal(false);

  createEffect(() => {
    setIsOpen(navigation() !== SettingsNavigation.closed);
    setInMainMenu(navigation() === SettingsNavigation.main);
    setInSubMenu(isOpen() && navigation() !== SettingsNavigation.main);
  });

  const goBack = () => {
    if (inSubMenu()) {
      setNavigation(SettingsNavigation.main);
    }
  };

  const toggleMenu = () => {
    if (isOpen()) {
      setNavigation(SettingsNavigation.closed);
    } else {
      setNavigation(SettingsNavigation.main);
    }
  };

  const goto = (navigation: SettingsNavigation) => {
    setNavigation(navigation);
  };

  const store: SettingsMenuContextValue = {
    navigation,
    isOpen,
    inSubMenu,
    inMainMenu,
    goBack,
    toggleMenu,
    goto,
  };

  return (
    <SettingsMenuContext.Provider value={store}>
      {props.children}
    </SettingsMenuContext.Provider>
  );
};

export function useSettingsMenu(): SettingsMenuContextValue {
  const settingsMenu = useContext(SettingsMenuContext);
  if (!settingsMenu) {
    throw new Error(
      'useSettingsMenu must be used within a SettingsMenuProvider',
    );
  }
  return settingsMenu;
}
