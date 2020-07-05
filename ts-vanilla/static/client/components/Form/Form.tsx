import {Form as VendorForm} from 'antd';
import React, {PureComponent} from 'react';

import {bound as commonActions} from '__actions';
import {FormFields} from '__types/common/form';

import {Props} from './types';

export default class Form extends PureComponent<Props> {
    public render() {
        const {children, ...props} = this.props;

        return (
            <VendorForm
                {...props}
                fields={this.getFieldData()}
                onFieldsChange={this.handleFieldsChange}
            >
                {children}
            </VendorForm>
        );
    }

    private getFieldData = () => {
        const {formData} = this.props;
        if (formData) {
            return Object.keys(formData).map(key => ({name: key, value: formData[key]?.value}));
        }
    }

    private handleFieldsChange = (changedFields: FormFields) => {
        const {modelId} = this.props;
        commonActions.form.data.set({path: modelId, info: changedFields});
    };
}
