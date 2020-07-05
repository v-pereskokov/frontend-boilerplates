const fs = require('fs');
const config = require('./_base');

// Check if the file exists before attempting to require it, this
// way we can provide better error reporting that overrides
// weren't applied simply because the file didn't exist.
const overridesFilename = '_' + config.env;
let hasOverridesFile;
try {
    fs.lstatSync(__dirname + '/' + overridesFilename + '.js');
    hasOverridesFile = true;
} catch (e) {
}

// Overrides file exists, so we can attempt to require it.
// We intentionally don't wrap this in a try/catch as we want
// the Node process to exit if an error occurs.
let overrides;
if (hasOverridesFile) {
    overrides = require(__dirname + '/' + overridesFilename)(config);
} else {
    console.log('No configuration overrides found for NODE_ENV "' + config.env + '"');
}

module.exports = Object.assign({}, config, overrides);
