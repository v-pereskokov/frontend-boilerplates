import {apiInstance} from 'client/api/CSRFAPI';
import {item} from 'client/reducers/user/csrf';
import {entityLoader} from 'client/utils/infrastructure/reducers/entityLoader';

export const csrfLoader = entityLoader(apiInstance, {
    actions: item.actions,
});
