import {Language} from 'locales';

import {bound as commonActions} from '__actions';
import i18n from '__utils/i18n';

export default class LanguageService {
    public setLocale = (locale: Language) => {
        i18n.setLocale(locale);
        commonActions.languages.languages.item.success(locale);
    };

    public setLocales = (locales: Language[]) => {
        commonActions.languages.languages.items.success(locales);
    };
}

export const languageService = new LanguageService();
