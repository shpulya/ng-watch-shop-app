import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatch } from '../../app.models';

type TFilterMap = Map<keyof IWatch, Set<string | number>>;

interface IFilter {
    name: keyof IWatch;
    showFilter: boolean;
}

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

    public filtersMap: TFilterMap = new Map<keyof IWatch, Set<string | number>>();

    public checkedFiltersMap: TFilterMap = new Map<keyof IWatch, Set<string | number>>();

    private filters: Array<IFilter> = [
        {name: 'manufacturer', showFilter: false},
        {name: 'screenSize', showFilter: false},
        {name: 'screenType', showFilter: false},
        {name: 'os', showFilter: false},
        {name: 'ramSize', showFilter: false},
        {name: 'romSize', showFilter: false}];

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

            return;
        }

        const currentCategory = this.checkedFiltersMap.get(category);

        if (!currentCategory) {
            return;
        }

        if (currentCategory && currentCategory.has(value)) {
            currentCategory.delete(value);
        } else if (currentCategory && !currentCategory.has(value)) {
            currentCategory.add(value);
        }

        if (currentCategory && !currentCategory.size) {
            this.checkedFiltersMap.delete(category);
        }

        this.filtersEmit$.emit(this.checkedFiltersMap);
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
