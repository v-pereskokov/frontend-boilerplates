import {createSelector} from 'reselect';

import {NetworkErrors} from 'infrastructure/common';

import {CommonStore} from '__utils/infrastructure/store';

export const getErrorsSelector = createSelector(
    (state: CommonStore) => state?.logs?.networkErrors,
    (errors: NetworkErrors[]) => errors || [],
);
