import { Component, Input } from '@angular/core';

import { IItem } from '../../../app.models';
import { Params } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-items-list-view',
    templateUrl: './items-list-view.component.html',
    styleUrls: ['./items-list-view.component.scss']
})
export class ItemsListViewComponent {
    
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
