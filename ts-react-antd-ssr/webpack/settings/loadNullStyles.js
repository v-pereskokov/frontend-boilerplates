module.exports = () => webpackConfig => {
    const cssLoaders = [
        {loader: './webpack/loaders/b_-loader/loader.js'},
        {loader: 'null-loader'}
    ];

    const cssRules = [
        {
            test: /\.scss$/,
            use: cssLoaders
        },
        {
            test: /\.css$/,
            use: cssLoaders
        },
    ];

    webpackConfig.module.rules.push(...cssRules);

    return webpackConfig;
};
