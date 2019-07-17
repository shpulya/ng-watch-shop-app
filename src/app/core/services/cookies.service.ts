import { Injectable } from '@angular/core';

import { IShortItemInfo } from '../../app.models';

@Injectable({
    providedIn: 'root'
})
export class CookiesService {

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


    public parseUniqueId(uniqueId: string): IShortItemInfo {

        return {
            id: parseInt(uniqueId.slice(0, uniqueId.indexOf('#')), 10),
            type: uniqueId.slice(uniqueId.indexOf('#') + 1)
        };
    }
}
