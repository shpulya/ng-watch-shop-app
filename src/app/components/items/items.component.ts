import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ItemsService } from '../../services/items.service';
import { IPrice, IItem, IItemDetail } from '../../app.models';


type TFilterMap = Map<keyof IItemDetail, Set<string | number>>;

@Component({
    selector: 'app-watches',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    public viewMode: string = 'grid';

    public watches: Array<IItem> = [];

    public filteredItems: Array<IItem> = [];

    public pagedItems: Array<IItem> = [];

    public orderBy: string = 'asc';

    public countOnGrid: number = 4;

    public countOnLine: number = 5;

    public currentPage: number = 1;

    public itemsCount: number = 0;

    public categoriesFilter: TFilterMap = new Map<keyof IItemDetail, Set<string | number>>();

    public priceFilter!: IPrice;

    public queryParams!: Params;

    private screenWidth!: number;

    constructor(
        private itemsService: ItemsService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.getQueryParams();
        this.getItems();
        this.calculateItemsOnGrid();
        this.outputItems(this.currentPage);
    }

    public getItems(): void {
        this.itemsService.getItems().subscribe((items: Array<IItem>) => {
            this.watches = items;
            this.filteredItems = this.watches;
            this.orderWatches();
            this.itemsCount = this.watches.length;
            this.outputItems(1);
        },
            () => {
                console.error('Couldn\'t download items');
            });
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
        this.outputItems(1);
    }

    public receivePriceFilter(priceFilter: IPrice): void {
        this.priceFilter = priceFilter;
        this.filterWatchesByCategory();
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        }, () => {
            console.error('Can\'t get \'Price\' query params');
        });
    }

    public receiveCategoriesFilter(filtersMap$: TFilterMap): void {
        this.categoriesFilter = filtersMap$;
        this.filterWatchesByCategory();
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        }, () => {
            console.error('Can\'t get \'Categories\' query params');
        });
    }

    public filterWatchesByCategory(): void {
        this.filteredItems = this.watches;

        if (this.categoriesFilter) {
            this.categoriesFilter.forEach(
                (
                    values: Set<string | number>,
                    category: keyof IItemDetail) => {
                    this.filteredItems = this.filteredItems.filter((watch: IItem) =>
                        values.has(watch[category]));
                }
            );
        }

        if (this.priceFilter) {
            this.filteredItems = this.filteredItems.filter((watch: IItem) =>
                watch.price >= this.priceFilter.from && watch.price <= this.priceFilter.to
            );
        }

        this.itemsCount = this.filteredItems.length;
        this.outputItems(1);
    }

    public orderWatches(): void {
        this.router.navigate(
            ['.'],
            {
                queryParams: {sort: this.orderBy},
                queryParamsHandling: 'merge'
            });

        this.filteredItems = (this.orderBy === 'asc')
            ? this.filteredItems.sort((a: IItem, b: IItem) => a.price - b.price)
            : this.filteredItems.sort((a: IItem, b: IItem) => b.price - a.price);
        this.outputItems(1);
    }

    public outputItems(currentPage: number): void {
        const countOnPage = this.viewMode === 'grid' ? this.countOnGrid : this.countOnLine;

        this.currentPage = currentPage;
        this.pagedItems = this.filteredItems.filter((watch: IItem, i: number) => {
            return ((i >= (currentPage - 1) * countOnPage) && (i < currentPage * countOnPage));
        }
        );
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
                }, () => {
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

        this.outputItems(1);
    }

}
