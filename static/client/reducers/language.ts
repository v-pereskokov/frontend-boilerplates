import {Language} from 'locales';
import {createAction, handleActions, Action} from 'redux-actions';

import {DEFAULT_LANGUAGE} from 'client/consts';

type ActionTypes =
    | Language
    | Language[];

export interface LanguageReducer {
    locale: Language;
    locales: Language[];
}

const PREFIX = 'language';
const defaultState: LanguageReducer = {
    locale: DEFAULT_LANGUAGE,
    locales: [],
};

export const actions = {
    setLocale: createAction<Language>(`@@${PREFIX}/SET_LANGUAGE`),
    setLocales: createAction<Language[]>(`@@${PREFIX}/SET_ALL_LANGUAGES`),
};

export default handleActions<LanguageReducer, ActionTypes>({
    [actions.setLocale.toString()]: (state: LanguageReducer, action: Action<Language>): LanguageReducer => ({
        ...state,
        locale: action.payload,
    }),
    [actions.setLocales.toString()]: (state: LanguageReducer, action: Action<Language[]>): LanguageReducer => ({
        ...state,
        locales: action.payload,
    }),
}, defaultState);
