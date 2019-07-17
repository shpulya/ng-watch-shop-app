import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export interface IRequestCacheEntry {
    url: string;
    response: HttpResponse<any>;
    lastRead: number;
}

const maxAge = 30000;

@Injectable({
    providedIn: 'root'
})
export class RequestCacheWithMap {

    public cache: Map<string, IRequestCacheEntry> = new Map<string, IRequestCacheEntry>();

    constructor() { }

    public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);

        if (!cached) {
            return undefined;
        }

        const isExpired = cached.lastRead < (Date.now() - maxAge);
        const expired = isExpired ? 'expired ' : '';
        console.log(
            `Found ${expired}cached response for "${url}".`);

        return isExpired ? undefined : cached.response;
    }

    public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.urlWithParams;
        console.log(`Caching response from "${url}".`);

        const query = { url, response, lastRead: Date.now() };
        this.cache.set(url, query);

        const expired = Date.now() - maxAge;
        this.cache.forEach(entry => {
            if (entry.lastRead < expired) {
                this.cache.delete(entry.url);
            }
        });

        console.log(`Request cache size: ${this.cache.size}.`);
    }
}
