import React from 'react';

import isServer from 'client/utils/isServerEnvCheker';

export default function renderOnClientSideOnly(
    Component: React.ComponentType,
    props: any,
) {
    if (isServer) {
        return (
            <React.Fragment/>
        );
    }

    return <Component {...props}/>;
}
