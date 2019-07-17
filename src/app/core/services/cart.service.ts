import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CookiesService } from './cookies.service';
import { IItem, IShortItemInfo, ItemType, IType } from '../../app.models';
import { WatchesService } from '../../features/watches/services/watches.service';
import { WristbandsService } from '../../features/wristbands/services/wristbands.service';
import { ItemsFactoryService } from './items-factory.service';

export interface ICart {
    item: IItem;
    count: number;
}

type TCartMap = Map<string, ICart> ;

@Injectable({
    providedIn: 'root'
})
export class CartService {

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

    public generateItemId(item: IShortItemInfo): string {
        const {id, type} = item;

        return `${id}#${type}`;
    }

    public addItem(item: IItem): void {
        const items: TCartMap = this.items$.getValue();
        const searchedItem = items.get(this.generateItemId(item));
        const count = (searchedItem) ? searchedItem.count : 0;

        items.delete(this.generateItemId(item));

        this.items$.next(items.set(this.generateItemId(item), {
            item: item,
            count: count + 1
        }));

        this.setItemsToCookies(items);
    }

    public deleteItem(i: IShortItemInfo): void {
        const items: TCartMap = this.items$.getValue();

        items.delete(this.generateItemId(i));

        this.items$.next(items);
        this.setItemsToCookies(items);
    }

    public reduceCountItem(i: IShortItemInfo): void {
        const items: TCartMap = this.items$.getValue();
        const item = items.get(this.generateItemId(i));

        if (!item) {
            return;
        }

        items.delete(this.generateItemId(i));

        if (item.count > 1) {
            items.set(this.generateItemId(i), {
                item: item.item,
                count: item.count - 1
            });
        }

        this.items$.next(items);

        this.setItemsToCookies(items);
    }

    public increaseCountItem(i: IShortItemInfo): void {
        const items: TCartMap = this.items$.getValue();
        const item = items.get(this.generateItemId(i));

        if (!item) {
            return;
        }

        items.delete(this.generateItemId(i));
        items.set(this.generateItemId(i), {
            item: item.item,
            count: item.count + 1
        });

        this.items$.next(items);

        this.setItemsToCookies(items);
    }

    public countItemsInCart(): number {
        return Array.from(this.items$.getValue().values())
            .reduce((acc: number, currentItem: ICart) => acc + currentItem.count, 0)
        ;
    }

    public clear(): void {
        const newCart: TCartMap = new Map();

        this.items$.next(newCart);
        this.setItemsToCookies(this.items$.getValue());
    }

    public open(): void {
        this.opened$.next(true);
    }

    public close(): void {
        this.opened$.next(false);
    }


    public getFinalSum(): number {
        let finalSum = 0;

        this.items$.getValue().forEach((item: ICart) => {
            finalSum += item.count * item.item.price;
        });

        return finalSum;
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
                        itemsMap.set(this.generateItemId(i), {
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
