import {createAction, handleActions} from 'redux-actions';

type ActionTypes =
    | void;

export interface PreloadReducer {
    isReady: boolean;
}

const PREFIX = 'preload';
const defaultState: PreloadReducer = {
    isReady: false,
};

export const actions = {
    setAsStart: createAction(`${PREFIX}/START`),
    setAsReStart: createAction(`${PREFIX}/RE_START`),
    setAsErrorReady: createAction(`${PREFIX}/ERROR`),
    setAsReady: createAction(`${PREFIX}/SUCCESS`),
};

export default handleActions<PreloadReducer, ActionTypes>({
    [actions.setAsStart.toString()]: (state: PreloadReducer): PreloadReducer => ({
        ...state,
        isReady: false,
    }),
    [actions.setAsReStart.toString()]: (state: PreloadReducer): PreloadReducer => ({
        ...state,
        isReady: false,
    }),
    [actions.setAsReady.toString()]: (state: PreloadReducer): PreloadReducer => ({
        ...state,
        isReady: true,
    }),
    [actions.setAsErrorReady.toString()]: (state: PreloadReducer): PreloadReducer => ({
        ...state,
        isReady: true,
    }),
}, defaultState);
