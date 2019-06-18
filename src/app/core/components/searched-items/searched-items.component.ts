import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IItem, IPrice } from '../../../app.models';
import { ItemsListComponent } from '../../../shared/components/items-list/items-list.component';
import { ITEMS_SERVICES } from '../../services/items-factory.service';
import { ItemsService } from '../../services/items.service';

@Component({
    selector: 'app-searched-watches',
    templateUrl: './searched-items.component.html',
    styleUrls: ['./searched-items.component.scss']
})
export class SearchedItemsComponent implements OnInit, OnDestroy {

    @ViewChild(ItemsListComponent)
    public readonly itemsListRef!: ItemsListComponent;

    public searchedText: string = '';

    public destroy$: Subject<void> = new Subject();

    public items: Array<IItem> = [];

    public filteredItems: Array<IItem> = [];

    public overlay: boolean = false;

    public priceFilter!: IPrice;

    private services: Array<ItemsService> = [];

    constructor(
        @Inject(ITEMS_SERVICES) services: Array<ItemsService>,
        private route: ActivatedRoute
    ) {
        for (const service of services) {
            this.services.push(service);
        }
    }

    public ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (this.searchedText !== params.searchedText) {
                this.searchedText = params.searchedText;
                this.items = [];

                for (const service of this.services) {
                    service.findItemsByName(this.searchedText)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe((searchedItem: Array<IItem>) => {
                            this.items = this.items.concat(searchedItem);
                            this.filteredItems = [...this.items];
                            this.itemsListRef.selectPage(1, this.filteredItems);
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
        this.priceFilter = priceFilter;
        this.filteredItems = [...this.items];
        this.filteredItems = this.filteredItems.filter((item: IItem) =>
            (item.price >= (this.priceFilter.from || 0) && item.price <= (this.priceFilter.to || 99999))
        );
        this.itemsListRef.selectPage(1, this.filteredItems);
    }
}
