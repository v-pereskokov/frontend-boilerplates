const path = require('path');
const fs = require('fs');

const config = {
    env: process.env.NODE_ENV || 'development',

    path_base: path.resolve(__dirname, '..'),
    path_client: path.resolve(__dirname, '../static/client'),

    dir_static: 'static',
    dir_client: 'static/client',
    dir_client_dist: 'dist/client',
    dir_server_dist: 'dist/server',
    dir_server: 'server',

    compiler_public_path: '/dist/'
};

config.globals = {
    'process.env': {
        NODE_ENV: JSON.stringify(config.env)
    },
    NODE_ENV: JSON.stringify(config.env),
    __DEV__: config.env === 'development',
    __PROD__: config.env === 'production',
    __TEST__: config.env === 'testing',
};

const aliases = fs.readdirSync(config.path_client).reduce((result, item) => {
    const [filename, _] = item.split('.');
    const isFile = fs.statSync(path.join(config.path_client, item)).isFile();

    if (filename === '') {
        return result;
    }

    return {
        ...result,
        [`__${!isFile ? item : filename}`]: path.join(config.path_client, item),
    };
}, {});

config.aliases = aliases;

config.utils_paths = (function () {
    const resolve = path.resolve;
    const base = function () {
        return resolve.apply(path, [config.path_base].concat(Array.prototype.slice.call(arguments)));
    };

    return {
        base: base,
        static: base.bind(null, config.dir_static),
        client: base.bind(null, config.dir_client),
        dist: base.bind(null, config.dir_dist)
    };
})();

module.exports = config;
