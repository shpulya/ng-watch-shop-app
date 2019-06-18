import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ItemsListComponent } from '../../../../shared/components/items-list/items-list.component';
import { IPrice, IWatch, IFilter } from '../../../../app.models';
import { WatchesService } from '../../services/watches.service';

type TFilterMap = Map<string, Set<string | number>>;

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

    public config: Array<IFilter> = [
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

    private destroy$: Subject<void> = new Subject();

    constructor(
        private itemsService: WatchesService,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.route.data
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                if (data.items) {
                    this.watches = data.items;
                    this.filteredItems = [...this.watches];
                }
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onCategoriesFilter(filtersMap: TFilterMap): void {
        this.categoriesFilter = filtersMap;
        this.filteredItems = [...this.watches];
        this.categoriesFilter.forEach((values: Set<string | number>, category: string) => {
            this.filteredItems = this.filteredItems.filter((watch: IWatch) => values.has(watch[<keyof IWatch>category]));
        });
        this.itemsListRef.selectPage(1, this.filteredItems);
    }

    public onPriceFilter(priceFilter: IPrice): void {
        this.priceFilter = priceFilter;
        this.filteredItems = [...this.watches];
        this.filteredItems = this.filteredItems.filter((watch: IWatch) =>
            (watch.price >= (this.priceFilter.from || 0) && watch.price <= (this.priceFilter.to || 99999))
        );
        this.itemsListRef.selectPage(1, this.filteredItems);
    }
}
