import { Component } from '@angular/core';

import { ItemsViewController } from '../../controllers/items-view.controller';

@Component({
    selector: 'app-items-grid-view',
    templateUrl: './items-grid-view.component.html',
    styleUrls: ['./items-grid-view.component.scss']
})
export class ItemsGridViewComponent extends ItemsViewController {}
