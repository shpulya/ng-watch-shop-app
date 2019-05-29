import { Component, OnInit, HostListener } from '@angular/core';
import { Event, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatch, IWatchDetails } from '../../app.models';

type TFilterMap = Map<keyof IWatchDetails, Set<string | number>>;

@Component({
    selector: 'app-watches',
    templateUrl: './watches.component.html',
    styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit {

    public viewMode: string = 'grid';

    public watches: Array<IWatch> = [];

    public filteredItems: Array<IWatch> = [];

    public pagedItems: Array<IWatch> = [];

    public orderBy: string = 'asc';

    public countOnGrid: number = 4;

    public countOnLine: number = 5;

    public currentPage: number = 1;

    public itemsCount: number = 0;

    public categoriesFilter: TFilterMap = new Map<keyof IWatchDetails, Set<string | number>>();

    public priceFilter!: IPrice;

    public queryParams!: Params;

    private screenWidth!: number;

    constructor(
        private itemsService: WatchesService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    public ngOnInit(): void {
        if (this.route.snapshot.data.watches instanceof HttpErrorResponse) {
            console.error('Couldn\'t load data', this.route.snapshot.data);
        }
        this.getQueryParams();
        this.getWatches();
        this.calculateItemsOnGrid();
        this.onPage(this.currentPage);
    }

    public getWatches(): void {
        if (this.route.snapshot.data.watches) {
            this.watches = this.route.snapshot.data.watches;
            this.filteredItems = this.watches;
            this.orderItems();
            this.itemsCount = this.watches.length;
            this.onPage(1);
        }
    }

    public changeViewMode(view: string): void {
        this.viewMode = view;

        this.router.navigate(
            ['.'],
            {
                queryParams: {view: view},
                queryParamsHandling: 'merge'
            });

        this.calculateItemsOnGrid();
        this.onPage(1);
    }

    public onPriceFilter(priceFilter: IPrice): void {
        this.priceFilter = priceFilter;
        this.filterWatchesByCategory();
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        }, () => {
            console.error('Can\'t get \'Price\' query params');
        });
    }

    public onCategoriesFilter(filtersMap$: TFilterMap): void {
        this.categoriesFilter = filtersMap$;
        this.filterWatchesByCategory();
        this.route.queryParams.subscribe(
            (queryParams: Params) => {
                this.queryParams = queryParams;
            },
            () => {
                console.error('Can\'t get \'Categories\' query params');
            }
        );
    }

    public filterWatchesByCategory(): void {
        this.filteredItems = this.watches;

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
        this.onPage(1);
    }

    public orderItems(): void {
        this.router.navigate(
            ['.'],
            {
                queryParams: {sort: this.orderBy},
                queryParamsHandling: 'merge'
            }
        );

        this.filteredItems = (this.orderBy === 'asc')
            ? this.filteredItems.sort((a: IWatch, b: IWatch) => a.price - b.price)
            : this.filteredItems.sort((a: IWatch, b: IWatch) => b.price - a.price);
        this.onPage(1);
    }

    public onPage(currentPage: number): void {
        const countOnPage = this.viewMode === 'grid' ? this.countOnGrid : this.countOnLine;

        this.currentPage = currentPage;
        this.pagedItems = this.filteredItems.filter((watch: IWatch, i: number) => {
            return ((i >= (currentPage - 1) * countOnPage) && (i < currentPage * countOnPage));
        });
    }

    private getQueryParams(): void {
        this.route.queryParams
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
                });
    }

    @HostListener('window:resize', ['$event'])
    private calculateItemsOnGrid(event?: Event): void {
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

        this.onPage(1);
    }
}
