import {RouterState} from 'connected-react-router';

import form, {FormReducer} from './form';
import language, {LanguageReducer} from './language';
import languages, {LanguagesReducers} from './languages';
import logs, {LogsReducer} from './logs';
import page, {PageReducer} from './page';
import preload, {PreloadReducer} from './preload';
import router from './router';
import ui, {UIReducer} from './ui';
import user, {UserReducer} from './user';

export interface BaseStore {
    router: RouterState;
    logs?: LogsReducer;
    user: UserReducer;
    ui: UIReducer;
    page: PageReducer;
    preload: PreloadReducer;
    language: LanguageReducer;
    languages: LanguagesReducers;
    form: FormReducer;
}

export const reducers = {
    router,
    ui,
    user,
    page,
    preload,
    language,
    languages,
    form,
    ...(
        /* global IS_STABLE */
        IS_STABLE ? {} : {logs}
    ),
};
