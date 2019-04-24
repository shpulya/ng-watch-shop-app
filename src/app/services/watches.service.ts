import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IWatch} from '../app.models';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WatchesService {

    private watches$: BehaviorSubject<Array<IWatch>> = new BehaviorSubject<Array<IWatch>>([]);

    constructor(
        private http: HttpClient
    ) {
    }

    public getWatches(): Observable<Array<IWatch>> {
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

    public getWatchById(id: number): IWatch | null {
        const watches = this.watches$.getValue();

        if (!watches || !watches.length) {
            return null;
        }

        for (const watch of watches) {
            if (watch.id === id) {
                return watch;
            }
        }

        return null;
    }

}
