import {Language} from 'locales';
import get from 'lodash/get';

const window = get(global, 'window', {});
export const DEFAULT_LANGUAGE: Language = get(window || {}, 'navigator.language', 'ru') as Language;

export const enum RESPONSE_CODE {
    OK = 'ok'
}

export const FORM_HELPS: Record<string, string> = {
    OPTIONAL: 'Необязательно.',
};
