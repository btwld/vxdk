import { useLocale } from '@ui/locale';
import type { Component } from 'solid-js';
import { Match, Show, Switch } from 'solid-js';
import {
  SettingsNavigation,
  useSettingsMenu,
} from '../../../providers/ui_menu.provider';
import { useSettings } from '../../../providers/ui_settings.provider';
import MenuOption from '../../atoms/menu/menu_option';
import { SubMenu } from '../../atoms/menu/sub_menu';
import styles from './menu.module.css';
import LimitMenuHeight from './menu_height';

interface MenuProps {
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;
}

const Menu: Component<MenuProps> = (props) => {
  const { goto, goBack, navigation, inMainMenu, inSubMenu } = useSettingsMenu();
  const t = useLocale();

  const {
    levelOptions,
    onQualityChange,
    levelLabel,
    onPlaybackRateChange,
    rateOptions,
    rateValue,
  } = useSettings();

  const rateLabel = () => {
    return rateValue() === 1 ? 'Normal' : String(rateValue());
  };

  return (
    <LimitMenuHeight>
      <div
        data-testid="settings_menu"
        ref={props.ref}
        class={styles.menu_container}
      >
        <Show when={inMainMenu()}>
          <MenuOption
            testId="settings_menu_speed"
            label={t.settings_menu.option.speed()}
            onPress={() => goto(SettingsNavigation.speed)}
            activeLabel={rateLabel()}
          />
          <MenuOption
            testId="settings_menu_quality"
            label={t.settings_menu.option.quality()}
            onPress={() => goto(SettingsNavigation.quality)}
            activeLabel={levelLabel()}
          />
        </Show>
        <Show when={inSubMenu()}>
          <Switch>
            <Match when={navigation() === SettingsNavigation.speed}>
              <SubMenu
                testId="settings_submenu_speed"
                label={t.settings_menu.option.speed()}
                options={rateOptions()}
                onChange={(option) => onPlaybackRateChange(option.key)}
                onClose={goBack}
              />
            </Match>
            <Match when={navigation() === SettingsNavigation.quality}>
              <SubMenu
                testId="settings_submenu_quality"
                label={t.settings_menu.option.quality()}
                options={levelOptions()}
                onChange={(option) => onQualityChange(option.key)}
                onClose={goBack}
              />
            </Match>
          </Switch>
        </Show>
      </div>
    </LimitMenuHeight>
  );
};

export default Menu;
