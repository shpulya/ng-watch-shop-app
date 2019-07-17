import { Component } from '@angular/core';

import { IItem } from '../../../../app.models';
import { ItemViewController } from '../item-view.controller';

@Component({
    selector: 'app-items-list-view',
    templateUrl: './items-list-view.component.html',
    styleUrls: ['./items-list-view.component.scss']
})
export class ItemsListViewComponent<ItemT extends IItem> extends ItemViewController<ItemT> {}
