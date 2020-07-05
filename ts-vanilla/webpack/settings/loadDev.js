const path = require('path');
const webpack = require('webpack');

module.exports = () => webpackConfig => {
    webpackConfig.watch = true;
    webpackConfig.devtool = 'cheap-module-eval-source-map';
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
    );

    webpackConfig.devServer = {
        port: 4000,
        contentBase: path.join(webpackConfig.context, 'dist'),
        disableHostCheck: true,
        open: process.env.WEBPACK_SERVER_BROWSER || 'Yandex',
        historyApiFallback: true,
        hot: true,
        https: true,

        stats: {
            warnings: false,
        },

        proxy: [
            {
                context: ['/proxy-api/**'],
                target: 'https://proxy-api/api/',
                pathRewrite: { '^/api/': '/' },
                secure: false,
                onProxyReq: proxyReq => {
                    proxyReq.setHeader('Host', 'my-custom-host');
                },
            },
        ],
    };

    return webpackConfig;
};
