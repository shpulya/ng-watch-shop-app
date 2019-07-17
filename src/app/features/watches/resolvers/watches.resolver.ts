import { Injectable } from '@angular/core';

import { ItemType } from '../../../app.models';
import { ItemsResolver } from '../../../core/resolvers/items.resolver';
import { IWatch } from '../watches.models';

@Injectable({
    providedIn: 'root'
})
export class WatchesResolver extends ItemsResolver<IWatch> {

    public type: ItemType = ItemType.Watch;
}
