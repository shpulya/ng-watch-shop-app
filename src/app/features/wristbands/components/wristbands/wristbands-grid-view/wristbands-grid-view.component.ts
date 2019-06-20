import { Component } from '@angular/core';

import { ItemType, ItemView, IWristband } from '../../../../../app.models';
import { ItemViewController } from '../../../../../shared/components/item-view/item-view.controller';

@Component({
    selector: 'app-wristbands-grid-view',
    templateUrl: './wristbands-grid-view.component.html'
})
export class WristbandsGridViewComponent extends ItemViewController<IWristband> {


    public static type: ItemType = ItemType.Wristband;

    public static view: ItemView = ItemView.Grid;
}
