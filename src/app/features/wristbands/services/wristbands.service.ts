import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWristband } from '../../../app.models';

@Injectable({
    providedIn: 'root'
})
export class WristbandsService {

    constructor(
        private http: HttpClient
    ) {}

    public getWristbands(): Observable<Array<IWristband>> {
        return this.http.get<Array<IWristband>>('assets/data/wristbands.json');
    }

    public getWristbandById(id: number): Observable<IWristband | null> {
        return this.getWristbands()
            .pipe(map((watches: Array<IWristband>) => {
                const filteredWatches = watches.filter((watch: IWristband) => watch.id === id);

                return (filteredWatches.length > 0) ? filteredWatches[0] : null;
            }));
    }

    public getSearchedItemsByName(name: string): Observable<Array<IWristband>> {
        const pattern = new RegExp(`\\b` + name.toLowerCase());

        return this.getWristbands()
            .pipe(map((watches: Array<IWristband>) => {
                if (!name) {
                    return [];
                }

                return watches
                    .filter((watch: IWristband) => watch.name.toLowerCase().match(pattern));
            }));
    }
}
