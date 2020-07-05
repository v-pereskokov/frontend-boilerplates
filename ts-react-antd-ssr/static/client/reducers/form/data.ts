import produce from 'immer';
import set from 'lodash/set';
import unset from 'lodash/unset';
import {Action, createAction, handleActions} from 'redux-actions';

import {Indexed} from 'infrastructure/utils';

import {FormFields} from '__types/common/form';

interface BasePathAction<T> {
    path: string;
    info: T;
}

export type DataReducer = {
    __default: Indexed;
} & Indexed;

const PREFIX = '@form/data';
const DEFAULT_MODEL_ID = '__default';

const defaultState: DataReducer = {
    [DEFAULT_MODEL_ID]: {},
};

interface ActionType {
    set: BasePathAction<FormFields>;
    remove: string;
}

export const actions = {
    set: createAction<ActionType['set']>(`${PREFIX}/SET`),
    remove: createAction<ActionType['remove']>(`${PREFIX}/REMOVE`),
};

const makePath = (path: string | undefined, fieldsName: string[] = []) =>
    `${path || DEFAULT_MODEL_ID}.${fieldsName.join('.')}`;

const reducer = handleActions<DataReducer, unknown>({
    [actions.set.toString()]: (state, action: Action<ActionType['set']>) => produce(state, draft => {
        const {payload: {path, info}} = action;
        (info || []).forEach(item => {
            set(draft, makePath(path, item.name as string[]), item);
        });
        return draft;
    }),
    [actions.remove.toString()]: (state, action: Action<ActionType['remove']>) => produce(state, draft => {
        const {payload} = action;
        unset(draft, makePath(payload));
        return draft;
    }),
}, defaultState);

export type State = ReturnType<typeof reducer>;
export default reducer;
