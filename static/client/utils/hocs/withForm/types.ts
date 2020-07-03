import {FormsModels} from '__types/common/form';

export interface Options {
    formPaths: string[];
}

export interface WithFormPropsExtender<T extends Partial<FormsModels>> {
    formModels: T;
}
