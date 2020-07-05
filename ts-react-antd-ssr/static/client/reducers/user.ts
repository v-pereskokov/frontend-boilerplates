import {CSRFToken, User} from 'auth';
import {createAction, handleActions, Action} from 'redux-actions';
import {v4 as uuidv4} from 'uuid';

type ActionTypes =
    | CSRFToken
    | Partial<User>;

export interface UserReducer {
    csrfToken: CSRFToken;
    data: User;
    uuid: string;
}

const PREFIX = 'AUTH';
const defaultState: UserReducer = {
    csrfToken: {token: undefined},
    data: {
        name: '',
        role: '',
        status: undefined,
        request: undefined,
    },
    uuid: undefined,
};

export const actions = {
    setUser: createAction<Partial<User>>(`${PREFIX}/SET_USER`),
    setCSRFToken: createAction<CSRFToken>(`${PREFIX}/SET_CSRF_TOKEN`),
    generateUUID: createAction(`${PREFIX}/GENERATE_UUID`),
};

export default handleActions<UserReducer, ActionTypes>({
    [actions.setUser.toString()]: (state: UserReducer, action: Action<Partial<User>>): UserReducer => ({
        ...state,
        data: {...state.data, ...action.payload},
    }),
    [actions.setCSRFToken.toString()]: (state: UserReducer, action: Action<CSRFToken>): UserReducer => ({
        ...state,
        csrfToken: action.payload,
    }),
    [actions.generateUUID.toString()]: (state: UserReducer): UserReducer => ({
        ...state,
        uuid: uuidv4().replace(/\-/g, ''),
    }),
}, defaultState);
