import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IWatch } from '../app.models';
import { LoaderService } from './loader.service';

@Injectable({
    providedIn: 'root'
})
export class ItemsResolverService implements Resolve<any> {

    public isL: Subject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient,
        private loaderService: LoaderService
        ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IWatch>> | Observable<never> {
        const url = 'assets/data/watches.json';

        this.loaderService.startLoading();

        return this.http.get(url).pipe(catchError(error => {
            return of(error);
        }),
            finalize (() => {
                this.loaderService.stopLoading();
            })
        );
    }
}
