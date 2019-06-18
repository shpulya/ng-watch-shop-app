import { Component } from '@angular/core';

import { ItemsViewController } from '../../controllers/items-view.controller';

@Component({
    selector: 'app-items-list-view',
    templateUrl: './items-list-view.component.html',
    styleUrls: ['./items-list-view.component.scss']
})
export class ItemsListViewComponent extends ItemsViewController {}
