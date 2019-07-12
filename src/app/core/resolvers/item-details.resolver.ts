import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LoaderService } from '../services/loader.service';
import { IItem, ItemType } from '../../app.models';
import { ItemsFactoryService } from '../services/items-factory.service';

@Injectable({
    providedIn: 'root'
})
export abstract class ItemDetailsResolver<ItemT extends IItem> implements Resolve<Observable<ItemT> | Observable<never>> {

    public abstract type: ItemType;

    constructor(
        private loaderService: LoaderService,
        private itemsFactoryService: ItemsFactoryService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ItemT> | Observable<never> {
        const itemId = parseInt(route.params['itemId'], 10);

        return this.itemsFactoryService.getService(this.type).getItemById(itemId)
            .pipe(
                catchError(error => {
                    return of(error);
                }),
                finalize (() => {
                    this.loaderService.stopLoading();
                })
            )
        ;
    }
}
