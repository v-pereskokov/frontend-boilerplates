import React, {FC} from 'react';
import {useSelector} from 'react-redux';

import {makeFormDataSelector} from '__selectors/form/generic';
import {BaseModel} from '__types/common/form';

import {Options} from './types';

export default function withForm<O, M extends BaseModel>(params: Options) {
    const {formPaths} = params;
    const dataSelector = makeFormDataSelector<M>(formPaths);

    return (ComposedComponent: React.ComponentType<O>) => {
        const WrappedComponent: FC<O> = props => {
            const data = useSelector(dataSelector);
            return <ComposedComponent {...props} formModels={data}/>;
        };

        return WrappedComponent;
    };
}
