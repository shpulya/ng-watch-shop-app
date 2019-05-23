import { Component, } from '@angular/core';
import { ItemsViewController } from '../items-view.controller';

@Component({
    selector: 'app-watches-grid-view',
    templateUrl: './items-grid-view.component.html',
    styleUrls: ['./items-grid-view.component.scss']
})
export class ItemsGridViewComponent extends ItemsViewController {}
