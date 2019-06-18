import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ItemType, IWristband } from '../../../app.models';
import { ItemsService } from '../../../core/services/items.service';

@Injectable()
export class WristbandsService extends ItemsService<IWristband> {

    public type: ItemType = ItemType.Wristband;

    public getItems(): Observable<Array<IWristband>> {
        return this.http.get<Array<IWristband>>('assets/data/wristbands.json');
    }
}
