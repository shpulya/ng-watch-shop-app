import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { IWatch } from '../app.models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WatchesService {

    public items$: BehaviorSubject<Array<IWatch>> = new BehaviorSubject<Array<IWatch>>([]);

    constructor(
        private http: HttpClient
    ) {}

    public getWatches(): BehaviorSubject<Array<IWatch>> {
        if (this.items$.getValue().length) {
            return this.items$;
        } else {
            this.http.get<Array<IWatch>>('assets/data/watches.json').subscribe(
                (items: Array<IWatch>) => {
                    this.items$.next(items);
                },
                () => {
                    console.error('Can\'t load watches!');
                }
            );

            return this.items$;
        }
    }

    public getItemById(id: number): Observable<IWatch> {
        const searchedItem = this.getWatches().pipe(map ((watches: Array<IWatch>) => {
            const filteredWatches = watches.filter((watch: IWatch) => watch.id === id);

            return (filteredWatches.length > 0) ? filteredWatches[0] : Object();
        }));

        return searchedItem;
    }

}
