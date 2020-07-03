import {Language} from 'locales';

export type Keyset = {
    [name: string]: string;
};

export type Languages = {
    [key in Language]?: Keyset;
};
