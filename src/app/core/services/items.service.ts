import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IItem, ItemType } from '../../app.models';

@Injectable()
export abstract class ItemsService<ItemT extends IItem = IItem> {

    public abstract type: ItemType;

    constructor(
        protected http: HttpClient
    ) {}

    public abstract getItems(): Observable<Array<ItemT>>;

    public getItemById(id: number): Observable<ItemT | null> {
        return this.getItems()
            .pipe(map((items: Array<ItemT>) => {
                const filteredItems = items.filter((item: ItemT) => item.id === id);

                return (filteredItems.length > 0) ? filteredItems[0] : null;
            }));
    }

    public findItemsByName(name: string): Observable<Array<ItemT>> {
        const pattern = new RegExp(`\\b` + name.toLowerCase());

        return this.getItems()
            .pipe(map((items: Array<ItemT>) => {
                if (!name) {
                    return [];
                }

                return items
                    .filter((item: ItemT) => item.name.toLowerCase().match(pattern));
            }));
    }
}
