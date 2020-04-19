import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerHelper } from '../../crossconcern/helpers/errors/errorhandler.helper';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class RemoteRepository {

    constructor(private http: HttpClient, private errorHandlerHelper: ErrorHandlerHelper) {
        this.http = http;
    }

    public get(url: string) {
        return this.http.get(environment.baseUrl + url).pipe(
            catchError(this.errorHandlerHelper.handleError)
        );
    }
}
