import { Component } from '@angular/core';

import { IItem } from '../../../../app.models';
import { ItemViewController } from '../item-view.controller';

@Component({
    selector: 'app-items-grid-view',
    templateUrl: './items-grid-view.component.html',
    styleUrls: ['./items-grid-view.component.scss']
})
export class ItemsGridViewComponent<ItemT extends IItem> extends ItemViewController<ItemT> {}
