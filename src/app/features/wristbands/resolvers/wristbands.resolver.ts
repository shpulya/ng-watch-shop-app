import { Injectable } from '@angular/core';

import { ItemType } from '../../../app.models';
import { ItemsResolver } from '../../../core/resolvers/items.resolver';
import { IWatch } from '../../watches/watches.models';

@Injectable({
    providedIn: 'root'
})
export class WristbandsResolver extends ItemsResolver<IWatch> {

    public type: ItemType = ItemType.Wristband;
}
