import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Event, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatch, IWatchDetails } from '../../app.models';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

type TFilterMap = Map<keyof IWatchDetails, Set<string | number>>;

@Component({
    selector: 'app-watches',
    templateUrl: './watches.component.html',
    styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit, OnDestroy {

    public viewMode: string = 'grid';

    public watches: Array<IWatch> = [];

    public filteredItems: Array<IWatch> = [];

    public pagedItems: Array<IWatch> = [];

    public orderBy: string = 'asc';

    public countOnGrid: number = 4;

    public countOnLine: number = 5;

    public currentPage: number = 1;

    public itemsCount: number = 0;

    public categoriesFilter: TFilterMap = new Map();

    public priceFilter!: IPrice;

    public queryParams!: Params;

    private screenWidth!: number;

    private resize$: Subject<void> = new Subject();

    private destroy$: Subject<void> = new Subject();

    constructor(
        private itemsService: WatchesService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

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

                if (this.route.snapshot.data.watches) {
                    this.watches = this.route.snapshot.data.watches;
                    this.filteredItems = [...this.watches];
                    this.orderItems('asc');
                    this.itemsCount = this.watches.length;
                    this.selectPage(1);
                }
            })
        ;

        this.calculateItemsOnGrid();

        if (this.route.snapshot.data.watches instanceof HttpErrorResponse) {
            console.error('Couldn\'t load data', this.route.snapshot.data);
        }

        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (queryParam: Params) => {
                    if (queryParam['view']) {
                        this.viewMode = queryParam['view'];
                    }
                    if (queryParam['sort']) {
                        this.orderBy = queryParam['sort'];
                    }
                },
                () => {
                    console.error('Can\'t get query Params');
                })
        ;

        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (queryParams: Params) => {
                    this.queryParams = queryParams;
                },
                () => {
                    console.error('Can\'t get \'Categories\' query params');
                }
            )
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public changeViewMode(view: string): void {
        this.viewMode = view;
        this.router.navigate(
            ['.'],
            {
                queryParams: {view: view},
                queryParamsHandling: 'merge'
            }
        );
        this.calculateItemsOnGrid();
        this.selectPage(1);
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

        this.itemsCount = this.filteredItems.length;
        this.selectPage(1);
    }

    public orderItems(orderBy: string): void {
        this.orderBy = orderBy;
        this.router.navigate(
            ['.'],
            {
                queryParams: {sort: this.orderBy},
                queryParamsHandling: 'merge'
            }
        );

        this.watches = (this.orderBy === 'asc')
            ? this.watches.sort((a: IWatch, b: IWatch) => a.price - b.price)
            : this.watches.sort((a: IWatch, b: IWatch) => b.price - a.price);
        this.selectPage(1);
    }

    public selectPage(currentPage: number): void {
        const countOnPage = this.viewMode === 'grid' ? this.countOnGrid : this.countOnLine;

        this.currentPage = currentPage;
        this.pagedItems = this.filteredItems.filter((watch: IWatch, i: number) => {
            return ((i >= (currentPage - 1) * countOnPage) && (i < currentPage * countOnPage));
        });
    }

    public search(): void {

    }

    @HostListener('window:resize', ['$event'])
    private calculateItemsOnGrid(event?: Event): void {
        this.resize$.next();
    }
}
