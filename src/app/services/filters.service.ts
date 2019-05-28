import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { IWatch } from '../app.models';

type TFilterMap = Map<keyof IWatch, Set<string | number>>;

@Injectable({
    providedIn: 'root'
})
export class FiltersService {

    constructor(private router: Router) {}

    public setCategoriesToUrl(categoriesMap: TFilterMap): void {
        const categories = Object.create(null);

        categoriesMap.forEach((value: Set<string | number>, key: string) => {
            categories[key] = JSON.stringify([...value]);
        });

        const queryParams: Params = { categories: JSON.stringify(categories) };

        this.router.navigate(
            ['.'],
            {
                queryParams: queryParams,
                queryParamsHandling: 'merge'
            }
        );
    }

    public setPriceToUrl(price: string): void {
        this.router.navigate(
            ['.'],
            {
                queryParams: { price: price },
                queryParamsHandling: 'merge'
            });
    }
}
