import { Component, OnInit } from '@angular/core';
import { WatchesService } from '../../services/watches.service';
import { IPrice, IWatch } from '../../app.models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-searched-items',
    templateUrl: './searched-items.component.html',
    styleUrls: ['./searched-items.component.scss']
})
export class SearchedItemsComponent implements OnInit {

    public searchedWatches: Array<IWatch> = [];

    public searchedText: string = '';

    public destroy$: Subject<void> = new Subject();

    public viewMode: string = 'grid';

    public countOnGrid: number = 4;

    public countOnLine: number = 5;

    public currentPage: number = 1;

    public itemsCount: number = 0;

    public queryParams!: Params;

    public pagedItems: Array<IWatch> = [];

    public watches: Array<IWatch> = [];

    public filteredItems: Array<IWatch> = [];

    public overlay: boolean = false;

    public priceFilter!: IPrice;

    public orderBy: string = 'asc';

    constructor(
        private watchesService: WatchesService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.route.params.subscribe(routeParams => {
            this.searchedText = routeParams.searchedText;

            this.watchesService.getSearchedItemsByName(this.searchedText)
                .subscribe((searchedNames: Array<IWatch>) => {
                    this.watches = searchedNames;
                    this.filteredItems = [...this.watches];
                    this.selectPage(1);
                })
            ;
        });
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
    }

    public onPriceFilter(priceFilter: IPrice): void {
        this.priceFilter = priceFilter;
        this.filteredItems = [...this.watches];
        console.log(priceFilter);
        this.filteredItems = this.filteredItems.filter((watch: IWatch) =>
            (watch.price >= (this.priceFilter.from || 0) && watch.price <= (this.priceFilter.to || 99999))
        );
        this.selectPage(1);
    }

    public orderItems(orderBy: string): void {
        this.orderBy = orderBy;

        this.watches = (this.orderBy === 'asc')
            ? this.watches.sort((a: IWatch, b: IWatch) => a.price - b.price)
            : this.watches.sort((a: IWatch, b: IWatch) => b.price - a.price);
        this.selectPage(1);
    }

    public showOverlay(show: boolean): void {
        this.overlay = show;
    }
}
