import {Language} from 'locales';
import {createSelector} from 'reselect';

import {CommonStore} from '__utils/infrastructure/store';

export const languageSelector = createSelector(
    (state: CommonStore) => state.languages?.languages?.item?.data,
    (item: Language) => item || 'ru',
);

export const languagesSelector = createSelector(
    (state: CommonStore) => state.languages?.languages?.items?.data,
    (item: Language[]) => item || [],
);
