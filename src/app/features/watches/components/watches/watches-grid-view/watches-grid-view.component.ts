import { Component } from '@angular/core';

import { WatchesViewController } from '../watches-view.controller';

@Component({
    selector: 'app-watches-grid-view',
    templateUrl: './watches-grid-view.component.html'
})
export class WatchesGridViewComponent extends WatchesViewController {}
