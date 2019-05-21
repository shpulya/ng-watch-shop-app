import { Component, OnInit } from '@angular/core';

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
        this.receiveItems();
    }

    public ngOnInit(): void {
    }

    public closeCart(): void {
        this.cartService.isShowCart$.next(false);
    }

    public reduceItemsCount(itemId: number): void {
        this.cartService.reduceCountItem(itemId);
    }

    public deleteItem(itemId: number): void {
        this.cartService.deleteItem(itemId);
    }

    public increaseItemsCount(itemId: number): void {
        this.cartService.addItem(itemId);
    }

    public getItemsCount(item: IWatch): number {
        return this.items.get(item) || 0;
    }

    public getFinalSum(): number {
        let finalSum = 0;

        this.items.forEach((acc: number, item: IWatch) => {
            finalSum += acc * item.price;
        });

        return finalSum;
    }

    private receiveItems(): void {
        this.cartService.items$.subscribe((items: Map<number, number>) => {
            items.forEach((count, itemId) => {
                this.watchesService.getItemById(itemId).subscribe((watch: IWatch) => {
                    this.items.set(watch, count);
                });
            });

            this.items.forEach((count, item) => {
                if (!items.has(item.id)) {
                    this.items.delete(item);
                }
            });

            this.watchesList = Array.from(this.items.keys());
        });
    }
}
