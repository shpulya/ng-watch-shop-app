import { Injectable } from '@angular/core';
import { IItem, IShortItemInfo, ItemType } from '../../app.models';
import { ItemsFactoryService } from './items-factory.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CookiesService {

    public viewedItems$: BehaviorSubject<Array<IItem>> = new BehaviorSubject<Array<IItem>>([]);

    constructor(
        private itemsFactoryService: ItemsFactoryService
    ) {
        this.receiveViewedItems();
    }

    public setCookie(name: string, value: string, expireDays: number, path: string = ''): void {
        const date: Date = new Date();
        let expires: string;

        date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
        expires = 'expires=' + date.toUTCString();
        document.cookie = `${name}=${value};${expires};${path.length > 0 ? '; path=' + path : ''}`;
    }

    public getCookie(name: string): string {
        const cookiesArr: Array<string> = document.cookie.split(';');
        const cookiesLength: number = cookiesArr.length;
        const cookieName = `${name}=`;
        let cookies: string;

        for (let i = 0; i < cookiesLength; i += 1) {
            cookies = cookiesArr[i].replace(/^\s+/g, '');

            if (cookies.indexOf(cookieName) === 0) {
                return cookies.substring(cookieName.length, cookies.length);
            }
        }

        return '';
    }

    public setViewedItemToCookie(type: string, id: number): void {
        const items = this.getCookie('viewedItems') ? this.getCookie('viewedItems').split(',') : [];

        if (!items.includes(`${id}#${type}`)) {
            items.push(`${id}#${type}`);
            this.setCookie('viewedItems', (items).join(','), 1);
        }
    }

    public receiveViewedItems(): void {
        if (!this.getCookie('viewedItems')) {
            return;
        }

        const itemsId = this.getCookie('viewedItems').split(',');
        const items: Array<IItem> = [];

        itemsId.forEach((id: string) => {
            const parsedId = this.parseUniqueId(id);
            const itemsService = this.itemsFactoryService.getService(<ItemType>parsedId.type);

            itemsService
                .getItemById(parsedId.id)
                .subscribe((i: IItem | null) => {
                    if (i) {
                        items.push(i);
                        this.viewedItems$.next(items);
                    }
                });
        });
    }

    public parseUniqueId(uniqueId: string): IShortItemInfo {

        return {
            id: parseInt(uniqueId.slice(0, uniqueId.indexOf('#')), 10),
            type: uniqueId.slice(uniqueId.indexOf('#') + 1)
        };
    }
}
