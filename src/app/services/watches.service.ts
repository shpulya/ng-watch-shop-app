import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IWatch } from '../app.models';
import { map } from 'rxjs/operators';

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

    public getItemById(id: number): Observable<IWatch> {

        return this.http.get('assets/data/watches.json').pipe(map ((watches: any) => {
            const filteredWatches = watches.filter((watch: IWatch) => watch.id === id);

            return (filteredWatches.length > 0) ? filteredWatches[0] : Object();
        }));
    }
}
