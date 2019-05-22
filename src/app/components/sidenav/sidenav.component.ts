import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs';

import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatch, IFilter } from '../../app.models';
import { FiltersService } from '../../services/filters.service';

type TFilterMap = Map<keyof IWatch, Set<string | number>>;

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

    @Output()
    public onCategoriesUpdate: EventEmitter<TFilterMap> = new EventEmitter<TFilterMap>();

    @Output()
    public onPriceUpdate: EventEmitter<IPrice> = new EventEmitter<IPrice>();

    public showPriceFilter: boolean = true;

    public filtersMapKeys!: Array<keyof IWatch>;

    public checkedFiltersMapKeys!: Array<keyof IWatch>;

    public filtersMap: TFilterMap = new Map<keyof IWatch, Set<string | number>>();

    public checkedFiltersMap: TFilterMap = new Map<keyof IWatch, Set<string | number>>();

    public filters: Array<IFilter> = [
        {
            name: 'manufacturer',
            displayName: 'Manufacturer',
            showFilter: false
        }, {
            name: 'screenSize',
            displayName: 'Screen Size',
            showFilter: false
        }, {
            name: 'screenType',
            displayName: 'Screen Type',
            showFilter: false
        }, {
            name: 'os',
            displayName: 'OS',
            showFilter: false
        }, {
            name: 'ramSize',
            displayName: 'RAM Size',
            showFilter: false
        }, {
            name: 'romSize',
            displayName: 'Internal Memory',
            showFilter: false
        }];

    private price: IPrice = {from: 0, to: 999999};

    private alive: boolean = true;

    constructor(
        private watchesService: WatchesService,
        private router: Router,
        private route: ActivatedRoute,
        private filterService: FiltersService
    ) {
    }

    public ngOnInit(): void {
        this.updateFiltersMap(this.route.snapshot.data.watches);
        this.getQueryParams();
        setTimeout(() => this.setInitialFilters());
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }

    public setPrice(priceKey: keyof IPrice, value: number): void {
        this.price[priceKey] = value;
        this.filterService.setPriceToUrl(JSON.stringify(this.price));
        this.onPriceUpdate.emit(this.price);
    }

    public onFilterChecked(category: keyof IWatch, value: string | number): void {

        if (!this.checkedFiltersMap.has(category)) {
            const filtersSet: Set<string | number> = new Set();

            filtersSet.add(value);
            this.checkedFiltersMap.set(category, filtersSet);
            this.onCategoriesUpdate.emit(this.checkedFiltersMap);
            this.checkedFiltersMapKeys = Array.from(this.checkedFiltersMap.keys());
            this.filterService.setCategoriesToUrl(this.checkedFiltersMap);

            return;
        }

        const currentCategory = this.checkedFiltersMap.get(category);

        if (!currentCategory) {
            return;
        }

        if (currentCategory && currentCategory.has(value)) {
            currentCategory.delete(value);

            const categoryItem = document.getElementById(String(value)) as HTMLInputElement;

            categoryItem.checked = false;
        } else if (currentCategory && !currentCategory.has(value)) {
            currentCategory.add(value);
        }

        if (currentCategory && !currentCategory.size) {
            this.checkedFiltersMap.delete(category);
        }

        this.filterService.setCategoriesToUrl(this.checkedFiltersMap);
        this.checkedFiltersMapKeys = Array.from(this.checkedFiltersMap.keys());
        this.onCategoriesUpdate.emit(this.checkedFiltersMap);
    }

    public getDisplayCategoryName(category: keyof IWatch): string | undefined {
        for (const obj of this.filters) {
            if (obj.name === category) {
                return obj.displayName;
            }
        }
    }


    private updateFiltersMap(watches: Array<IWatch>): void {

        for (const filter of this.filters) {

            const setPropsByFilter = new Set();

            for (const watch of watches) {

                if (watch.hasOwnProperty(filter.name)) {
                    setPropsByFilter.add(watch[filter.name]);
                }
            }
            this.filtersMap.set(filter.name, setPropsByFilter);
        }

        this.filtersMapKeys = Array.from(this.filtersMap.keys());
    }

    private getQueryParams(): void {

        this.route.queryParams
            .pipe(
                takeUntil(timer(50))
            )
            .subscribe(
            (queryParam: Params) => {

                if (queryParam['price']) {
                    this.price = JSON.parse(queryParam['price']);
                    this.onPriceUpdate.emit(this.price);
                }

                if (queryParam['categories']) {
                    const categoriesObject = JSON.parse(queryParam['categories']);
                    const categoriesMap = new Map<keyof IWatch, Set<string | number>>();

                    Object.keys(categoriesObject).forEach((key: string) => {
                        categoriesObject[key] = new Set<string | number>(JSON.parse(categoriesObject[key]));
                        categoriesMap.set(<keyof IWatch> key, categoriesObject[key]);
                    });

                    this.checkedFiltersMap = categoriesMap;
                    this.checkedFiltersMapKeys = Array.from(this.checkedFiltersMap.keys());
                }

                this.onCategoriesUpdate.emit(this.checkedFiltersMap);
            }
        );

    }

    private setInitialFilters(): void {

        if (this.checkedFiltersMap) {
            this.checkedFiltersMap.forEach(
                        (
                            value: Set<string | number>, key: keyof IWatch) => {

                            this.filters.filter((el: IFilter) => el.name === key)[0].showFilter = true;

                            value.forEach((catItem) => {
                                const categoryItem = document.getElementById(String(catItem)) as HTMLInputElement;
                                categoryItem.checked = true;
                            });
                        });
        }
    }
}
