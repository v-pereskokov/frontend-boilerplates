import get from 'lodash/get';
import {createSelector} from 'reselect';

import {BaseModel} from '__types/common/form';
import {CommonStore} from '__utils/infrastructure/store';

export const makeFormDataSelector = <M extends BaseModel>(paths: string[]) => createSelector(
    paths.map(path => (state: CommonStore) => get(state.form.data, path)),
    (...forms: M[]) => paths.reduce((result, path, index) => ({
        ...result,
        [path]: forms[index] || {},
    }), {}),
);
