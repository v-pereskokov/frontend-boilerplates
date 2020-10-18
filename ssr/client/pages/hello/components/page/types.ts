import {FC} from 'react';

import {RouteProps} from '../../types';

export type OwnProps = {
    someCustomRouteProp: string;
};

export interface StateProps {
    experimentId: string;
    mouseId: string;
}

export type Props = FC<StateProps & OwnProps & RouteProps>;
