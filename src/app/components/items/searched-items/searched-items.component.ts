import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { WatchesService } from '../../../services/watches.service';
import { IPrice, IWatch } from '../../../app.models';
import { ItemsListComponent } from '../items-list/items-list.component';

@Component({
    selector: 'app-searched-items',
    templateUrl: './searched-items.component.html',
    styleUrls: ['./searched-items.component.scss']
})
export class SearchedItemsComponent implements OnInit, OnDestroy {

    @ViewChild(ItemsListComponent)
    public readonly itemsListRef!: ItemsListComponent;

    public searchedText: string = '';

    public destroy$: Subject<void> = new Subject();

    public watches: Array<IWatch> = [];

    public filteredItems: Array<IWatch> = [];

    public overlay: boolean = false;

    public priceFilter!: IPrice;

    constructor(
        private watchesService: WatchesService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (this.searchedText !== params.searchedText) {
                this.searchedText = params.searchedText;
                this.watchesService.getSearchedItemsByName(this.searchedText)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((searchedWatches: Array<IWatch>) => {
                        this.watches = searchedWatches;
                        this.filteredItems = [...this.watches];
                        this.itemsListRef.selectPage(1, this.filteredItems);
                    })
                ;
            }
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
