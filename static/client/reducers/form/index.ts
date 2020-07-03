import {combineReducers} from 'redux';

import data, {actions as dataActions, DataReducer} from './data';

export interface FormReducer {
    data: DataReducer;
}

export const actions = {
    data: dataActions,
};

export default combineReducers<FormReducer>({
    data,
});
