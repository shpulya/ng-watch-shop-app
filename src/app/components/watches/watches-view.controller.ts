import { Input, Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { IWatch } from '../../app.models';
import { CartService } from '../../services/cart.service';

@Injectable()
export abstract class WatchesViewController{

    @Input()
    public readonly watch!: IWatch;

    @Input()
    public queryURLParams!: Params;

    public isAdded: boolean = false;

    constructor(
        private cartService: CartService
    ) {}

    public addItemToCart(itemId: number): void {
        this.cartService.addItem(itemId);
        this.isAdded = true;
    }

}
