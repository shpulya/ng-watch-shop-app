import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';

import { IItem } from '../../../app.models';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-items-grid-view',
    templateUrl: './items-grid-view.component.html',
    styleUrls: ['./items-grid-view.component.scss']
})
export class ItemsGridViewComponent {

    @Input()
    public readonly item!: IItem;

    @Input()
    public queryURLParams!: Params;
    
    public isAdded: boolean = false;

    constructor(
        private cartService: CartService
    ) {}

    public addItemToCart(item: IItem): void {
        this.cartService.addItem(item);
        this.isAdded = true;
    }
}
