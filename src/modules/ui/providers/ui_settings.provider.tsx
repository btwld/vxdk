import type { Accessor, ParentComponent } from 'solid-js';
import { createContext, createMemo, useContext } from 'solid-js';
import type { Option } from '../components/atoms/menu/sub_menu';
import { useVxdk } from './hooks/use-controller';
import { useVxdkState } from './hooks/use-state';

export type SettingsContextValue = {
  onPlaybackRateChange: (value: string) => void;
  onQualityChange: (value: string) => void;
  rateOptions: Accessor<Option[]>;
  levelOptions: Accessor<Option[]>;
  rateValue: () => number;
  levelValue: () => number | 'auto' | undefined;
  levelLabel: () => string;
};

export enum SettingsNavigation {
  closed,
  main,
  speed,
  quality,
}

export const SettingsContext = createContext<SettingsContextValue>();

const playbackRateOptions = [0.25, 0.5, 1, 1.25, 1.5, 2];

export const SettingsProvider: ParentComponent = (props) => {
  const vxdk = useVxdk();
  const { playbackRate, levels, levelAutoSwitch, level } = useVxdkState();

  const onPlaybackRateChange = (valueKey: string) => {
    const selected = playbackRateOptions.find(
      (rate) => String(rate) === valueKey,
    ) as number;
    vxdk.setPlaybackRate(selected);
  };

  const rateOptions = createMemo(() => {
    const currentRate = playbackRate();

    return playbackRateOptions.map((rate) => {
      return {
        active: rate === currentRate,
        key: String(rate),
        label: rate === 1 ? 'Normal' : `${rate}`,
      };
    }) as Option[];
  });

  const onQualityChange = (valueKey: string) => {
    const selected = levels().find((level) => String(level.id) === valueKey);

    const selectedOption = selected || 'auto';

    vxdk.setLevel(selectedOption);
  };

  const levelOptions = createMemo(() => {
    const currentLevel = level();
    const options = levels().map((level) => {
      const auto = levelAutoSwitch();

      const isActive = currentLevel?.id === level.id && !auto;

      return {
        active: isActive,
        key: String(level.id),
        label: `${level.height}p`,
      };
    }) as Option[];

    options.push({
      active: levelAutoSwitch(),
      key: 'auto',
      label: levelAutoSwitch() ? `Auto (${level()?.height}p)` : 'Auto',
    });

    return options;
  });

  const rateValue = () => {
    return playbackRate();
  };

  const levelValue = () => {
    const auto = levelAutoSwitch();
    const currentLevel = auto ? 'auto' : level()?.id;

    return currentLevel;
  };

  const levelLabel = () =>
    levelAutoSwitch() ? `Auto (${level()?.height}p)` : `${level()?.height}p`;

  const store = {
    onPlaybackRateChange,
    rateOptions,
    rateValue,
    onQualityChange,
    levelOptions,
    levelValue,
    levelLabel,
  };

  return (
    <SettingsContext.Provider value={store}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export function useSettings(): SettingsContextValue {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error('Settings context not found');
  }
  return settings;
}
