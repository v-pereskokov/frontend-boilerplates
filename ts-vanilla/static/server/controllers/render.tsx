import {NextFunction, Request, Response} from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable-ssr-addon';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

import Core from '__containers/Core';
import {reducers} from '__reducers';
import configureStore from '__store';
import i18n from '__utils/i18n';

const manifest = require('../../../dist/client/react-loadable-ssr-addon.json');

import {FetchLogger} from '../utils/fetchLogger';
import renderer from '../utils/renderer';

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const {store} = configureStore(
            reducers,
            {},
            {isLogger: false, router: {initialEntries: [req.url]}},
        );

        FetchLogger.store = store;

        Promise.resolve()
            .then(() => {
                const context = {};
                const modules = new Set();
                const addModule = moduleName => modules.add(moduleName);

                const sheet = new ServerStyleSheet();

                const html = renderToString((
                    <StyleSheetManager sheet={sheet.instance}>
                        <Loadable.Capture report={addModule}>
                            <Provider store={store}>
                                <StaticRouter location={req.url} context={context}>
                                    <Core/>
                                </StaticRouter>
                            </Provider>
                        </Loadable.Capture>
                    </StyleSheetManager>
                ));

                if ((context as any).status === 404) {
                    return res.status(404);
                }

                const bundles = getBundles(
                    manifest,
                    [...manifest.entrypoints, ...Array.from(modules)],
                );

                const styles = bundles.css || [];
                const scripts = bundles.js || [];

                const styledTags = sheet.getStyleTags();

                res.send(renderer({
                    styles,
                    scripts,
                    styledTags,
                    html,
                    store,
                    i18n,
                }));
            })
            .catch(error => {
                next(error);
            });
    } catch (error) {
        next(error);
    }
};
