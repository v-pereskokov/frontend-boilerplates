import {connectRouter as router, routerActions} from 'connected-react-router';
import {History} from 'history';
import {RouteComponentProps} from 'react-router';

import {RouterLocation} from 'infrastructure/common';

export interface RouterHistory extends History {
    location: RouterLocation;
}

interface CurrentRouteState {
    location: RouterLocation;
    match: RouteComponentProps<unknown, unknown>['match'];
}

export const actions = {
    ...routerActions,
};

export default router;
