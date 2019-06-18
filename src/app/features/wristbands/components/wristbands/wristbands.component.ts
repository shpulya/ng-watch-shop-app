import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ItemsListComponent } from '../../../../shared/components/items-list/items-list.component';
import { IFilter, IPrice, IWristband } from '../../../../app.models';
import { WristbandsService } from '../../services/wristbands.service';

type TFilterMap = Map<string, Set<string | number>>;

@Component({
    selector: 'app-watches',
    templateUrl: './wristbands.component.html',
    styleUrls: ['./wristbands.component.scss']
})
export class WristbandsComponent implements OnInit, OnDestroy {

    @ViewChild(ItemsListComponent)
    public readonly itemsListRef!: ItemsListComponent;

    public wristbands: Array<IWristband> = [];

    public filteredItems: Array<IWristband> = [];

    public categoriesFilter: TFilterMap = new Map();

    public priceFilter!: IPrice;

    public config: Array<IFilter> = [
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

    private destroy$: Subject<void> = new Subject();

    constructor(
        private itemsService: WristbandsService,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.route.data
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                if (data.items) {
                    this.wristbands = data.items;
                    this.filteredItems = [...this.wristbands];
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
        this.filteredItems = [...this.wristbands];
        this.categoriesFilter.forEach((values: Set<string | number>, category: string) => {
            this.filteredItems = this.filteredItems.filter((wristband: IWristband) => values.has(wristband[<keyof IWristband>category]));
        });
        this.itemsListRef.selectPage(1, this.filteredItems);
    }

    public onPriceFilter(priceFilter: IPrice): void {
        this.priceFilter = priceFilter;
        this.filteredItems = [...this.wristbands];
        this.filteredItems = this.filteredItems.filter((wristband: IWristband) =>
            (wristband.price >= (this.priceFilter.from || 0) && wristband.price <= (this.priceFilter.to || 99999))
        );
        this.itemsListRef.selectPage(1, this.filteredItems);
    }
}
