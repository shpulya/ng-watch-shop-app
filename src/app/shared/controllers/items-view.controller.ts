import { Input, Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { IItem } from '../../app.models';
import { CartService } from '../../core/services/cart.service';

@Injectable()
export abstract class ItemsViewController {

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
