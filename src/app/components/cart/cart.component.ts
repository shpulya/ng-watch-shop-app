import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { IItem } from '../../app.models';
import { ItemsService } from '../../services/items.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    public items: Map<IItem, number> = new Map<IItem, number>();

    public watchesList: Array<IItem> = [];

    constructor(
        private cartService: CartService,
        private watchesService: ItemsService,
        private cookies: CookieService
    ) {

    }

    public ngOnInit(): void {

        if (this.cartService.items$.getValue()) {
            this.receiveItems();
        } else {
            this.receiveCookiesItems();
        }

        this.watchesList = Array.from(this.items.keys());
    }

    public closeCart(): void {
        this.cartService.isShowCart$.next(false);
    }

    public reduceItemsCount(itemId: number): void {
        this.cartService.reduceCountItem(itemId);
    }

    public deleteItem(itemId: number): void {
        this.cartService.deleteItem(itemId);
        this.watchesList = Array.from(this.items.keys());
    }

    public increaseItemsCount(itemId: number): void {
        this.cartService.addItem(itemId);
    }

    public getItemsCount(item: IItem): number {

        return this.items.get(item) || 0;
    }

    public getFinalSum(): number {
        let finalSum = 0;

        this.items.forEach((acc: number, item: IItem) => {
            finalSum += acc * item.price;
        });

        return finalSum;
    }

    private receiveCookiesItems(): void {
        const items = JSON.parse(this.cookies.get('cartItems'));
        const itemsMap = new Map();

        items.forEach((item: Array<number>) => {
            itemsMap.set(item[0], item[1]);
            this.items.set(this.watchesService.getItemById(item[0]), item[1]);
        });

        this.items.forEach((count, item) => {
            if (!itemsMap.has(item.id)) {
                this.items.delete(item);
            }
        });
    }

    private receiveItems(): void {
        this.cartService.items$.subscribe((items: Map<number, number>) => {
            items.forEach((count, itemId) => {
                this.items.set(this.watchesService.getItemById(itemId), count);
            });

            this.items.forEach((count, item) => {
                if (!items.has(item.id)) {
                    this.items.delete(item);
                }
            });
        });
    }
}
