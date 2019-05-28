import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CookiesService } from './cookies.service';
import { IWatch } from '../app.models';
import { WatchesService } from './watches.service';

type TCartMap = Map<IWatch, number>;

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public openCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public items$: BehaviorSubject<TCartMap> = new BehaviorSubject<TCartMap>(new Map());

    constructor(
        private cookieService: CookiesService,
        private watchesService: WatchesService
    ) {
        this.receiveCookiesItems();
    }

    public addItem(item: IWatch): void {
        const items: TCartMap = this.items$.getValue();

        if (!items.has(item)) {
            this.items$.next(items.set(item, 1));
        } else {
            const watchCount = items.get(item);

            if (!watchCount) {
                return;
            }

            this.items$.getValue().delete(item);
            this.items$.next(items.set(item, watchCount + 1));
        }

        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public deleteItem(item: IWatch): void {
        const items: TCartMap = this.items$.getValue();
        items.delete(item);
        this.items$.next(items);
        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public reduceCountItem(item: IWatch): void {
        const items: TCartMap = this.items$.getValue();
        const itemsCount = this.items$.getValue().get(item);

        if (!itemsCount) {
            return;
        }

        items.delete(item);
        if (itemsCount > 1) {
            items.set(item, itemsCount - 1);
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

    public changeCartState(show: boolean): void {
        this.openCart$.next(show);
    }

    private setItemsToCookies(items: TCartMap): void {
        const transformItems: Map<number, number> = new Map<number, number>();

        items.forEach((count: number, item: IWatch) => {
            transformItems.set(item.id, count);
        });

        this.cookieService.setCookie('cartItems', JSON.stringify([...transformItems]), 1);
    }

    private receiveCookiesItems(): void {
        const cookiesItems = JSON.parse(this.cookieService.getCookie('cartItems') || '[]');
        const itemsMap: Map<IWatch, number> = new Map<IWatch, number>();

        cookiesItems.forEach((item: Array<number>) => {
            this.watchesService.getWatchById(item[0]).subscribe((watch: IWatch) => {
                itemsMap.set(watch, item[1]);
                this.items$.next(itemsMap);
            });
        });
    }
}
