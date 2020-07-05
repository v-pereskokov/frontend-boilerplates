import {ReactNode} from 'react';

export interface State {
    error: Error;
    errorInfo: any;
}

export interface Props {
    children: ReactNode;
}
