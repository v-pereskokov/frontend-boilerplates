import identity from 'lodash/identity';
import {createSelector} from 'reselect';

import {CommonStore} from '__utils/infrastructure/store';

export const uuidSelector = createSelector(
    (state: CommonStore) => state.user.uuid,
    identity,
);
