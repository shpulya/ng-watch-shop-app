import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IWatch } from '../app.models';

@Injectable({
    providedIn: 'root'
})
export class WatchesService {

    public watches$: BehaviorSubject<Array<IWatch>> = new BehaviorSubject<Array<IWatch>>([]);

    constructor(
        private http: HttpClient
    ) {
    }

    public getWatches(): BehaviorSubject<Array<IWatch>> {
        if (this.watches$.getValue().length) {
            return this.watches$;
        } else {
            this.http.get<Array<IWatch>>('assets/data/watches.json').subscribe(
                (watches: Array<IWatch>) => {
                    this.watches$.next(watches);
                },
                () => {
                    console.error('Can\'t load watches!');
                }
            );

            return this.watches$;
        }

    }

    public getWatchById(id: number): IWatch {
        const watches = this.getWatches().getValue();

        if (!watches || !watches.length) {
            return Object();
        }

        for (const watch of watches) {
            if (watch.id === id) {
                return watch;
            }
        }

        return Object();
    }

}
