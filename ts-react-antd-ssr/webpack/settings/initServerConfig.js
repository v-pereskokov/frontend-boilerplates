const webpack = require('webpack');

const webpackNodeExternals = require('webpack-node-externals');

const config = require('../../config');

const {__DEV__, __PROD__} = config.globals;
const paths = config.utils_paths;

module.exports = ({entry, context, provideClient = {}}) => webpackConfig => {
    Object.assign(webpackConfig, {
        context,
        target: 'node',
        devtool: undefined,
        entry: entry.app,
        mode: __DEV__ ? 'development' : 'production',
        externals: [webpackNodeExternals()],

        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.json'],
            modules: [
                'node_modules',
                paths.base(config.dir_static),
            ],
            alias: config.aliases,
        },

        output: {
            filename: 'server.js',
            path: paths.base(config.dir_server_dist),
        },

        module: {rules: []},

        stats: {
            all: undefined,
            builtAt: !__DEV__,
            chunks: !__DEV__,
            assets: !__DEV__,
            errors: true,
            warnings: true,
            outputPath: true,
            timings: true,
        },
        performance: {
            hints: false
        },

        plugins: [
            new webpack.ProgressPlugin(),
            new webpack.DefinePlugin({
                ...config.globals,
                IS_STABLE: __PROD__,
            }),
            new webpack.ProvidePlugin(provideClient),
        ],

        resolveLoader: {
            modules: [
                'node_modules',
                'webpack/loaders'
            ]
        },
    });

    return webpackConfig;
};
