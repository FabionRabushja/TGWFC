import { Injectable } from '@angular/core';
import { PackRepositoryInterface } from '../../datastore/repositories/pack/pack.interface';
import { Observable } from 'rxjs';
import { PackModel } from '../../datastore/models/pack.model';

@Injectable()

export class GameManager {

    constructor(protected packRepository: PackRepositoryInterface) {
    }

    public getPacks() : Observable<PackModel[]>{
        return this.packRepository.getPacks();
    }
}
