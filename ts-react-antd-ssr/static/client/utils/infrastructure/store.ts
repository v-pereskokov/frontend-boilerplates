import {
    bindActionCreators,
    combineReducers,
    Action,
    Reducer,
} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {reducers, BaseStore} from 'client/reducers';
import routerReducer from 'client/reducers/router';
import {getErrorsSelector} from 'client/selectors/logs';
import configureStore from 'client/store';

import {Assign, Indexed} from 'infrastructure/utils';

const state = (window as any).__PRELOADED_STATE__;
delete (window as any).__PRELOADED_STATE__;

function alarm(state: CommonStore) {
    const errors = getErrorsSelector(state);
    // eslint-disable-next-line no-console
    errors.map(error => console.error(error));
}

alarm(state);

const {store: reduxStore, history} = configureStore(reducers, state, {isLogger: true});

export function hasReducer(key: string): boolean {
    return !!reducers[key];
}

export function rootReducerFactory<E>(extention: E = ({} as E)) {
    const finalHash = {
        ...reducers,
        ...extention,
        router: routerReducer(history),
    };
    return combineReducers(finalHash);
}

const recombineStoreWith = <E extends Indexed<Reducer>>(extention: E) => {
    // Нужно для избежания ошибки во время HMR
    if (Object.keys(extention).every(hasReducer)) {
        return;
    }

    reduxStore.replaceReducer(rootReducerFactory(extention));
    reduxStore.dispatch({type: '@@redux/RECOMBINE'});
};

function bindActions<A extends Indexed>(actions: A): A {
    return Object.keys(actions).reduce((result, key) => {
        const subObj = actions[key];

        return {
            ...result,
            [key]: typeof subObj === 'function'
                ? bindActionCreators(subObj, reduxStore.dispatch)
                : bindActions(subObj),
        };
    }, {} as A);
}

export type CommonStore = ReturnType<typeof reduxStore.getState> & BaseStore;
export type ExtendedState<S extends object> = Assign<CommonStore, S>;
export type CommonThunkAction<T, R> = ThunkAction<null, T, R, Action>;

function getStore<T extends CommonStore>(): T {
    return reduxStore.getState() as T;
}

export {
    history,
    getStore,
};

export default {
    ...reduxStore,
    bindActions,
    recombineStoreWith,
};
