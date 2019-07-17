import { Injectable } from '@angular/core';

import { ItemType } from '../../../app.models';
import { IWristband } from '../wristbands.models';
import { ItemDetailsResolver } from '../../../core/resolvers/item-details.resolver';

@Injectable({
    providedIn: 'root'
})
export class WristbandDetailsResolver extends ItemDetailsResolver<IWristband> {

    public type: ItemType = ItemType.Wristband;
}
