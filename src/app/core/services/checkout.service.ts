import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(private http: HttpClient) {}

    public getRegions(): Observable<Response> {
        const url = 'http://api.novaposhta.ua/v2.0/json/';

        return this.http.post<any>(url, {
            apiKey: 'ea02ed2221704cbb2c8964147657426d',
            modelName: 'Address',
            calledMethod: 'getAreas'
        }, {
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    public getCities(regionRef: string): Observable<Response> {
        const url = 'http://api.novaposhta.ua/v2.0/json/';

        return this.http.post<any>(url, {
            apiKey: 'ea02ed2221704cbb2c8964147657426d',
            modelName: 'AddressGeneral',
            calledMethod: 'getSettlements'
        }, {
            headers: {
                'content-type': 'application/json'
            }
        });
    }
}
