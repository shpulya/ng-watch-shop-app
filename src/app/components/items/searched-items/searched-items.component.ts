import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { WatchesService } from '../../../services/watches.service';
import { IPrice, IWatch } from '../../../app.models';
import { ActivatedRoute, Event, Params } from '@angular/router';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-searched-items',
    templateUrl: './searched-items.component.html',
    styleUrls: ['./searched-items.component.scss']
})
export class SearchedItemsComponent implements OnInit, OnDestroy {

    public searchedText: string = '';

    public destroy$: Subject<void> = new Subject();

    public viewMode: string = 'grid';

    public countOnGrid: number = 4;

    public countOnLine: number = 5;

    public currentPage: number = 1;

    public queryParams!: Params;

    public pagedItems: Array<IWatch> = [];

    public watches: Array<IWatch> = [];

    public filteredItems: Array<IWatch> = [];

    public overlay: boolean = false;

    public priceFilter!: IPrice;

    public orderBy: string = 'asc';

    private resize$: Subject<void> = new Subject();

    private screenWidth!: number;

    constructor(
        private watchesService: WatchesService,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.resize$
            .pipe(
                debounceTime(100),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.screenWidth = window.innerWidth;

                if (this.screenWidth > 1730) {
                    this.countOnGrid = 10;
                }

                if (this.screenWidth > 1480 && this.screenWidth <= 1730) {
                    this.countOnGrid = 8;
                }

                if (this.screenWidth > 1230 && this.screenWidth <= 1480) {
                    this.countOnGrid = 6;
                }

                this.selectPage(this.currentPage);
            })
        ;

        this.calculateItemsOnGrid();

        this.route.queryParams.subscribe(params => {
            if (this.searchedText !== params.searchedText) {
                this.searchedText = params.searchedText;
                this.watchesService.getSearchedItemsByName(this.searchedText)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((searchedWatches: Array<IWatch>) => {
                        this.watches = searchedWatches;
                        this.filteredItems = [...this.watches];
                        this.selectPage(1);
                    })
                ;
            }
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public displayView(view: string): void {
        this.viewMode = view;
    }

    public selectPage(currentPage: number): void {
        const countOnPage = this.viewMode === 'grid' ? this.countOnGrid : this.countOnLine;
        this.currentPage = currentPage;
        this.pagedItems = this.filteredItems.filter((watch: IWatch, i: number) => {
            return ((i >= (currentPage - 1) * countOnPage) && (i < currentPage * countOnPage));
        });
        console.log('selectPage', this.pagedItems);
    }

    public onPriceFilter(priceFilter: IPrice): void {
        this.priceFilter = priceFilter;
        this.filteredItems = [...this.watches];
        this.filteredItems = this.filteredItems.filter((watch: IWatch) =>
            (watch.price >= (this.priceFilter.from || 0) && watch.price <= (this.priceFilter.to || 99999))
        );
        this.selectPage(1);
    }

    public orderItems(orderBy: string): void {
        this.orderBy = orderBy;
        this.filteredItems = (this.orderBy === 'asc')
            ? this.filteredItems.sort((a: IWatch, b: IWatch) => a.price - b.price)
            : this.filteredItems.sort((a: IWatch, b: IWatch) => b.price - a.price);
        this.selectPage(1);
    }

    public showOverlay(show: boolean): void {
        this.overlay = show;
    }

    @HostListener('window:resize', ['$event'])
    private calculateItemsOnGrid(event?: Event): void {
        this.resize$.next();
    }
}
