import config from 'client/config/config';

import {
    apiProxy,
} from './controllers/proxy';
import render from './controllers/render';

export default app => {
    if (process.env.NODE_ENV === config.__DEV__) {
        app.use(apiProxy);
    }

    app.get('*', render);
};
