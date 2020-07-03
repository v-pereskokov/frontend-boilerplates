import {EntityAPI, FindRequest} from 'infrastructure/common';

import {api} from '__utils/transport';

// Утащить в типы
interface SomeRequest {
    title: string;
    id: string;
}

interface SomeResponse {
    data: string[];
}

class TestAPI implements EntityAPI {
    public request = ({id}: FindRequest): Promise<string[]> => {
        return api.get<SomeRequest, SomeResponse>(`/test/${id}`, {title: 'test', id})
            .then(({data}) => data);
    };

    public create = (someFormData: {}): Promise<string[]> => {
        return api.post<{}>('/test/action', someFormData)
            .then(() => []);
    };
}

export const apiInstance = new TestAPI();
