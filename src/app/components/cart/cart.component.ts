import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { IWatch } from '../../app.models';
import { WatchesService } from '../../services/watches.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    public items: Map<IWatch, number> = new Map<IWatch, number>();

    public watchesList: Array<IWatch> = [];

    constructor(
        private cartService: CartService,
        private watchesService: WatchesService
    ) {

    }

    public ngOnInit(): void {

        this.cartService.items$.subscribe((items: Map<number, number>) => {
            items.forEach((count, itemId) => {
                this.items.set(this.watchesService.getWatchById(itemId), count);
            });
        });

        this.watchesList = Array.from(this.items.keys());
    }

    public closeCart(): void {
        this.cartService.isShowCart$.next(false);
    }

    public reduceWatchesCount(watchId: number): void {
        this.cartService.reduceCountItem(watchId);
    }

    public deleteSameWatches(watchId: number): void {
        this.cartService.deleteItem(watchId);
        this.watchesList = Array.from(this.items.keys());
    }

    public increaseWatchesCount(watchId: number): void {
        this.cartService.addWatchToCart(watchId);
    }

    public getItemsCount(watch: IWatch): number {
        console.log('count', this.items);

        return this.items.get(watch) || 0;
    }

    public getFinalSum(): number {
        let finalSum = 0;

        this.items.forEach((acc: number, watch: IWatch) => {
            finalSum += acc * watch.price;
        });

        return finalSum;
    }
}
