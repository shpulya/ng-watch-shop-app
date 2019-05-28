import { Input, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';

import { IWatch } from '../../app.models';
import { CartService } from '../../services/cart.service';

@Injectable()
export abstract class WatchesViewController {

    @Input()
    public readonly watch!: IWatch;

    @Input()
    public queryURLParams!: Params;

    public showTooltip$: Subject<void> = new Subject<void>();

    public isAdded: boolean = false;

    constructor(
        private cartService: CartService
    ) {}

    public addItemToCart(item: IWatch): void {
        this.cartService.addItem(item);
        this.isAdded = true;
        this.showTooltip$.next();
    }
}
