import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';
import {PackModel} from '../../models/pack.model';

@Injectable()
export abstract class PackRepositoryInterface {

    public abstract getPacks(): Observable<PackModel[]>;
}
