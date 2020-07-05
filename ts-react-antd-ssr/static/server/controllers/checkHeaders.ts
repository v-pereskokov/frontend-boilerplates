import {NextFunction, Request, Response} from 'express';

import {APP_HOSTS} from '__utils/hosts';

const ENV_HOSTS = !IS_STABLE
    ? {
        TESTING: APP_HOSTS.UNSTABLE,
    }
    : {
        TESTING: APP_HOSTS.TESTING,
        STABLE: APP_HOSTS.STABLE,
    };

const envKeys = Object.keys(ENV_HOSTS);

export function checkHeaders(req: Request, res: Response, next: NextFunction) {
    const {host} = req.headers;

    res.set({
        'X-Node-EnvKeys': envKeys.join('; '),
        'X-Node-Env': IS_STABLE,
        'X-Node-Host': host,
    });

    for (const env of envKeys) {
        const hosts = ENV_HOSTS[env].map(item => item.toLowerCase());
        for (const appHost of hosts) {
            if (appHost.includes(host as string)) {
                res.locals.appContext = {
                    appHost,
                    host,
                    env,
                };
                next();
                return;
            }
        }
    }

    res.status(403).send('No access');
}
