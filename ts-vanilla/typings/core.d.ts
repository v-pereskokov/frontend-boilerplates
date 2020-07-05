// IS_STABLE –> webpack.base.config.js
declare const IS_STABLE: boolean;
// IS_SERVER –> package.json
declare const IS_SERVER: boolean;

declare module 'core' {
    export interface StoreOptions {
        isLogger: boolean;
        router?: {
            initialEntries: string[];
        };
    }
}
