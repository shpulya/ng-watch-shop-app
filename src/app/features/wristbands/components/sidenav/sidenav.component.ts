import { AfterViewInit, Component, ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { WristbandsService } from '../../services/wristbands.service';
import { IPrice, IWristbandDetails, IWristbandFilter } from '../../../../app.models';
import { FiltersService } from '../../services/filters.service';

type TFilterMap = Map<keyof IWristbandDetails, Set<string | number>>;

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

    public filtersCategories!: Array<keyof IWristbandDetails>;

    public checkedFiltersCategories!: Array<keyof IWristbandDetails>;

    public filters: TFilterMap = new Map();

    public checkedFilters: TFilterMap = new Map();

    public filtersConfig: Array<IWristbandFilter> = [
        {
            name: 'fitFor',
            displayName: 'Fit For',
            showFilter: false
        }, {
            name: 'material',
            displayName: 'Material',
            showFilter: false
        }, {
            name: 'width',
            displayName: 'Width',
            showFilter: false
        }, {
            name: 'length',
            displayName: 'Length',
            showFilter: false
        }, {
            name: 'color',
            displayName: 'Color',
            showFilter: false
        }];

    private price: IPrice = {from: 0, to: 999999};

    private destroy$: Subject<void> = new Subject();

    constructor(
        private wristbandsService: WristbandsService,
        private router: Router,
        private route: ActivatedRoute,
        private filterService: FiltersService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        if (this.showFilterCategories) {
            this.updateFiltersMap(this.route.snapshot.data.wristbands);
        }
        if (this.route.snapshot.queryParams['price']) {
            this.price = JSON.parse(this.route.snapshot.queryParams['price']);
            this.priceUpdateEvent.emit(this.price);
        }

        if (this.route.snapshot.queryParams['categories']) {
            const categoriesObject = JSON.parse(this.route.snapshot.queryParams['categories']);
            const categoriesMap = new Map<keyof IWristbandDetails, Set<string | number>>();

            Object.keys(categoriesObject).forEach((key: string) => {
                categoriesObject[key] = new Set<string | number>(JSON.parse(categoriesObject[key]));
                categoriesMap.set(<keyof IWristbandDetails> key, categoriesObject[key]);
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

    public onFilterChecked(category: keyof IWristbandDetails, value: string | number): void {
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

    public getFilterStatus(category: keyof IWristbandDetails, value: string | number): boolean {
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

    public getDisplayCategoryName(category: keyof IWristbandDetails): string | undefined {
        for (const obj of this.filtersConfig) {
            if (obj.name === category) {
                return obj.displayName;
            }
        }
    }


    private updateFiltersMap(wristbands: Array<IWristbandDetails>): void {
        for (const filter of this.filtersConfig) {

            const setPropsByFilter = new Set();

            for (const wristband of wristbands) {
                if (wristband.hasOwnProperty(filter.name)) {
                    setPropsByFilter.add(wristband[filter.name]);
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

        this.checkedFilters.forEach((value: Set<string | number>, key: keyof IWristbandDetails) => {
            this.filtersConfig.filter((el: IWristbandFilter) => el.name === key)[0].showFilter = true;
        });
    }
}
