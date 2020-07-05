import {createAction, handleActions} from 'redux-actions';

export interface UIReducer {
    loading?: boolean;
}

const PREFIX = 'UI';
const defaultState: UIReducer = {
    loading: false,
};

export const actions = {
    startLoading: createAction(`${PREFIX}/START_LOADING`),
    stopLoading: createAction(`${PREFIX}/STOP_LOADING`),
};

export default handleActions<UIReducer>({
    [actions.startLoading.toString()]: (): UIReducer => ({
        loading: true,
    }),
    [actions.stopLoading.toString()]: (): UIReducer => ({
        loading: false,
    }),
}, defaultState);
