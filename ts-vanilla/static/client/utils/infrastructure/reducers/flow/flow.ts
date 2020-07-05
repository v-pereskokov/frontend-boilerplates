import get from 'lodash/get';
import {Action, createAction, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';

import {CommonStore} from '__utils/infrastructure/store';

import {baseDefaultState} from './consts';
import {BaseActions, BaseState, EntityReducerOptions, Status} from './types';
import {checkPending} from './utils';

export function generateBaseActions<D>(prefix: string): BaseActions<D> {
    return {
        success: createAction<D>(`${prefix}/SUCCESS`),
        pending: createAction<void>(`${prefix}/PENDING`),
        failed: createAction<string>(`${prefix}/FAILED`),
        reset: createAction<void>(`${prefix}/RESET`),
    };
}

export function generateBaseReducer<D>(prefix: string, defaultState: Partial<BaseState<D>>) {
    const actions = generateBaseActions<D>(prefix);

    const reducer = handleActions<BaseState<D>, any>({
        [actions.success.toString()]: (state: BaseState<D>, {payload}: Action<D>): BaseState<D> => ({
            ...state,
            data: payload,
            status: Status.Success,
        }),
        [actions.failed.toString()]: (state: BaseState<D>, {payload}: Action<string>): BaseState<D> => ({
            ...state,
            error: payload,
            status: Status.Failed,
        }),
        [actions.pending.toString()]: (state: BaseState<D>, _: Action<D>): BaseState<D> => ({
            ...state,
            status: Status.Pending,
        }),
    }, baseDefaultState);

    return {
        actions,
        reducer,
    };
}

export function generateEntityReducer<D>(prefix: string, options?: EntityReducerOptions<D>) {
    const {withItem = true, defaultState} = options || {};

    return {
        items: generateBaseReducer<D[]>(`${prefix}/items`, (defaultState?.items || {})),
        ...(withItem ? {item: generateBaseReducer<D>(`${prefix}/item`, (defaultState?.item || {}))} : {}),
    };
}

export function generateSelectorGroup<T extends CommonStore, D>(path: string) {
    const dataPath = `${path}.data`;
    const statusPath = `${path}.status`;
    const errorPath = `${path}.error`;

    return {
        listSelector: createSelector(
            (state: T) => get(state, dataPath),
            (item: D[]) => item || [],
        ),
        itemSelector: createSelector(
            (state: T) => get(state, dataPath),
            (item: D) => item,
        ),
        statusSelector: createSelector(
            (state: T) => get(state, statusPath),
            (status: Status) => status,
        ),
        checkPendingSelector: createSelector(
            (state: T) => get(state, statusPath),
            checkPending,
        ),
        errorSelector: createSelector(
            (state: T) => get(state, errorPath),
            (error: string) => error,
        ),
    };
}

/*
    * path – Путь от state до reducer
 */
export function generateSelectors<T extends CommonStore, D>(path: string) {
    const itemsPath = `${path}.items`;
    const itemPath = `${path}.item`;

    return {
        items: generateSelectorGroup<T, D[]>(itemsPath),
        item: generateSelectorGroup<T, D>(itemPath),
    };
}
