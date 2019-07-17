import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IItem, ItemView } from '../../../app.models';
import { ItemsListComponent } from '../../../shared/components/items-list/items-list.component';
import {ITEMS_SERVICES, ItemsFactoryService} from '../../services/items-factory.service';
import { ItemsService } from '../../services/items.service';
import { IPrice } from '../../../shared/components/sidenav/sidenav.models';

@Component({
    selector: 'app-searched-watches',
    templateUrl: './searched-items.component.html',
    styleUrls: ['./searched-items.component.scss']
})
export class SearchedItemsComponent implements OnInit, OnDestroy {

    @ViewChild(ItemsListComponent)
    public readonly itemsListRef!: ItemsListComponent;

    public searchedText: string = '';

    public items: Array<IItem> = [];

    public itemsFiltered: Array<IItem> = [];

    public overlayShown: boolean = false;

    public priceFilter!: IPrice;

    public grid: ItemView = ItemView.Grid;

    public line: ItemView = ItemView.List;

    public header: string = 'Searched Items';

    private destroy$: Subject<void> = new Subject();

    constructor(
        private itemsFactoryService: ItemsFactoryService,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (this.searchedText !== params.searchedText) {
                this.searchedText = params.searchedText;
                this.items = [];

                for (const service of this.itemsFactoryService.getServices()) {
                    service.findItemsByName(this.searchedText)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe((searchedItem: Array<IItem>) => {
                            this.items = this.items.concat(searchedItem);
                            this.itemsFiltered = [...this.items];
                            this.itemsListRef.selectPage(1, this.itemsFiltered);
                            if (!!params.price) {
                                if (this.priceFilter !== JSON.parse(params.price)) {
                                    this.onPriceFilter(JSON.parse(params.price));
                                }
                            }
                        })
                    ;
                }
            }
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onPriceFilter(priceFilter: IPrice): void {
        console.log(priceFilter);
        this.priceFilter = priceFilter;
        this.itemsFiltered = [...this.items];
        this.itemsFiltered = this.itemsFiltered.filter((item: IItem) =>
            (item.price >= (this.priceFilter.from || 0) && item.price <= (this.priceFilter.to || 99999))
        );
        this.itemsListRef.selectPage(1, this.itemsFiltered);
    }
}
