import { Component } from '@angular/core';

import { ItemsViewController } from '../items-view.controller';

@Component({
    selector: 'app-watches-list-view',
    templateUrl: './items-list-view.component.html',
    styleUrls: ['./items-list-view.component.scss']
})

export class ItemsListViewComponent extends ItemsViewController {}
