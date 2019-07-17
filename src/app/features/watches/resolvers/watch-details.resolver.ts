import { Injectable } from '@angular/core';

import { ItemType } from '../../../app.models';
import { ItemDetailsResolver } from '../../../core/resolvers/item-details.resolver';
import { IWatch } from '../watches.models';

@Injectable({
    providedIn: 'root'
})
export class WatchDetailsResolver extends ItemDetailsResolver<IWatch> {

    public type: ItemType = ItemType.Watch;
}
