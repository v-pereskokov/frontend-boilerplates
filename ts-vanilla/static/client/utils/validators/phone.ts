import {Rules} from 'infrastructure/common';

export const MAX_PHONE_CODE_LENGTH = 6;

const phoneCodeRegExp = /\+\d+/;

export const phoneCodeValidator: Rules = [
    {
        required: true,
        min: 2,
        max: MAX_PHONE_CODE_LENGTH,
    },
    {
        validator(rule, value) {
            if (!phoneCodeRegExp.test(value)) {
                return Promise.reject('Неправильный код');
            }

            return Promise.resolve();
        },
    },
];

export const phoneNumberValidator: Rules = [
    {
        required: true,
        pattern: /[0-9]{10}/,
        message: 'Введите корректный номер',
    },
];
