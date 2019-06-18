import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ItemType, IWatch } from '../../../app.models';
import { ItemsService } from '../../../core/services/items.service';

@Injectable()
export class WatchesService extends ItemsService<IWatch> {

    public type: ItemType = ItemType.Watch;

    public getItems(): Observable<Array<IWatch>> {
        return this.http.get<Array<IWatch>>('assets/data/watches.json');
    }
}
