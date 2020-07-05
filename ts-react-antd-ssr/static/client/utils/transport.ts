import fetch from 'isomorphic-fetch';
import {stringify} from 'query-string';
import {fetchWithLogger} from 'server/utils/fetchLogger';

import {promiseTimeout} from './timeout';

const enum FetchMethods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
}

let customFetch = fetch;

export default class HTTPTransport {
    public host: string;
    private timeout = 20000;
    private baseUrl = '';
    private _nodeCookie: string;

    constructor(host: string) {
        this.host = `${this.baseUrl}${host}`;
        this._nodeCookie = null;
    }

    public response<Result>(
        url: string,
        method: string,
        body?: unknown,
        headers?: Headers,
    ): Promise<Result> {
        if (!headers) {
            headers = new Headers();
        }

        if (this._nodeCookie) {
            headers.set('Cookie', this._nodeCookie);
            /* global IS_STABLE */
            customFetch = IS_STABLE ? fetch : fetchWithLogger;
        }

        return promiseTimeout<Result>(
            this.timeout,
            customFetch(
                `${this.host}${encodeURI(url)}`,
                {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : undefined,
                    credentials: 'same-origin',
                },
            ),
        );
    }

    public set nodeCookie(cookie) {
        this._nodeCookie = cookie;
    }

    public setHost(newHost: string) {
        this.host = newHost;
    }

    public get<Query = object, Result = Response>(url: string, body?: Query, headers?: Headers): Promise<Result> {
        const params = stringify(body, {encode: false});
        url = url + (url.endsWith('?') ? '' : '?') + params;
        return this.response<Result>(url, FetchMethods.Get, undefined, headers);
    }

    public post<Data = object, Result = Response>(url: string, body?: Data, headers?: Headers): Promise<Result> {
        return this.sendWithData<Data, Result>(FetchMethods.Post, url, body, headers);
    }

    public put<Data = object, Result = Response>(url: string, body?: Data, headers?: Headers): Promise<Result> {
        return this.sendWithData<Data, Result>(FetchMethods.Put, url, body, headers);
    }

    public delete<Data = object, Result = Response>(url: string, body?: Data, headers?: Headers): Promise<Result> {
        return this.sendWithData<Data, Result>(FetchMethods.Delete, url, body, headers);
    }

    protected sendWithData<Data, Result>(
        method: string,
        url: string,
        body?: Data,
        headers?: Headers,
    ): Promise<Result> {
        if (!headers) {
            headers = new Headers();
        }
        headers.set('Content-Type', 'application/json');
        return this.response<Result>(url, method, body, headers);
    }
}

export const api = new HTTPTransport('/api');
