declare module 'infrastructure/common' {
    import {Rule} from 'antd/lib/form';
    import {Location} from 'history';
    import {RouteComponentProps} from 'react-router';
    import {Action as ReduxAction} from 'redux';

    import {Assign, Indexed} from 'infrastructure/utils';

    export interface RouterLocation extends Location {
        query?: Indexed;
    }

    export interface EntityAPI {
        request?: (...args: unknown[]) => Promise<unknown>;
        create?: (...args: unknown[]) => Promise<unknown>;
        update?: (...args: unknown[]) => Promise<unknown>;
        delete?: (...args: unknown[]) => Promise<unknown>;
        find?: (...args: unknown[]) => Promise<unknown>;
    }

    export interface FindRequest {
        id: string;
    }

    export type RouteProps<T> = Assign<RouteComponentProps<T>, {
        location: RouterLocation;
    }>;

    export type Action<P, T = any> = ReduxAction<T> & {
        payload?: P;
    };

    export interface Option {
        id: string | number;
        label: string | number;
    }

    export type Options = Option[];

    export type NetworkLogs = Assign<Partial<Response>, {
        endpoint: string;
    }>;

    export type NetworkErrors = Assign<NetworkLogs, {
        text?: string;
    }>;

    export type Rules = Rule[];
}
