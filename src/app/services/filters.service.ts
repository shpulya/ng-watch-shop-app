import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { IPrice, IWatch } from '../app.models';

type TFilterMap = Map<keyof IWatch, Set<string | number>>;

@Injectable({
    providedIn: 'root'
})
export class FiltersService {

    constructor(private router: Router) { }

    public setCategoriesToUrl(categoriesMap: TFilterMap): void {
        const categories: any = {};

        categoriesMap.forEach((value: Set<string | number>, key: string, map: TFilterMap) => {
            categories[key] = JSON.stringify([...value]);
        })

        const queryParams: Params = { categories: JSON.stringify(categories) };

        this.router.navigate(
            ['.'],
            {
                queryParams: queryParams,
                queryParamsHandling: 'merge'
            });
    }

    public setPriceToUrl(price: string): void {
        const queryParams: Params = { price: price };

        this.router.navigate(
            ['.'],
            {
                queryParams: queryParams,
                queryParamsHandling: 'merge'
            });
    }
}
