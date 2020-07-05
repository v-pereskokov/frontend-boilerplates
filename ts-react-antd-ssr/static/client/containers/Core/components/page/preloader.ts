import {Language} from 'locales';

import {bound as commonActions} from '__actions';
import locales from '__locale/localesList.json';
import {languageService} from '__services/LanguageService';
import i18n from '__utils/i18n';

export default (): Promise<any> => {
    return new Promise(resolve => {
        resolve(42);
    })
        .then(() => languageService.setLocales(locales as any as Language[]))
        .then(() => languageService.setLocale(i18n.getLocale()))
        .then(() => commonActions.user.generateUUID())
        .then(() => commonActions.page.setAsReady());
};
