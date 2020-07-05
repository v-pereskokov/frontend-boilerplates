import {Rules} from 'infrastructure/common';

export const anyValueValidator: Rules = [
    {
        required: true,
        message: 'Выберите значение',
    },
];
