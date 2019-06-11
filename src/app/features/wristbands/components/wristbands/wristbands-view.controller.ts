import { Input, Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { IWristband } from '../../../../app.models';
import { CartService } from '../../../../core/services/cart.service';

@Injectable()
export abstract class WristbandsViewController {

    @Input()
    public readonly wristband!: IWristband;

    @Input()
    public queryURLParams!: Params;

    public isAdded: boolean = false;

    constructor(
        private cartService: CartService
    ) {}

    public addItemToCart(wristband: IWristband): void {
        this.cartService.addItem(wristband);
        this.isAdded = true;
    }
}
