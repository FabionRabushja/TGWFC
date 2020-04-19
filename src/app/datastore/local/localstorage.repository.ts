import { Injectable } from "@angular/core";
import { LocalStorageRepositoryInterface } from "./localstorage.interface";
import {LOCAL_STORAGE_USERNAME} from '../../crossconcern/utilities/properties/localstorage.property';

@Injectable()
export class LocalStorageRepository implements LocalStorageRepositoryInterface {

    public getUsername(): string {
        return localStorage.getItem(LOCAL_STORAGE_USERNAME);
    }

    public setUsername(value: string) {
        localStorage.setItem(LOCAL_STORAGE_USERNAME, value);
    }

    public removeUsername() {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME);
    }
}
