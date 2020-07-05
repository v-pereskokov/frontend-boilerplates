const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => webpackConfig => {
    const cssLoaders = [
        {loader: './webpack/loaders/b_-loader/loader.js'},
        MiniCssExtractPlugin.loader,
        {loader: 'css-loader'},
        {loader: 'postcss-loader'},
    ];

    const sassLoader = {
        loader: 'sass-loader',
        options: {
            sourceMap: false,
            resolveUrl: true,
        }
    };

    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        })
    );

    webpackConfig.module.rules.push(
        {
            test: /\.css$/,
            use: cssLoaders,
        },
        {
            test: /\.scss$/,
            use: [
                ...cssLoaders,
                sassLoader,
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: ['static/client/sass/variables.scss']
                    },
                },
            ],
        },
    );

    return webpackConfig;
};
