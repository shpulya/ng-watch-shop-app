import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CookiesService } from './cookies.service';

type TItemsMap = Map<number, number>;

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public isShowCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public items$: BehaviorSubject<TItemsMap> = new BehaviorSubject<TItemsMap>(new Map());

    constructor(
        private cookieService: CookiesService
    ) {
        this.receiveCookiesItems();
    }

    public addItem(watchId: number): void {
        const items: Map <number, number> = this.items$.getValue();

        if (!items.has(watchId)) {
            this.items$.next(items.set(watchId, 1));
        } else {
            const watchCount = items.get(watchId);

            if (!watchCount) {
                return;
            }

            this.items$.getValue().delete(watchId);
            this.items$.next(items.set(watchId, watchCount + 1));
        }

        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public deleteItem(watchId: number): void {
        const items: Map <number, number> = this.items$.getValue();

        items.delete(watchId);
        this.items$.next(items);
        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public reduceCountItem(watchId: number): void {
        const items: Map <number, number> = this.items$.getValue();

        const watchCount = this.items$.getValue().get(watchId);

        if (!watchCount) {
            return;
        }

        items.delete(watchId);

        if (watchCount > 1) {
            items.set(watchId, watchCount - 1);
        }

        this.items$.next(items);
        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public countItemsInCart(): number {
        return Array.from(this.items$
            .getValue()
            .values())
            .reduce((acc: number, currentCount: number) => acc + currentCount, 0);
    }

    private setItemsToCookies(items: Map<number, number>): void {
        this.cookieService.setCookie('cartItems', JSON.stringify([...items]), 1);
    }

    private receiveCookiesItems(): void {
        const cookiesItems = JSON.parse(this.cookieService.getCookie('cartItems') || '[]');
        const itemsMap = new Map();

        cookiesItems.forEach((item: Array<number>) => {
            itemsMap.set(item[0], item[1]);
        });

        this.items$.next(itemsMap);
    }
}
