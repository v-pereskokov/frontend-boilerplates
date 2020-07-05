import {Language} from 'locales';

import {Indexed} from 'infrastructure/utils';

import {DEFAULT_LANGUAGE} from '__consts';
import {Keyset, Languages} from '__types/common/locales';

import {LOCAL_STORAGE_LANGUAGES, RU_LOCALE} from './consts/language';

export class I18N {
    private keysets: Languages = {};
    private directory: string;
    private locale: Language;
    private languages: Language[];

    public configure(
        languages: Language[] = [],
        defaultLocale: Language = DEFAULT_LANGUAGE,
        directory = '../locale') {
        this.directory = directory;
        this.languages = languages;

        const storedLanguage: string = localStorage ? localStorage.getItem(LOCAL_STORAGE_LANGUAGES) : undefined;
        defaultLocale = (storedLanguage as Language) || defaultLocale;

        this.setLocale(defaultLocale);
        this.init(languages);
    }

    public getLocale(): Language {
        return this.locale || DEFAULT_LANGUAGE;
    }

    public getLocales() {
        return this.keysets;
    }

    public setLocale(language: Language) {
        if (this.languages.includes(language)) {
            this.locale = language;

            if (localStorage) {
                localStorage.setItem(LOCAL_STORAGE_LANGUAGES, this.locale);
            }

            return;
        }

        // eslint-disable-next-line no-console
        console.warn(`${language} is not exists in this project. RU will be setup.`);
    }

    public __ = (key: string, props?: Indexed, locale: string = this.locale) => {
        try {
            if (props) {
                return Object.keys(props).reduce(
                    (result, template) => result.replace(`{${template}}`, props[template]),
                    this.keysets[locale][key],
                );
            }

            const value: string = this.keysets[locale][key];
            if (!value) {
                return this.getDefaultValue(key, props, true);
            }

            return value;
        } catch (e) {
            try {
                return this.getDefaultValue(key, props, true);
            } catch (e) {
                return key;
            }
        }
    };

    public has = (key: string): boolean => {
        try {
            return this.keysets[this.locale].hasOwnProperty(key);
        } catch (e) {
            return this.keysets[RU_LOCALE].hasOwnProperty(key);
        }
    };

    public getKeysets = () => this.keysets;

    private init = (languages: Language[]) => {
        const keysets = (window as any).__I18N_LOCALES__;

        if (keysets) {
            delete (window as any).__I18N_LOCALES__;
            this.keysets = keysets;
            return this.keysets;
        }

        this.keysets = languages.reduce((result: Languages, language: Language) => {
            let data: Keyset;
            try {
                data = require(`client/locale/${language}.json`) as Keyset;
            } catch (e) {
                data = {};
            }
            return {...result, [language]: data};
        }, {});
    };

    private getDefaultValue = (key: string, props?: Indexed, isError = false) => {
        if (isError) {
            // eslint-disable-next-line no-console
            console.warn(`Translate of ${key} of ${this.locale} doesn't exists`);
        }

        return this.keysets.ru[key] || key;
    };
}

const i18n: I18N = new I18N();
export default i18n;
