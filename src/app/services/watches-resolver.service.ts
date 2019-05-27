import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IWatch } from '../app.models';
import { LoaderService } from './loader.service';
import { WatchesService } from './watches.service';

@Injectable({
    providedIn: 'root'
})
export class WatchesResolverService implements Resolve<any> {

    constructor(
        private http: HttpClient,
        private loaderService: LoaderService,
        private watchesService: WatchesService
        ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IWatch>> | Observable<never> {
        this.loaderService.startLoading();

        return this.watchesService.getWatches().pipe(
            catchError(error => {
                return of(error);
            }),
            finalize(() => {
                this.loaderService.stopLoading();
            }));
    }
}
