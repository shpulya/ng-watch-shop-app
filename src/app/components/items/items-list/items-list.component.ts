import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IItem } from '../../../app.models';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit, OnChanges {

    @Input()
    public items: Array<IItem> = [];

    @Input()
    public readonly gridViewItemTemplate!: TemplateRef<any>;

    @Input()
    public readonly lineViewItemTemplate!: TemplateRef<any>;

    public pagedItems: Array<IItem> = [];

    public viewMode: string = 'grid';

    public orderBy: string = 'asc';

    public queryParams!: Params;

    public countOnGrid: number = 4;

    public countOnLine: number = 5;

    public currentPage: number = 1;

    public itemsCount: number = 0;

    private screenWidth!: number;

    private resize$: Subject<void> = new Subject();

    private destroy$: Subject<void> = new Subject();

    constructor(
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

                this.selectPage(this.currentPage);
            })
        ;

        this.calculateItemsOnGrid();

        this.queryParams = this.route.snapshot.queryParams;
        if (this.queryParams['view']) {
            this.viewMode = this.queryParams['view'];
        }
        if (this.queryParams['sort']) {
            this.orderBy = this.queryParams['sort'];
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const {items} = changes;

        if (
            items
            && items.currentValue
            && Array.isArray(items.currentValue)
        ) {
            this.items = items.currentValue;
            this.itemsCount = items.currentValue.length;
        }
    }

    @HostListener('window:resize', ['$event'])
    public calculateItemsOnGrid(event?: Event): void {
        this.resize$.next();
    }

    public changeViewMode(view: string): void {
        this.viewMode = view;
        this.router.navigate(
            [this.router.url.split('?')[0] ],
            {
                queryParams: {view: view},
                queryParamsHandling: 'merge'
            }
        );
        this.calculateItemsOnGrid();
        this.selectPage(1);
    }

    public orderItems(orderBy: string): void {
        this.orderBy = orderBy;
        this.router.navigate(
            [this.router.url.split('?')[0] ],
            {
                queryParams: { sort: this.orderBy },
                queryParamsHandling: 'merge'
            }
        );

        this.selectPage(1, this.orderBy === 'asc'
            ? this.items.sort((a: IItem, b: IItem) => a.price - b.price)
            : this.items.sort((a: IItem, b: IItem) => b.price - a.price)
        );
    }

    public selectPage(currentPage: number, items: Array<IItem> = this.items): void {
        const countOnPage = this.viewMode === 'grid'
            ? this.countOnGrid
            : this.countOnLine
        ;

        this.currentPage = currentPage;
        this.pagedItems = items.filter((watch: IItem, i: number) => {
            return ((i >= (currentPage - 1) * countOnPage) && (i < currentPage * countOnPage));
        });
    }
}
