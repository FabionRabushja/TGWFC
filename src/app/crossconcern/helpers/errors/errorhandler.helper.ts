import { ErrorHandler, Injectable } from "@angular/core";
import { throwError } from "rxjs/internal/observable/throwError";
import { HttpErrorResponse } from "@angular/common/http";
import { logData } from "../generic/generic.helper";
import { GenericError } from "./generic.error";

@Injectable()
export class ErrorHandlerHelper implements ErrorHandler {

    constructor() {}

    public handleError(error: Error) {
        // Sentry.captureException(error);
        if (error instanceof HttpErrorResponse) {
            logData('http error response');
            // return an observable with a agent-facing error message
            return throwError(error);
        }
        logData(error);
        logData('no http error response');
            // return an observable with a agent-facing error message
        return throwError(error);

    }

    public showError(error: Error) {
        if (error instanceof HttpErrorResponse) {
            this.handleHttpError(error as HttpErrorResponse);
        } else {
            this.handleLocalError(error);
        }
    }

    private handleHttpError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            logData('An error occurred: ' + error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            logData('Backend error: ');
            logData(error.error);
        }
        // return throwError('Something bad happened; please try again later.');
    }

    private handleLocalError(error: Error) {
        logData('local error ' + error.message);
        // return throwError(error.message);
    }

    private parseError(error: HttpErrorResponse) {
        switch (error.error.error) {
            default: return new GenericError();
        }
    }
}
