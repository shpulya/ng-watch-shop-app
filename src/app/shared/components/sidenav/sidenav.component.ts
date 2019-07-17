import { AfterViewInit, Component, ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { SidenavService } from './sidenav.service';
import { IFilter, IPrice } from './sidenav.models';

type TFilterMap = Map<string, Set<string | number>>;

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

    @Input()
    public readonly showFilterCategories: boolean = true;

    @Input()
    public readonly config!: Array<IFilter>;

    @Output('oncategoriesupdate')
    public readonly categoriesUpdateEvent: EventEmitter<TFilterMap> = new EventEmitter<TFilterMap>();

    @Output('onpriceupdate')
    public readonly priceUpdateEvent: EventEmitter<IPrice> = new EventEmitter<IPrice>();

    public showPriceFilter: boolean = true;

    public filtersCategories!: Array<string>;

    public filtersCategoriesChecked!: Array<string>;

    public filters: TFilterMap = new Map();

    public filtersChecked
        : TFilterMap = new Map();

    private price: IPrice = {from: 0, to: 999999};

    private destroy$: Subject<void> = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private sidenavService: SidenavService
    ) {}

    public ngOnInit(): void {
        if (this.showFilterCategories) {
            this.updateFiltersMap(this.route.snapshot.data.items);
        }
        if (this.route.snapshot.queryParams['price']) {
            this.price = JSON.parse(this.route.snapshot.queryParams['price']);
            this.priceUpdateEvent.emit(this.price);
        }

        if (this.route.snapshot.queryParams['categories']) {
            const categoriesObject = JSON.parse(this.route.snapshot.queryParams['categories']);
            const categoriesMap = new Map<string, Set<string | number>>();

            Object.keys(categoriesObject).forEach((key: string) => {
                categoriesObject[key] = new Set<string | number>(JSON.parse(categoriesObject[key]));
                categoriesMap.set(<string> key, categoriesObject[key]);
            });

            this.filtersChecked = categoriesMap;
            this.filtersCategoriesChecked = Array.from(this.filtersChecked.keys());
            this.categoriesUpdateEvent.emit(this.filtersChecked);
        }

        this.filtersChecked.forEach((value: Set<string | number>, key: string) => {
            const configFiltered = this.config.filter((el: IFilter) => el.name === key)[0];

            if (configFiltered) {
                configFiltered.showFilter = true;
            }
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public setPrice(priceKey: keyof IPrice, value: number): void {
        this.price[priceKey] = value;
        this.sidenavService.setPriceToUrl(JSON.stringify(this.price));
        this.priceUpdateEvent.emit(this.price);
    }

    public onFilterChecked(category: string, value: string | number): void {
        if (!this.filtersChecked.has(category)) {
            const filtersSet: Set<string | number> = new Set();

            filtersSet.add(value);

            this.filtersChecked.set(category, filtersSet);
            this.categoriesUpdateEvent.emit(this.filtersChecked);
            this.filtersCategoriesChecked = Array.from(this.filtersChecked.keys());
            this.sidenavService.setCategoriesToUrl(this.filtersChecked);

            return;
        }

        const currentCategory = this.filtersChecked.get(category);

        if (!currentCategory) {
            return;
        }

        if (currentCategory && currentCategory.has(value)) {
            currentCategory.delete(value);
        } else if (currentCategory && !currentCategory.has(value)) {
            currentCategory.add(value);
        }

        if (currentCategory && !currentCategory.size) {
            this.filtersChecked.delete(category);
        }

        this.sidenavService.setCategoriesToUrl(this.filtersChecked);
        this.filtersCategoriesChecked = Array.from(this.filtersChecked.keys());
        this.categoriesUpdateEvent.emit(this.filtersChecked);
    }

    public getFilterStatus(category: string, value: string | number): boolean {
        const currentCategory = this.filtersChecked.get(category);

        if (!currentCategory) {
            return false;
        }

        if (currentCategory && currentCategory.has(value)) {
            return true;
        } else {
            return false;
        }
    }

    public getDisplayCategoryName(category: string): string | undefined {
        for (const obj of this.config) {
            if (obj.name === category) {
                return obj.displayName;
            }
        }
    }

    private updateFiltersMap(items: Array<any>): void {
        for (const filter of this.config) {
            const setPropsByFilter = new Set();

            for (const item of items) {
                if (item.hasOwnProperty(filter.name)) {
                    setPropsByFilter.add(item[filter.name]);
                }
            }

            this.filters.set(filter.name, setPropsByFilter);
        }

        this.filtersCategories = Array.from(this.filters.keys());
    }
}
