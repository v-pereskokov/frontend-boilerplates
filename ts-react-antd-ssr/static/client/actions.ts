import {actions as formActions} from '__reducers/form';
import {actions as languageActions} from '__reducers/language';
import {actions as languagesActions} from '__reducers/languages';
import {actions as pageActions} from '__reducers/page';
import {actions as preloadActions} from '__reducers/preload';
import {actions as routerActions} from '__reducers/router';
import {actions as uiActions} from '__reducers/ui';
import {actions as userActions} from '__reducers/user';
import store from '__utils/infrastructure/store';

export const pure = {
    page: pageActions,
    ui: uiActions,
    router: routerActions,
    language: languageActions,
    preload: preloadActions,
    user: userActions,
    languages: languagesActions,
    form: formActions,
};
export const bound = store.bindActions(pure);
