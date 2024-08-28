import { BrowserUtils } from '@common/utils';
import Button from '@ui/components/atoms/button/button';
import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import { useSettings } from '../../providers/ui_settings.provider';
import FieldSelect from '../molecules/field_select/field_select';

import { useLocale } from '@ui/locale';
import Modal from '../molecules/modal/modal';
import SettingsButton from '../molecules/settings_button/settings_button';

const SettingsMobile: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const t = useLocale();
  const {
    levelOptions,
    onQualityChange,
    levelValue,
    onPlaybackRateChange,
    rateOptions,
    rateValue,
  } = useSettings();

  const toggleOpen = () => {
    setIsOpen(!isOpen());
  };

  return (
    <>
      <SettingsButton onPress={toggleOpen} />

      <Show when={isOpen()}>
        <Modal
          onClose={() => setIsOpen(false)}
          headerTitle={t.settings_menu.title()}
        >
          <div data-testid="settings_mobile" class="grid gap-3">
            <FieldSelect
              testId="select_speed"
              label={t.settings_menu.option.speed()}
              options={rateOptions()}
              value={rateValue()}
              onChange={onPlaybackRateChange}
            />
            <Show when={!BrowserUtils.isIOS}>
              <FieldSelect
                testId="select_quality"
                label={t.settings_menu.option.quality()}
                options={levelOptions()}
                value={levelValue()}
                onChange={onQualityChange}
              />
            </Show>
          </div>
          <div class="mt-4 flex justify-end">
            <Button
              testId="settings_mobile_button_ok"
              class="p-2 text-sm"
              onClick={toggleOpen}
            >
              OK
            </Button>
          </div>
        </Modal>
      </Show>
    </>
  );
};

export default SettingsMobile;
