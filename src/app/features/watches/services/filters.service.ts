import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IWatch } from '../../../app.models';

type TFilterMap = Map<keyof IWatch, Set<string | number>>;

@Injectable({
    providedIn: 'root'
})
export class FiltersService {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public setCategoriesToUrl(categoriesMap: TFilterMap): void {
        const categories = Object.create(null);

        categoriesMap.forEach((value: Set<string | number>, key: string) => {
            categories[key] = JSON.stringify([...value]);
        });

        this.router.navigate(
            ['.'],
            {
                queryParams: { categories: JSON.stringify(categories) },
                queryParamsHandling: 'merge'
            }
        );
    }

    public setPriceToUrl(price: string): void {
        this.router.navigate(
            [this.router.url.split('?')[0] ],
            {
                queryParams: { price: price },
                queryParamsHandling: 'merge',
            },
        );
    }
}
