import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ItemsListComponent } from '../items-list/items-list.component';
import { IPrice, IWatch, IWatchDetails } from '../../app.models';
import { WatchesService } from '../../services/watches.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

type TFilterMap = Map<keyof IWatchDetails, Set<string | number>>;

@Component({
    selector: 'app-watches',
    templateUrl: './watches.component.html',
    styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit, OnDestroy {

    @ViewChild(ItemsListComponent)
    public readonly itemsListRef!: ItemsListComponent;

    public watches: Array<IWatch> = [];

    public filteredItems: Array<IWatch> = [];

    public categoriesFilter: TFilterMap = new Map();

    public priceFilter!: IPrice;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private itemsService: WatchesService,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.route.data
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                if (data.watches) {
                    this.watches = data.watches;
                    this.filteredItems = [...this.watches];
                }
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onPriceFilter(priceFilter: IPrice): void {
        this.priceFilter = priceFilter;
        this.filterWatchesByCategory();
    }

    public onCategoriesFilter(filtersMap: TFilterMap): void {
        this.categoriesFilter = filtersMap;
        this.filterWatchesByCategory();
    }

    public filterWatchesByCategory(): void {
        this.filteredItems = [...this.watches];

        if (this.categoriesFilter) {
            this.categoriesFilter.forEach((values: Set<string | number>, category: keyof IWatchDetails) => {
                this.filteredItems = this.filteredItems.filter((watch: IWatch) => values.has(watch[category]));
            });
        }

        if (this.priceFilter) {
            this.filteredItems = this.filteredItems.filter((watch: IWatch) =>
                (watch.price >= this.priceFilter.from && watch.price <= this.priceFilter.to)
            );
        }

        this.itemsListRef.selectPage(1);
    }
}
