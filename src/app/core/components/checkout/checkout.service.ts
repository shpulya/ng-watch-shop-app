import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    private cache: Map<string, any> = new Map();

    constructor(
        private http: HttpClient,
        private loaderService: LoaderService
    ) {}

    public getRegions(): Observable<Response> {
        const url = 'http://api.novaposhta.ua/v2.0/json/';

        if (this.cache.has('regions')) {
            return of(this.cache.get('regions'));
        }

        this.loaderService.startLoading();

        return this.http
            .post<any>(url, {
                apiKey: 'ea02ed2221704cbb2c8964147657426d',
                modelName: 'Address',
                calledMethod: 'getAreas'
            }, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            .pipe(
                catchError(error => of(error)),
                tap((data: any) => {
                    this.cache.set('regions', data);
                }),
                finalize(() => this.loaderService.stopLoading())
            )
        ;
    }

    public getCities(regionRef: string): Observable<Response> {
        const url = 'http://api.novaposhta.ua/v2.0/json/';

        if (this.cache.has(regionRef)) {
            return of(this.cache.get(regionRef));
        }

        this.loaderService.startLoading();

        return this.http.post<any>(url, {
            apiKey: 'ea02ed2221704cbb2c8964147657426d',
            modelName: 'AddressGeneral',
            calledMethod: 'getSettlements'
        }, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .pipe(
                tap((data: any) => {
                    this.cache.set(regionRef, data);
                }),
                finalize(() => this.loaderService.stopLoading())
            );
    }
}
