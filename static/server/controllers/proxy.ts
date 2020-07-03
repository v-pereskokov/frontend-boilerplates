const {createProxyMiddleware} = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/api/**', {
    target: 'https://api-host/',
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Host', 'api-host');
    },
});

export {
    apiProxy,
};
