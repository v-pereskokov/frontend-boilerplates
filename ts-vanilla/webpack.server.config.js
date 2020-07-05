const flow = require('lodash.flow');
const path = require('path');

const {
    initServerConfig,
    loadAssets,
    loadScripts,
    loadNullStyles,
} = require('./webpack/settings');

const webpackConfig = flow([
    initServerConfig({
        entry: {
            app: ['./static/server/index.tsx'],
        },
        context: __dirname,
        provideClient: {
            window: path.resolve(path.join(__dirname, './webpack/mock/window.mock')),
            localStorage: path.resolve(path.join(__dirname, './webpack/mock/localStorage.mock')),
            document: 'global/document',
        },
    }),
    loadScripts({
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        checkTypes: true
    }),
    loadNullStyles(),
    loadAssets({isCopyStatic: false}),
])({});

module.exports = webpackConfig;
