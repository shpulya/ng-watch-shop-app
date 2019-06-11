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
export class WristbandsResolver implements Resolve<any> {

    constructor(
        private loaderService: LoaderService,
        private wristbandsService: WristbandsService
    ) {}

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IWristband>> | Observable<never> {
        this.loaderService.startLoading();

        return this.wristbandsService.getWristbands()
            .pipe(
                catchError(error => {
                    return of(error);
                }),
                finalize(() => {
                    this.loaderService.stopLoading();
                })
            );
    }
}
