import { Component, OnInit, HostListener } from '@angular/core';
import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatch } from '../../app.models';
import { ActivatedRoute, Params } from '@angular/router';

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

    public countOnGridPage: number = 4;

    public countOnLinePage: number = 5;

    public currentPage: number = 1;

    public watchesCount: number = 0;

    public categoriesFilter: TFilterMap = new Map<keyof IWatch, Set<string | number>>();

    public priceFilter!: IPrice;

    public queryParams!: Params;

    private screenWidth!: number;

    constructor(private watchesService: WatchesService, private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.calculateWatchesOnGridPage();
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

    public changeViewMode(view: string): void {
        this.viewMode = view;

        this.calculateWatchesOnGridPage();
        this.outputWatchesOnPage(1);
    }

    public receivePriceFilter(priceFilter: IPrice): void {
        this.priceFilter = priceFilter;
        this.filterWatchesByCategory();
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        });
    }

    public receiveCategoriesFilter(filtersMap$: TFilterMap): void {
        this.categoriesFilter = filtersMap$;
        this.filterWatchesByCategory();
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        });
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
        const countOnPage = this.viewMode === 'grid' ? this.countOnGridPage : this.countOnLinePage;

        this.currentPage = currentPage$;
        this.pagedWatches = this.filteredWatches.filter((watch: IWatch, i: number) => {
            return ((i >= (currentPage$ - 1) * countOnPage) && (i < currentPage$ * countOnPage));
        }
        );
    }

    @HostListener('window:resize', ['$event'])
    private calculateWatchesOnGridPage(event?: Event): void {
        this.screenWidth = window.innerWidth;

        if (this.screenWidth > 1730) {
            this.countOnGridPage = 10;
        }

        if (this.screenWidth > 1480 && this.screenWidth <= 1730) {
            this.countOnGridPage = 8;
        }

        if (this.screenWidth > 1230 && this.screenWidth <= 1480) {
            this.countOnGridPage = 6;
        }

        this.outputWatchesOnPage(1);
    }

}
