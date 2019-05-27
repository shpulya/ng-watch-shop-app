import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, ActivatedRoute
} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { IWatch } from '../app.models';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WatchDetailsResolverService implements Resolve<any> {

    constructor(
        private http: HttpClient,
        private loaderService: LoaderService,
        private route: ActivatedRoute
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWatch> | Observable<never> {
        debugger;
        this.loaderService.startLoading();
        // const watchId = parseInt(this.route.snapshot.params['itemId'], 10);
        const watchId = parseInt(JSON.parse(this.route.snapshot.paramMap.get('itemId') || '{}'), 10);

        this.route.params.subscribe(params => {
            const watchId1 = parseInt(params['itemId'], 10);
            console.log(watchId1);
        });

        console.log(this.route.snapshot.params);
        const searchedItem = this.http.get('assets/data/watches.json').pipe(map ((watches: any) => {
            const filteredWatches = watches.filter((watch: IWatch) => watch.id === watchId);

            return (filteredWatches.length > 0) ? filteredWatches[0] : Object();
        }),
            finalize (() => {
                this.loaderService.stopLoading();
            }));

        return searchedItem;
    }
}
