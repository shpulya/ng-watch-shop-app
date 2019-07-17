import { Injectable, Input } from '@angular/core';

import { IItem } from '../../../app.models';
import { Params } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Injectable()
export abstract class ItemViewController<ItemT extends IItem> {

    @Input()
    public readonly item!: ItemT;

    @Input()
    public readonly queryURLParams!: Params;

    public isAdded: boolean = false;

    constructor(
        private cartService: CartService
    ) {}

    public addItemToCart(item: IItem): void {
        this.cartService.addItem(item);
        this.isAdded = true;
    }
}
