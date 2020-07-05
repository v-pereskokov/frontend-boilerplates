import React from 'react';

import {Props, State} from './types';

export default class ErrorBoundary extends React.PureComponent<Props, State> {
    public state: State = {
        error: null,
        errorInfo: null,
    };

    public componentDidCatch(error, errorInfo) {
        this.setState({error, errorInfo});
    }

    public render() {
        const {state} = this;
        const {children} = this.props;

        if (state.errorInfo) {
            return (
                <>
                    <h2>Something went wrong.</h2>
                    <details style={{whiteSpace: 'pre-wrap'}}>
                        { state.error && state.error.toString() }
                        <br/>
                        { state.errorInfo.componentStack }
                    </details>
                </>
            );
        }

        return children;
    }
}
