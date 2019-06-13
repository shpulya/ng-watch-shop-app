import { Injectable } from '@angular/core';

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
}
