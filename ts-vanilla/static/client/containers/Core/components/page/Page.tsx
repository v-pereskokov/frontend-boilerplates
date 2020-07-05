import React from 'react';

import ErrorBoundary from 'client/components/ErrorBoundry/ErrorBoundry';

import Wrapper from '../wrapper';

export default class Page extends React.PureComponent {
    public render(): React.ReactNode {
        /* global IS_STABLE */
        return IS_STABLE
            ? (
                <ErrorBoundary>
                    <Wrapper/>
                </ErrorBoundary>
            )
            : <Wrapper/>;
    }
}
