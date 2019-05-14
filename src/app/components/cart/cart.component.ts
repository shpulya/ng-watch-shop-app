import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { IWatch } from '../../app.models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    @Output()
    public showCartEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

    public cartMap: Map<IWatch, number> = new Map<IWatch, number>();

    public watchesList: Array<IWatch> = [];

    constructor(
        private cartService: CartService
    ) {
    }

    public ngOnInit(): void {
        this.cartMap = this.cartService.getCartMap();
        this.watchesList = Array.from(this.cartMap.keys());
    }

    public closeCart(): void {
        this.showCartEmit.emit(false);
    }

    public reduceWatchesCount(watch: IWatch): void {
        this.cartService.deleteWatchFromCart(watch, false);
    }

    public deleteSameWatches(watch: IWatch): void {
        this.cartService.deleteWatchFromCart(watch, true);
        this.cartMap.delete(watch);
        this.cartMap = this.cartService.getCartMap();
        this.watchesList = Array.from(this.cartMap.keys());
    }

    public increaseWatchesCount(watch: IWatch): void {
        this.cartService.addWatchToCart(watch);
    }

    public getItemsCount(watch: IWatch): number {
        return this.cartMap.get(watch) || 0;
    }

    public getFinalSum(): number {
        let finalSum = 0;

        this.cartMap.forEach((acc: number, watch: IWatch) => {
            finalSum += acc * watch.price;
        });

        return finalSum;
    }
}
