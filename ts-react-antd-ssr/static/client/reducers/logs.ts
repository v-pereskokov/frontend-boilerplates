import {createAction, handleActions, Action} from 'redux-actions';

import {NetworkErrors, NetworkLogs} from 'infrastructure/common';

type ActionTypes =
    | NetworkLogs
    | NetworkErrors;

export interface LogsReducer {
    networkLogs: NetworkLogs[];
    networkErrors: unknown[];
}

const PREFIX = 'logs';
const defaultState: LogsReducer = {
    networkLogs: [],
    networkErrors: [],
};

export const actions = {
    pushNetworkLogs: createAction<NetworkLogs>(`${PREFIX}/PUSH_NETWORK_LOGS`),
    pushNetworkErrors: createAction<NetworkErrors>(`${PREFIX}/PUSH_NETWORK_ERRORS`),
};

export default handleActions<LogsReducer, ActionTypes>({
    [actions.pushNetworkLogs.toString()]: (state: LogsReducer, action: Action<NetworkLogs>): LogsReducer => ({
        ...state,
        networkLogs: state.networkLogs.concat(action.payload),
    }),
    [actions.pushNetworkErrors.toString()]: (state: LogsReducer, action: Action<NetworkErrors>): LogsReducer => ({
        ...state,
        networkErrors: state.networkErrors.concat(action.payload),
    }),
}, defaultState);
