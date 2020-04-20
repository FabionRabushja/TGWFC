import { Injectable } from "@angular/core";

@Injectable()
export abstract class LocalStorageRepositoryInterface {
    public abstract getUsername(): string;

    public abstract setUsername(value: string);
}
