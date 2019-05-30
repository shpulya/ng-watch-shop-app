import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { IWatch } from '../app.models';
import { LoaderService } from './loader.service';
import { WatchesService } from './watches.service';

@Injectable({
    providedIn: 'root'
})
export class WatchDetailsResolverService implements Resolve<any> {

    constructor(
        private loaderService: LoaderService,
        private watchesService: WatchesService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWatch> | Observable<never> {
        const watchId = parseInt(route.params['itemId'], 10);

        return this.watchesService.getWatchById(watchId)
            .pipe(
                catchError(error => {
                    return of(error);
                }),
                finalize (() => {
                    this.loaderService.stopLoading();
                })
            );
    }
}
