import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CookiesService {

    constructor() { }

    public getCookie(name: string): string {
        debugger;
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

    public deleteCookie(name: string): void {
        this.setCookie(name, '', -1);
    }

    public setCookie(name: string, value: string, expireDays: number, path: string = ''): void {
        const date: Date = new Date();
        date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
        const expires: string = 'expires=' + date.toUTCString();
        document.cookie = `${name}=${value};${expires}${path.length > 0 ? '; path=' + path : ''}`;
    }

}