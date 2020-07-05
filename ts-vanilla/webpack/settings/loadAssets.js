const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({
    isCopyStatic = true,
} = {}) => webpackConfig => {
    webpackConfig.module.rules.push(
        {test: /\.(jpe?g|png|gif)$/i, loader: 'url-loader?limit=10000!img-loader?progressive=true'},
        {test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=fonts/[name].[ext]'},
        {test: /\.svg$/, loader: 'react-svg-loader'},
        {
            test: /\.csv$/,
            loader: 'csv-loader',
            options: {
                dynamicTyping: true,
                header: true,
                skipEmptyLines: true
            }
        },
    );

    if (isCopyStatic) {
        webpackConfig.plugins.push(
            new CopyWebpackPlugin([
                {from: './www/favicons', to: 'favicons'},
            ]),
        );
    }

    return webpackConfig;
};
