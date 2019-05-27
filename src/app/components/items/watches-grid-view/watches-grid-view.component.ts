import { Component, } from '@angular/core';
import { ItemsViewController } from '../items-view.controller';

@Component({
    selector: 'app-watches-grid-view',
    templateUrl: './watches-grid-view.component.html',
    styleUrls: ['./watches-grid-view.component.scss']
})
export class WatchesGridViewComponent extends ItemsViewController {}
