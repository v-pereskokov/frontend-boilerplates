// Пишем собственный лоадер
const fs = require('fs');

// Модуль должен идти после css-loader
module.exports = function loader(content) {
    this.addDependency(this.resourcePath);

    // css-loader не дает возможности получить доступ к AST дереву
    // https://github.com/webpack-contrib/css-loader/blob/master/src/index.js
    const css = fs.readFileSync(this.resourcePath, 'utf-8');
    const match = css.match(/\.([a-z-_0-9]+)/i);

    if (!match) {
        return content;
    }

    return [
        content,
        `module.exports.b = require('b_').with('${match[1]}');`
    ].join('\n');
};
