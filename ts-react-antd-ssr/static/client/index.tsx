import {ConfigProvider} from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';
import {ConnectedRouter} from 'connected-react-router';
import {Language} from 'locales';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';

import Core from '__containers/Core';
import locales from '__locale/localesList.json';
import i18n from '__utils/i18n';
import store, {history} from '__utils/infrastructure/store';

import './sass/main.scss';

const render = (Component: React.ComponentType) =>
    ReactDOM.hydrate(
        (
            <ConfigProvider locale={ru_RU}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Component/>
                    </ConnectedRouter>
                </Provider>
            </ConfigProvider>
        ),
        document.getElementById('root'),
    );

// TODO: Сделать расширение Window интерфейса
// eslint-disable-next-line
let state;
if (typeof window === 'undefined') {
    state = {};
    (global as any).window = {};
    (global as any).window.location = {};
    (global as any).localStorage = undefined;
} else {
    state = (window as any).__PRELOADED_STATE__;
    delete (window as any).__PRELOADED_STATE__;

    if ((window as any).__I18N_LOCALES__) {
        i18n.configure(locales as any as Language[]);
    }

    window.onload = () => {
        Loadable.preloadReady().then(() => {
            render(Core);
        });
    };
}

if ((module as any).hot) {
    (module as any).hot.accept('./index.tsx', () => {
        render(require('./containers/Core'));
    });
}
