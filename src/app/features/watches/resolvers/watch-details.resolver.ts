import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { IWatch } from '../../../app.models';
import { LoaderService } from '../../../core/services/loader.service';
import { WatchesService } from '../services/watches.service';

@Injectable({
    providedIn: 'root'
})
export class WatchDetailsResolver implements Resolve<any> {

    constructor(
        private loaderService: LoaderService,
        private watchesService: WatchesService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWatch> | Observable<never> {
        const watchId = parseInt(route.params['watchId'], 10);

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
