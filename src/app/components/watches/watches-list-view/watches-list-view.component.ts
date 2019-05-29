import { Component } from '@angular/core';

import { WatchesViewController } from '../watches-view.controller';

@Component({
    selector: 'app-watches-list-view',
    templateUrl: './watches-list-view.component.html',
    styleUrls: ['./watches-list-view.component.scss']
})
export class WatchesListViewComponent extends WatchesViewController {}
