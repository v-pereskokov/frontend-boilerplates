import {ActionFunction1, Action} from 'redux-actions';
import {Nullable} from 'utils';

export enum Status {
    Success = 'success',
    Pending = 'pending',
    Failed = 'failed',
}

export interface BaseActions<D> {
    success: ActionFunction1<D, Action<D>>;
    pending: ActionFunction1<void, Action<void>>;
    failed: ActionFunction1<string, Action<string>>;
    reset: ActionFunction1<void, Action<void>>;
}

export interface BaseState<D> {
    data: Nullable<D>;
    error: Nullable<string>;
    status: Nullable<Status>;
}

export interface EntityReducerOptions<D> {
    withItem?: boolean;
    defaultState?: {
        item?: Partial<BaseState<D>>;
        items?: Partial<BaseState<D[]>>;
    };
}

export type BaseEntityReducer<D> =
    | {
        items: BaseState<D[]>;
        item?: BaseState<D>;
    }
    | {
        items?: BaseState<D[]>;
        item: BaseState<D>;
    };

export interface ItemEntityReducer<D> {
    item: BaseState<D>;
}
