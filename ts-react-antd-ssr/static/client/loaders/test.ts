import {apiInstance} from '__api/TestAPI';
import {items} from '__reducers/languages/languages';
import {entityLoader, entityFind} from '__utils/infrastructure/reducers/entityLoader';

export const listLoader = entityLoader(apiInstance, {
    // Можно через mapOptions прокинуть любые параметры
    // Ловить в API вот так: public request = ({id}: FindRequest) => {}
    actions: items.actions,
});
// Автоматически берется id
export const itemLoader = entityFind(apiInstance, {actions: items.actions});
