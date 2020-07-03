import {createAction, handleActions} from 'redux-actions';

type ActionTypes =
    | void;

export interface PageReducer {
    isReady: boolean;
}

const PREFIX = 'page';
const defaultState: PageReducer = {
    isReady: false,
};

export const actions = {
    setAsReady: createAction(`${PREFIX}/SET_AS_READY`),
};

export default handleActions<PageReducer, ActionTypes>({
    [actions.setAsReady.toString()]: (): PageReducer => ({isReady: true}),
}, defaultState);
