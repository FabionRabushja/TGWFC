import { Injectable } from "@angular/core";

@Injectable()
export abstract class RemoteRepositoryInterface {

    public abstract get(url: string);
}
