import {Language} from 'locales';

import {generateEntityReducer} from '__utils/infrastructure/reducers/flow';

const PREFIX = '@languages';

export const DEFAULT_LANGUAGE = {
    data: ((global as any)?.window || {})?.navigator?.language || 'ru' as Language,
};

const {items, item} = generateEntityReducer<Language>(PREFIX, {
    defaultState: {
        item: DEFAULT_LANGUAGE,
    },
});
export {items, item};
