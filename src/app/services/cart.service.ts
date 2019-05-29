import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CookiesService } from './cookies.service';
import { ICart, IItem } from '../app.models';
import { WatchesService } from './watches.service';

type TCartMap = Map<number, ICart> ;

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public items$: BehaviorSubject<TCartMap> = new BehaviorSubject<TCartMap>(new Map());

    constructor(
        private cookieService: CookiesService,
        private watchesService: WatchesService
    ) {
        this.receiveCookiesItems();
    }

    public addItem(item: IItem): void {
        const items: TCartMap = this.items$.getValue();
        const count = (items.get(item.id)) ? items.get(item.id)!.count : 1;

        items.delete(item.id);

        this.items$.next(items.set(item.id, {
            item: item,
            count: count + 1
        }));

        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public deleteItem(id: number): void {
        const items: TCartMap = this.items$.getValue();

        items.delete(id);

        this.items$.next(items);
        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public reduceCountItem(id: number): void {
        const items: TCartMap = this.items$.getValue();
        const item = items.get(id);

        if (!item) {
            return;
        }

        items.delete(id);

        if (item.count > 1) {
            items.set(id, {
                item: item.item,
                count: item.count - 1
            });
        }

        this.items$.next(items);

        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public increaseCountItem(id: number): void {
        const items: TCartMap = this.items$.getValue();
        const item = items.get(id);

        if (!item) {
            return;
        }

        items.delete(id);
        items.set(id, {
            item: item.item,
            count: item.count + 1
        });

        this.items$.next(items);

        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public countItemsInCart(): number {
        return Array.from(this.items$.getValue().values())
            .reduce((acc: number, currentItem: ICart) => acc + currentItem.count, 0)
        ;
    }

    public open(): void {
        this.opened$.next(true);
    }

    public close(): void {
        this.opened$.next(false);
    }

    private setItemsToCookies(items: TCartMap): void {
        const transformItems: Map<number, number> = new Map<number, number>();

        items.forEach((item: ICart, id: number) => {
            transformItems.set(id, item.count);
        });

        this.cookieService.setCookie('cartItems', JSON.stringify([...transformItems]), 1);
    }

    private receiveCookiesItems(): void {
        const cookiesItems = JSON.parse(this.cookieService.getCookie('cartItems') || '[]');
        const itemsMap: TCartMap = new Map<number, ICart>();

        cookiesItems.forEach((item: Array<number>) => {
            this.watchesService
                .getWatchById(item[0])
                .subscribe((i: IItem | null) => {
                    if (i) {
                        itemsMap.set(i.id, {
                            item: i,
                            count: item[1]
                        });
                        this.items$.next(itemsMap);
                    }
                });
        });
    }
}
