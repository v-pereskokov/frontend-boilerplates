import {Rules} from 'infrastructure/common';

export const DATE_FORMAT = 'DD.MM.YYYY';

export const dateValidator: Rules = [
    {
        required: true,
        message: 'Заполните значение',
    },
];
