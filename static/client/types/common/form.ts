import {FormProps} from 'antd/lib/form';

export type FormField = FormProps['fields'][number];
export type FormFields = FormProps['fields'];
export type BaseModel = Record<symbol, FormField>;
export type DateFormat = string; // YYYY-MM-DD

export interface PhoneModel {
    countryCode: FormField;
    phone: FormField;
}

export interface FormsModels {
    phone: PhoneModel;
}
