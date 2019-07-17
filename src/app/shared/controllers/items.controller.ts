import { Injectable, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IItem } from '../../app.models';
import { WatchesService } from '../../features/watches/services/watches.service';
import { ItemsFactoryService } from '../../core/services/items-factory.service';
import { IPrice } from '../components/sidenav/sidenav.models';
import { ItemsListComponent } from '../components/items-list/items-list.component';

type TFilterMap = Map<string, Set<string | number>>;

@Injectable()
export class ItemsController<ItemT extends IItem> implements OnInit, OnDestroy {

    @ViewChild(ItemsListComponent)
    public readonly itemsListRef!: ItemsListComponent;

    public items: Array<ItemT> = [];

    public filteredItems: Array<ItemT> = [];

    private destroy$: Subject<void> = new Subject();

    constructor(
        private itemsService: WatchesService,
        private itemsFactoryService: ItemsFactoryService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.route.data
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                if (data.items) {
                    this.items = data.items;
                    this.filteredItems = [...this.items];
                }
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onCategoriesFilter(categoriesFilter: TFilterMap): void {
        this.filteredItems = [...this.items];
        categoriesFilter.forEach((values: Set<any>, category: string) => {
            this.filteredItems = this.filteredItems.filter((item: ItemT) => values.has(item[<keyof ItemT>category]));
        });
        this.itemsListRef.selectPage(1, this.filteredItems);
    }

    public onPriceFilter(priceFilter: IPrice): void {
        this.filteredItems = [...this.items];
        this.filteredItems = this.filteredItems.filter((item: ItemT) =>
            (item.price >= (priceFilter.from || 0) && item.price <= (priceFilter.to || 99999))
        );
        this.itemsListRef.selectPage(1, this.filteredItems);
    }
}
