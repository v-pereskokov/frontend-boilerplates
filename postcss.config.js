module.exports = {
    plugins: [
        require('cssnano')({
            autoprefixer: {
                add: true,
                remove: true
            },
            discardComments: {
                removeAll: true
            },
            safe: true,
            sourcemap: true
        })
    ]
};
