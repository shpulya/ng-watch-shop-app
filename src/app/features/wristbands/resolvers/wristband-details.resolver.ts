import { Injectable } from '@angular/core';

import { ItemType, IWristband } from '../../../app.models';
import { ItemDetailsResolver } from '../../../core/resolvers/item-details.resolver';

@Injectable({
    providedIn: 'root'
})
export class WristbandDetailsResolver extends ItemDetailsResolver<IWristband> {

    public type: ItemType = ItemType.Wristband;
}
