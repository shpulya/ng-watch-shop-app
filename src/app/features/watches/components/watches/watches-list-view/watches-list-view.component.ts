import { Component } from '@angular/core';

import { WatchesViewController } from '../watches-view.controller';

@Component({
    selector: 'app-watches-list-view',
    templateUrl: './watches-list-view.component.html'
})
export class WatchesListViewComponent extends WatchesViewController {}
