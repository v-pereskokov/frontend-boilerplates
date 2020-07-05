import {BaseActions} from '../flow/types';

export interface EntityLoaderConfig<D> {
    actions: Partial<BaseActions<D>>;
    mapOptions?: (state: any, initArgs: any) => any;
}
