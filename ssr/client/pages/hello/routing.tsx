import React from 'react';

import AppRoute from 'client/components/app-route';
import {ROUTES} from 'client/routes';

import Page from './components/page';

const {HELLO} = ROUTES;

export default [
    <AppRoute path={HELLO.INDEX} component={Page} key={HELLO.INDEX} exact/>,
];
