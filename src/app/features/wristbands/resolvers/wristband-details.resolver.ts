import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { IWristband } from '../../../app.models';
import { LoaderService } from '../../../core/services/loader.service';
import { WristbandsService } from '../services/wristbands.service';

@Injectable({
    providedIn: 'root'
})
export class WristbandDetailsResolver implements Resolve<any> {

    constructor(
        private loaderService: LoaderService,
        private wristbandsService: WristbandsService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWristband> | Observable<never> {
        const watchId = parseInt(route.params['wristbandId'], 10);

        return this.wristbandsService.getWristbandById(watchId)
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
