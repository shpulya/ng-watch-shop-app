import { Component } from '@angular/core';

import { ItemsViewController } from '../items-view.controller';

@Component({
    selector: 'app-watches-list-view',
    templateUrl: './watches-list-view.component.html',
    styleUrls: ['./watches-list-view.component.scss']
})

export class WatchesListViewComponent extends ItemsViewController {}
