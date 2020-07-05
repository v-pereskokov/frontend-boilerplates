const flow = require('lodash.flow');
const path = require('path');

const {
    initClientConfig,
    loadAssets,
    loadScripts,
    loadStyles,
    loadDev,
} = require('./webpack/settings');
const config = require('./config');

const {__DEV__} = config.globals;

const rules = [
    initClientConfig({
        entry: {
            app: ['./static/index.ts'],
        },
        context: __dirname
    }),
    loadScripts({
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        checkTypes: true
    }),
    loadStyles(),
    loadAssets(),
];

if (__DEV__) {
    rules.push(loadDev());
}

const webpackConfig = flow(rules)({});

module.exports = webpackConfig;
