import { AfterViewInit, Component, ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatchDetails, IWatchFilter } from '../../app.models';
import { FiltersService } from '../../services/filters.service';

type TFilterMap = Map<keyof IWatchDetails, Set<string | number>>;

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    public showFilterCategories: boolean = true;

    @Output()
    public categoriesUpdateEvent: EventEmitter<TFilterMap> = new EventEmitter<TFilterMap>();

    @Output()
    public priceUpdateEvent: EventEmitter<IPrice> = new EventEmitter<IPrice>();

    public showPriceFilter: boolean = true;

    public filtersCategories!: Array<keyof IWatchDetails>;

    public checkedFiltersCategories!: Array<keyof IWatchDetails>;

    public filters: TFilterMap = new Map();

    public checkedFilters: TFilterMap = new Map();

    public filtersConfig: Array<IWatchFilter> = [
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

    private destroy$: Subject<void> = new Subject();

    constructor(
        private watchesService: WatchesService,
        private router: Router,
        private route: ActivatedRoute,
        private filterService: FiltersService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        if (this.showFilterCategories) {
            this.updateFiltersMap(this.route.snapshot.data.watches);
        }
        if (this.route.snapshot.queryParams['price']) {
            this.price = JSON.parse(this.route.snapshot.queryParams['price']);
            this.priceUpdateEvent.emit(this.price);
        }

        if (this.route.snapshot.queryParams['categories']) {
            const categoriesObject = JSON.parse(this.route.snapshot.queryParams['categories']);
            const categoriesMap = new Map<keyof IWatchDetails, Set<string | number>>();

            Object.keys(categoriesObject).forEach((key: string) => {
                categoriesObject[key] = new Set<string | number>(JSON.parse(categoriesObject[key]));
                categoriesMap.set(<keyof IWatchDetails> key, categoriesObject[key]);
            });

            this.checkedFilters = categoriesMap;
            this.checkedFiltersCategories = Array.from(this.checkedFilters.keys());
            this.categoriesUpdateEvent.emit(this.checkedFilters);
        }
    }

    public ngAfterViewInit(): void {
        this.setInitialFilters();
        this.changeDetectorRef.detectChanges();
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public setPrice(priceKey: keyof IPrice, value: number): void {
        this.price[priceKey] = value;
        this.filterService.setPriceToUrl(JSON.stringify(this.price));
        this.priceUpdateEvent.emit(this.price);
    }

    public onFilterChecked(category: keyof IWatchDetails, value: string | number): void {
        if (!this.checkedFilters.has(category)) {
            const filtersSet: Set<string | number> = new Set();

            filtersSet.add(value);

            this.checkedFilters.set(category, filtersSet);
            this.categoriesUpdateEvent.emit(this.checkedFilters);
            this.checkedFiltersCategories = Array.from(this.checkedFilters.keys());
            this.filterService.setCategoriesToUrl(this.checkedFilters);

            return;
        }

        const currentCategory = this.checkedFilters.get(category);

        if (!currentCategory) {
            return;
        }

        if (currentCategory && currentCategory.has(value)) {
            currentCategory.delete(value);
        } else if (currentCategory && !currentCategory.has(value)) {
            currentCategory.add(value);
        }

        if (currentCategory && !currentCategory.size) {
            this.checkedFilters.delete(category);
        }

        this.filterService.setCategoriesToUrl(this.checkedFilters);
        this.checkedFiltersCategories = Array.from(this.checkedFilters.keys());
        this.categoriesUpdateEvent.emit(this.checkedFilters);
    }

    public getFilterStatus(category: keyof IWatchDetails, value: string | number): boolean {
        const currentCategory = this.checkedFilters.get(category);

        if (!currentCategory) {
            return false;
        }

        if (currentCategory && currentCategory.has(value)) {
            return true;
        } else {
            return false;
        }
    }

    public getDisplayCategoryName(category: keyof IWatchDetails): string | undefined {
        for (const obj of this.filtersConfig) {
            if (obj.name === category) {
                return obj.displayName;
            }
        }
    }


    private updateFiltersMap(watches: Array<IWatchDetails>): void {
        for (const filter of this.filtersConfig) {

            const setPropsByFilter = new Set();

            for (const watch of watches) {
                if (watch.hasOwnProperty(filter.name)) {
                    setPropsByFilter.add(watch[filter.name]);
                }
            }
            this.filters.set(filter.name, setPropsByFilter);
        }

        this.filtersCategories = Array.from(this.filters.keys());
    }

    private setInitialFilters(): void {
        if (!this.checkedFilters) {
            return;
        }

        this.checkedFilters.forEach((value: Set<string | number>, key: keyof IWatchDetails) => {
            this.filtersConfig.filter((el: IWatchFilter) => el.name === key)[0].showFilter = true;
        });
    }
}
