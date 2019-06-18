import { Injectable } from '@angular/core';

import { ItemType, IWatch } from '../../../app.models';
import { ItemDetailsResolver } from '../../../core/resolvers/item-details.resolver';

@Injectable({
    providedIn: 'root'
})
export class WatchDetailsResolver extends ItemDetailsResolver<IWatch> {

    public type: ItemType = ItemType.Watch;
}
