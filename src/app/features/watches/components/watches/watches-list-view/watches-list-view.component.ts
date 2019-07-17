import { Component } from '@angular/core';

import { ItemType, ItemView } from '../../../../../app.models';
import { ItemViewController } from '../../../../../shared/components/item-view/item-view.controller';
import { IWatch } from '../../../watches.models';

@Component({
    selector: 'app-watches-list-view',
    templateUrl: './watches-list-view.component.html'
})
export class WatchesListViewComponent extends ItemViewController<IWatch> {

    public static type: ItemType = ItemType.Watch;

    public static view: ItemView = ItemView.List;
}
