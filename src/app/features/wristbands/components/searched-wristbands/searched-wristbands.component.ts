import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { WristbandsService } from '../../services/wristbands.service';
import { IPrice, IWristband } from '../../../../app.models';
import { ItemsListComponent } from '../../../../shared/components/items-list/items-list.component';

@Component({
    selector: 'app-searched-items',
    templateUrl: './searched-wristbands.component.html',
    styleUrls: ['./searched-wristbands.component.scss']
})
export class SearchedWristbandsComponent implements OnInit, OnDestroy {

    @ViewChild(ItemsListComponent)
    public readonly itemsListRef!: ItemsListComponent;

    public searchedText: string = '';

    public destroy$: Subject<void> = new Subject();

    public watches: Array<IWristband> = [];

    public filteredItems: Array<IWristband> = [];

    public overlay: boolean = false;

    public priceFilter!: IPrice;

    constructor(
        private wristbandsService: WristbandsService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (this.searchedText !== params.searchedText) {
                this.searchedText = params.searchedText;
                this.wristbandsService.getSearchedItemsByName(this.searchedText)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((searchedWatches: Array<IWristband>) => {
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
        this.filteredItems = this.filteredItems.filter((watch: IWristband) =>
            (watch.price >= (this.priceFilter.from || 0) && watch.price <= (this.priceFilter.to || 99999))
        );
        this.itemsListRef.selectPage(1, this.filteredItems);
    }
}
