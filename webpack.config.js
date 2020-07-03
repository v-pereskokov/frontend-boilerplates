const flow = require('lodash.flow');
const path = require('path');

const {
    initClientConfig,
    loadAssets,
    loadScripts,
    loadStyles,
} = require('./webpack/settings');

const webpackConfig = flow([
    initClientConfig({
        entry: {
            app: ['./static/client/index.tsx'],
        },
        context: __dirname
    }),
    loadScripts({
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        checkTypes: true
    }),
    loadStyles(),
    loadAssets(),
])({});

module.exports = webpackConfig;
