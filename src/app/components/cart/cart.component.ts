import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { IWatch } from '../../app.models';
import { WatchesService } from '../../services/watches.service';
import { CookieService } from 'ngx-cookie-service';

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
        private watchesService: WatchesService,
        private cookies: CookieService
    ) {

    }

    public ngOnInit(): void {

        if (this.cartService.items$.getValue()) {

            this.cartService.items$.subscribe((items: Map<number, number>) => {
                items.forEach((count, itemId) => {
                    this.items.set(this.watchesService.getWatchById(itemId), count);
                });


                this.items.forEach((count, item) => {
                    if (!items.has(item.id)) {
                        this.items.delete(item);
                    }
                });
            });
        } else {

            const items = JSON.parse(this.cookies.get('cartItems'));
            const itemsMap = new Map();

            items.forEach((item: Array<number>) => {
                itemsMap.set(item[0], item[1]);
                this.items.set(this.watchesService.getWatchById(item[0]), item[1]);
            });

            this.items.forEach((count, item) => {
                if (!itemsMap.has(item.id)) {
                    this.items.delete(item);
                }
            });
        }

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
        this.cartService.addItem(watchId);
    }

    public getItemsCount(watch: IWatch): number {

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
