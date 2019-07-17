import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    constructor(
        private router: Router
    ) {}

    public setCategoriesToUrl(categoriesMap: Map<string, Set<string | number>>): void {
        const categories = Object.create(null);

        categoriesMap.forEach((value: Set<string | number>, key: string) => {
            categories[key] = JSON.stringify([...value]);
        });

        this.router.navigate(
            [this.router.url.split('?')[0]],
            {
                queryParams: { categories: JSON.stringify(categories) },
                queryParamsHandling: 'merge'
            }
        );
    }

    public setPriceToUrl(price: string): void {
        this.router.navigate(
            [this.router.url.split('?')[0]],
            {
                queryParams: { price: price },
                queryParamsHandling: 'merge',
            },
        );
    }
}
