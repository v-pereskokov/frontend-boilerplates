import fetch from 'isomorphic-fetch';

import {actions as LogsActions} from 'client/reducers/logs';

import {NetworkLogs} from 'infrastructure/common';

interface FetchOptions {
    method: string;
    credentials: string;
    headers?: Headers;
    body?: string | undefined;
}

export class FetchLogger {
    private static _store = null;

    public static set store(store) {
        this._store = store;
    }

    public static async fetch(url: string, options: FetchOptions) {
        const resp = await fetch(url, options);

        try {
            const log = FetchLogger.cleanupLog(resp);
            if (!resp.ok) {
                const text = await resp.text();
                FetchLogger._store.dispatch(LogsActions.pushNetworkErrors({...log, text}));
                return Promise.reject(resp);
            }
            FetchLogger._store.dispatch(LogsActions.pushNetworkLogs(log));
            const data = await resp.json();

            return new Promise(res => {
                res({
                    ...resp,
                    json: () => new Promise(res => res(data)),
                });
            });
        } catch (e) {
            FetchLogger._store.dispatch(LogsActions.pushNetworkErrors(resp));
        }
    }

    private static cleanupLog(resp: Response): NetworkLogs {
        const {url, status, statusText, headers, ok} = resp;
        const endpoint = url.split('/').slice(-1)?.[0] || '';
        return {url, status, statusText, headers, ok, endpoint};
    }
}

export const fetchWithLogger = FetchLogger.fetch;
