import * as i18n from '@solid-primitives/i18n';
import type { ParentComponent } from 'solid-js';

import { createContext, useContext } from 'solid-js';
import type { Locale, RawDictionary } from './localizations';
import { en, ptBR } from './localizations';

export const dictionaries: { [locale in Locale]: RawDictionary } = {
  en: en,
  'pt-BR': ptBR,
};

const I18nContext = createContext<i18n.ChainedTranslator<RawDictionary>>(
  {} as i18n.ChainedTranslator<RawDictionary>,
);
// const availableLocales = ["en", "pt-BR"];

type I18nProviderProps = {
  initialLocale?: Locale;
};
export const I18nProvider: ParentComponent<I18nProviderProps> = (props) => {
  const chained = () => {
    const dict = dictionaries[props.initialLocale ?? 'en'];
    const flat_dict = i18n.flatten(dict);
    const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);

    return i18n.chainedTranslator(dict, t);
  };

  return (
    <I18nContext.Provider value={chained()}>
      {props.children}
    </I18nContext.Provider>
  );
};

export const useLocale = () => {
  return useContext(I18nContext);
};
