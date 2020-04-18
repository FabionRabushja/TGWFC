import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GenericError extends Error {
    constructor() {
        super("GENERIC_ERROR");
        this.name = "GENERIC_ERROR";
    }
}
