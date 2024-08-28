import * as i18n from '@solid-primitives/i18n';
import type { RawDictionary } from '@ui/locale';
import { dictionaries } from '@ui/locale';

export const useLocale = (): i18n.ChainedTranslator<RawDictionary> => {
  const flat_dict = i18n.flatten(dictionaries.en);
  const t = i18n.translator(() => flat_dict, i18n.resolveTemplate);

  return i18n.chainedTranslator(dictionaries.en, t);
};
