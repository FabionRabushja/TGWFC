import {environment} from '../../../../environments/environment';

export function logData(data: any) {
    if (environment.logEnabled) {
        console.log(data);
    }
}
