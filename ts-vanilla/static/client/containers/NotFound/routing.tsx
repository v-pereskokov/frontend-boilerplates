import React from 'react';
import Loadable from 'react-loadable';
import {Route} from 'react-router';

const AsyncPage = Loadable({
    loader: () => import(/* webpackChunkName: "404" */ './components/page'),
    loading: () => null,
});

export default (
    <React.Fragment>
        <Route component={AsyncPage}/>
    </React.Fragment>
);
