import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CookiesService } from './cookies.service';
import { ICart, IItem, IShortItemInfo, ItemType, IType } from '../../app.models';
import { WatchesService } from '../../features/watches/services/watches.service';
import { WristbandsService } from '../../features/wristbands/services/wristbands.service';
import { ItemsFactoryService } from './items-factory.service';

type TCartMap = Map<string, ICart> ;

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public types: Array<IType> = [
        {
            type: 'wristband',
            pluralType: 'watches'
        },
        {
            type: 'wristband',
            pluralType: 'wristbands'
        }
    ];

    public opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public items$: BehaviorSubject<TCartMap> = new BehaviorSubject<TCartMap>(new Map());

    constructor(
        private cookieService: CookiesService,
        private watchesService: WatchesService,
        private wristbandsService: WristbandsService,
        private itemsFactoryService: ItemsFactoryService
    ) {
        this.receiveCookiesItems();
    }

    public addItem(item: IItem): void {
        const {id, type} = item;
        const items: TCartMap = this.items$.getValue();
        const searchedItem = items.get(`${id}#${type}`);
        const count = (searchedItem) ? searchedItem.count : 0;

        items.delete(`${id}#${type}`);

        this.items$.next(items.set(`${id}#${type}`, {
            item: item,
            count: count + 1
        }));

        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public deleteItem(i: IShortItemInfo): void {
        const items: TCartMap = this.items$.getValue();

        items.delete(`${i.id}#${i.type}`);

        this.items$.next(items);
        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public reduceCountItem(i: IShortItemInfo): void {
        const items: TCartMap = this.items$.getValue();
        const item = items.get(`${i.id}#${i.type}`);

        if (!item) {
            return;
        }

        items.delete(`${i.id}#${i.type}`);

        if (item.count > 1) {
            items.set(`${i.id}#${i.type}`, {
                item: item.item,
                count: item.count - 1
            });
        }

        this.items$.next(items);

        this.countItemsInCart();
        this.setItemsToCookies(items);
    }

    public increaseCountItem(i: IShortItemInfo): void {
        const items: TCartMap = this.items$.getValue();
        const item = items.get(`${i.id}#${i.type}`);

        if (!item) {
            return;
        }

        items.delete(`${i.id}#${i.type}`);
        items.set(`${i.id}#${i.type}`, {
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
        const transformItems: Map<string, number> = new Map();

        items.forEach((item: ICart, key: string) => {
            transformItems.set(key, item.count);
        });

        this.cookieService.setCookie('cartItems', JSON.stringify([...transformItems]), 1);
    }

    private receiveCookiesItems(): void {
        const cookiesItems = JSON.parse(this.cookieService.getCookie('cartItems') || '[]');
        const itemsMap: TCartMap = new Map<string, ICart>();

        cookiesItems.forEach((items: [string, number]) => {
            const parsedId = this.cookieService.parseUniqueId(items[0]);
            const itemsService = this.itemsFactoryService.getService(<ItemType>parsedId.type);

            itemsService
                .getItemById(parsedId.id)
                .subscribe((i: IItem | null) => {
                    if (i) {
                        itemsMap.set(`${i.id}#${i.type}`, {
                            item: i,
                            count: items[1]
                        });
                        this.items$.next(itemsMap);
                    }
                })
            ;
        });
    }
}
