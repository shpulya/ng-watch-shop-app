import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatch, IFilter } from '../../app.models';

type TFilterMap = Map<keyof IWatch, Set<string | number>>;



@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    @Output()
    public filtersEmit$: EventEmitter<TFilterMap> = new EventEmitter<TFilterMap>();

    @Output()
    public priceEmit$: EventEmitter<IPrice> = new EventEmitter<IPrice>();

    public showPriceFilter: boolean = false;

    public filtersMapKeys!: Array<keyof IWatch>;

    public checkedFiltersMapKeys!: Array<keyof IWatch>;

    public filtersMap: TFilterMap = new Map<keyof IWatch, Set<string | number>>();

    public checkedFiltersMap: TFilterMap = new Map<keyof IWatch, Set<string | number>>();

    private filters: Array<IFilter> = [
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


    constructor(private watchesService: WatchesService) {
    }

    public ngOnInit(): void {
        this.watchesService.watches$.subscribe((watches: Array<IWatch>) => {
            this.getFiltersMap(watches);
        });
    }

    public setPrice(priceKey: keyof IPrice, value: number): void {
        this.price[priceKey] = value;
        this.priceEmit$.emit(this.price);
    }

    public onFilterChecked(category: keyof IWatch, value: string | number): void {

        if (!this.checkedFiltersMap.has(category)) {
            const filtersSet: Set<string | number> = new Set();

            filtersSet.add(value);
            this.checkedFiltersMap.set(category, filtersSet);
            this.filtersEmit$.emit(this.checkedFiltersMap);
            this.checkedFiltersMapKeys = Array.from(this.checkedFiltersMap.keys());

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

        this.checkedFiltersMapKeys = Array.from(this.checkedFiltersMap.keys());
        this.filtersEmit$.emit(this.checkedFiltersMap);
    }

    public getDisplayCategoryName(category: keyof IWatch): string | undefined {
        for (const obj of this.filters) {
            if (obj.name === category) {
                return obj.displayName;
            }
        }
    }


    private getFiltersMap(watches: Array<IWatch>): void {

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
}
