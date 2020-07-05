import fs from 'fs';
import {Helmet} from 'react-helmet';
import renderObject from 'server/utils/renderObject';

export default ({
    styles = [],
    styledTags,
    scripts = [],
    html,
    store,
    i18n,
}) => {
    const helmet = Helmet.renderStatic();

    return `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <meta name='robots' content='noindex'>
                <meta name="google" content="notranslate">

                <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png">
                <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png">
                <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png">
                <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png">
                <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png">
                <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png">
                <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png">
                <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png">
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png">
                <link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-icon-192x192.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
                <link rel="manifest" href="/favicons/manifest.json">
                <meta name="msapplication-TileColor" content="#ffffff">
                <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png">
                <meta name="theme-color" content="#ffffff">

                <title>Your's title</title>
                ${helmet.meta.toString()}
                ${helmet.link.toString()}

                ${styledTags}
                ${styles.map(script => `<style rel="preload">${fs.readFileSync(`dist/client/${script.file}`, 'utf-8')}</style>`).join('\n')}
            </head>

            <body>
                <div id="root">${html}</div>
                <script>
                    window.__I18N_LOCALES__ = ${renderObject(i18n.getKeysets())};
                    window.__PRELOADED_STATE__ = ${renderObject(store.getState())};
                </script>
                ${scripts.map(script => `<script src="/dist/${script.file}"></script>`).join('\n')}
            </body>
        </html>`;
};
