import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWatch } from '../app.models';

@Injectable({
    providedIn: 'root'
})
export class WatchesService {

    constructor(
        private http: HttpClient
    ) {}

    public getWatches(): Observable<Array<IWatch>> {
        return this.http.get<Array<IWatch>>('assets/data/watches.json');
    }

    public getWatchById(id: number): Observable<IWatch | null> {
        return this.getWatches()
            .pipe(map((watches: Array<IWatch>) => {
                const filteredWatches = watches.filter((watch: IWatch) => watch.id === id);

                return (filteredWatches.length > 0) ? filteredWatches[0] : null;
            }));
    }

    public getSearchedItemsByName(name: string): Observable<Array<IWatch>> {
        const pattern = new RegExp(`^` + name.toLowerCase());

        return this.getWatches()
            .pipe(map((watches: Array<IWatch>) => {
                return watches
                    .filter((watch: IWatch) => watch.name.toLowerCase().match(pattern));
            }));
    }
}
