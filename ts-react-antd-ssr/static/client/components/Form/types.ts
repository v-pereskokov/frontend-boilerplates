import {FormProps} from 'antd/lib/form';

import {FormField} from '__types/common/form';

export type OwnProps = {
    modelId?: string;
} & FormProps;

export type StateProps = {
    formData: {
        [k in string]: FormField
    };
}

export type Props = OwnProps & StateProps;
