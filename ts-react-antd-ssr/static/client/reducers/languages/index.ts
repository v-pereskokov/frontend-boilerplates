import {Language} from 'locales';
import {combineReducers} from 'redux';

import {BaseEntityReducer} from '__utils/infrastructure/reducers/flow';

import {items as languagesItems, item as languagesItem} from './languages';

type LanguagesItemReducer = BaseEntityReducer<Language>;

export interface LanguagesReducers {
    languages: LanguagesItemReducer;
}

export const actions = {
    languages: {
        item: languagesItem.actions,
        items: languagesItems.actions,
    },
};

export default combineReducers<LanguagesReducers>({
    languages: combineReducers<LanguagesItemReducer>({
        item: languagesItem.reducer,
        items: languagesItems.reducer,
    }),
});
