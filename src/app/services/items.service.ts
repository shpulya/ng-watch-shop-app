import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../app.models';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    public items$: BehaviorSubject<Array<IItem>> = new BehaviorSubject<Array<IItem>>([]);

    constructor(
        private http: HttpClient
    ) {
    }

    public getItems(): BehaviorSubject<Array<IItem>> {
        if (this.items$.getValue().length) {
            return this.items$;
        } else {
            this.http.get<Array<IItem>>('assets/data/watches.json').subscribe(
                (items: Array<IItem>) => {
                    this.items$.next(items);
                },
                () => {
                    console.error('Can\'t load watches!');
                }
            );

            return this.items$;
        }

    }

    public getItemById(id: number): IItem {
        const items = this.getItems().getValue();

        if (!items || !items.length) {
            return Object();
        }

        for (const item of items) {
            if (item.id === id) {
                return item;
            }
        }

        return Object();
    }

}
