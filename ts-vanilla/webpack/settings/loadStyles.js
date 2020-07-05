const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => webpackConfig => {
    const cssLoaders = [
        {loader: './webpack/loaders/b_-loader/loader.js'},
        MiniCssExtractPlugin.loader,
        {loader: 'css-loader'},
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
                        resources: ['static/styles/variables.scss']
                    },
                },
            ],
        },
    );

    return webpackConfig;
};
