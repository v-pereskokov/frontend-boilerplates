const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('../../config');

const paths = config.utils_paths;
const {__DEV__, __PROD__} = config.globals;

module.exports = ({entry, context, alias}) => webpackConfig => {
    const overlayStyles = {
        'z-index': 1000000
    };

    if (alias) {
        console.log('Overriding alias option with', JSON.stringify(alias, null, 2));
    }

    const hmrPath = `webpack-hot-middleware/client?path=/__webpack_hmr&overlayStyles=${encodeURIComponent(JSON.stringify(overlayStyles))}`;

    webpackConfig = Object.assign(webpackConfig, {
        context,
        name: 'client',
        target: 'web',
        devtool: __DEV__ ? 'eval-cheap-module-source-map' : undefined,
        entry: {
            ...entry,
            app: __DEV__
                ? [
                    ...entry.app,
                    hmrPath,
                ]
                : entry.app,
        },
        mode: __DEV__ ? 'development' : 'production',
        output: {
            filename: '[name].bundle.js',
            path: paths.base(config.dir_client_dist),
            pathinfo: false,
            publicPath: config.compiler_public_path
        },
        resolve: {
            modules: [
                'node_modules',
                paths.base(config.dir_static)
            ],
            extensions: ['.js', '.ts', '.tsx', '.json'],
            alias: config.aliases,
        },
        module: {
            rules: []
        },
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
            new CheckerPlugin(),
            new webpack.DefinePlugin({
                ...config.globals,
            }),
            new HtmlWebpackPlugin({
                template: 'static/index.html',
                hash: config.__PROD__,
            }),
        ],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
            },

            minimizer: [
                new TerserPlugin({
                    cache: paths.base(`node_modules/.cache/terser-webpack-plugin`)
                }),
                new OptimizeCSSAssetsPlugin(),
            ]
        }
    });

    if (__DEV__) {
        webpackConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
        );
    }

    if (__PROD__) {
        webpackConfig.plugins.push(
            new DuplicatePackageCheckerPlugin(),
        );
    }

    return webpackConfig;
};
