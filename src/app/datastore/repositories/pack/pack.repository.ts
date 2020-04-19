import { RemoteRepositoryInterface } from '../../remote/remote.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PackModel } from '../../models/pack.model';
import { map } from 'rxjs/operators';
import { PackRepositoryInterface } from './pack.interface';

@Injectable()
export class PackRepository implements PackRepositoryInterface {

    constructor(private remoteRepository: RemoteRepositoryInterface) {}

    public getPacks(): Observable<PackModel[]> {
        return this.remoteRepository.get("packs").pipe(
            map((packs: []) => packs.map(pack => new PackModel(pack as JSON)))
        )
    }
}
