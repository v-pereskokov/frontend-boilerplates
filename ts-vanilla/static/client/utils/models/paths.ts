import {
    FormsModels,
} from '__types/common/form';
import makeModel from '__utils/infrastructure/makeModel';

export const commonMakeModel = (path: (m: FormsModels) => unknown) => {
    return makeModel(path);
};

export const FORM_MODELS: Record<keyof FormsModels, string> = {
    phone: commonMakeModel(m => m.phone),
};
