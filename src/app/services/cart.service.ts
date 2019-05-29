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

    public openCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public items$: BehaviorSubject<TCartMap> = new BehaviorSubject<TCartMap>(new Map());

    constructor(
        private cookieService: CookiesService,
        private watchesService: WatchesService
    ) {
        this.receiveCookiesItems();
    }

    public addItem(item: IItem): void {
        const items: TCartMap = this.items$.getValue();

        if (!items.has(item.id)) {
            this.items$.next(items.set(item.id, {
                item: {
                    id: item.id,
                    image: item.image,
                    name: item.name,
                    price: item.price,
                    description: item.description
                },
                count: 1
            }));
        } else {
            const it = items.get(item.id);

            if (!it) {
                return;
            }

            items.delete(item.id);
            this.items$.next(items.set(item.id, {
                item: it.item,
                count: it.count + 1
            }));
        }

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
        if (item.count > 1) {
            items.set(id, {
                item: item.item,
                count: item.count + 1
            });
        }

        this.items$.next(items);
        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public countItemsInCart(): number {
        return Array.from(this.items$
            .getValue()
            .values())
            .reduce((acc: number, currentItem: ICart) => acc + currentItem.count, 0);
    }

    public changeCartState(show: boolean): void {
        this.openCart$.next(show);
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
                .subscribe((i: IItem) => {
                    itemsMap.set(i.id, {
                        item: {
                            id: i.id,
                            image: i.image,
                            name: i.name,
                            price: i.price,
                            description: i.description
                        },
                        count: item[1]
                    });
                    this.items$.next(itemsMap);
                });
        });
    }
}
