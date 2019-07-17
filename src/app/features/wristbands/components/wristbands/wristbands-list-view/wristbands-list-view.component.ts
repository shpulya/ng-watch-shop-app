import { Component } from '@angular/core';

import { ItemType, ItemView } from '../../../../../app.models';
import { IWristband } from '../../../wristbands.models';
import { ItemViewController } from '../../../../../shared/components/item-view/item-view.controller';

@Component({
    selector: 'app-wristbands-list-view',
    templateUrl: './wristbands-list-view.component.html'
})
export class WristbandsListViewComponent extends ItemViewController<IWristband> {

    public static type: ItemType = ItemType.Wristband;

    public static view: ItemView = ItemView.List;
}
