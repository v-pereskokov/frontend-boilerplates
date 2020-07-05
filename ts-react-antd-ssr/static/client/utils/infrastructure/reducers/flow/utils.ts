import {Status} from './types';

export function checkPending(status: Status) {
    return status === Status.Pending;
}
