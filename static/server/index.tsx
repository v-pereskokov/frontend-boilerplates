import cookieParser from 'cookie-parser';
import express from 'express';
import https from 'https';
import selfSigned from 'openssl-self-signed-certificate';
import {parse} from 'qs';
import Loadable from 'react-loadable';

import {checkHeaders} from './controllers/checkHeaders';
import router from './router';

const PORT = 4002;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const server = express();
server.disable('x-powered-by');

server.set('query parser', (query: string) => {
    return parse(query, {
        decoder: str => {
            return decodeURIComponent(str);
        },
    });
});

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use(cookieParser());
server.use(checkHeaders);

server.use('/dist', express.static('dist/client'));
server.use('/favicons', express.static('dist/client/favicons'));

router(server);

Loadable.preloadAll()
    .then(() => {
        https
            .createServer({key: selfSigned.key, cert: selfSigned.cert}, server)
            .listen(PORT, () => {
                // eslint-disable-next-line
                console.log(`Running on https://localhost:${PORT}/`);
            });
    })
    .catch(err => {
        // eslint-disable-next-line
        console.log(err);
    });
