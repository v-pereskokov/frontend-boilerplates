import {Rules} from 'infrastructure/common';

export const defaultValidator: Rules = [
    {
        required: true,
        message: 'Заполните значение',
    },
];

export const optionalRule: Rules = [
    {
        required: false,
    },
];


export const emailValidator: Rules = [
    {
        type: 'email',
        message: 'Некорректная почта',
    },
];
