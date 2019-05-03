import { Component, OnInit } from '@angular/core';
import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatch } from '../../app.models';

type TFilterMap = Map<keyof IWatch, Set<string | number>>;

@Component({
    selector: 'app-watches',
    templateUrl: './watches.component.html',
    styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit {

    public viewMode: string = 'grid';

    public watches: Array<IWatch> = [];

    public filteredWatches: Array<IWatch> = [];

    public pagedWatches: Array<IWatch> = [];

    public orderBy: string = 'asc';

    public countOnPage: number = 8;

    public currentPage: number = 1;

    public watchesCount: number = 0;

    public categoriesFilter: TFilterMap = new Map<keyof IWatch, Set<string | number>>();

    public priceFilter!: IPrice;

    constructor(private watchesService: WatchesService) {
    }

    public ngOnInit(): void {
        this.getWatches();
        this.outputWatchesOnPage(1);
    }

    public getWatches(): void {
        this.watchesService.getWatches().subscribe((watches: Array<IWatch>) => {
            this.watches = watches;
            this.filteredWatches = this.watches;
            this.watchesCount = this.watches.length;
            this.outputWatchesOnPage(1);
        });
    }

    public changeViewMode(): void {
        this.viewMode = (this.viewMode === 'grid')
            ? 'list'
            : 'grid';
    }

    public receivePriceFilter(price$: IPrice): void {
        this.priceFilter = price$;
        this.filterWatchesByCategory();

    }

    public receiveCategoriesFilter(filtersMap$: TFilterMap): void {
        this.categoriesFilter = filtersMap$;
        this.filterWatchesByCategory();
    }

    public filterWatchesByCategory(): void {
        this.filteredWatches = this.watches;

        if (this.categoriesFilter) {
            this.categoriesFilter.forEach(
                (
                    values: Set<string | number>,
                    category: keyof IWatch) => {
                    this.filteredWatches = this.filteredWatches.filter((watch: IWatch) =>
                        values.has(watch[category]));
                }
            );
        }

        if (this.priceFilter) {
            this.filteredWatches = this.filteredWatches.filter((watch: IWatch) =>
                watch.price >= this.priceFilter.from && watch.price <= this.priceFilter.to
            );

        }

        this.watchesCount = this.filteredWatches.length;

        this.outputWatchesOnPage(1);
    }

    public orderWatches(): void {
        this.filteredWatches = (this.orderBy === 'asc')
            ? this.filteredWatches.sort((a: IWatch, b: IWatch) => a.price - b.price)
            : this.filteredWatches.sort((a: IWatch, b: IWatch) => b.price - a.price);
        this.outputWatchesOnPage(1);
    }

    public outputWatchesOnPage(currentPage$: number): void {
        this.pagedWatches = this.filteredWatches.filter((watch: IWatch, i: number) =>
            ((i >= (currentPage$ - 1) * this.countOnPage) && (i < currentPage$ * this.countOnPage)));
    }


}
