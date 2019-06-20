import { Injectable } from '@angular/core';

import { ItemType, IWatch } from '../../../app.models';
import { ItemsResolver } from '../../../core/resolvers/items.resolver';

@Injectable({
    providedIn: 'root'
})
export class WristbandsResolver extends ItemsResolver<IWatch> {

    public type: ItemType = ItemType.Wristband;
}