import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { WatchesService } from '../../services/watches.service';
import { IWatch } from '../../app.models';
import { CartService } from '../../services/cart.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-watch-detail',
    templateUrl: './watch-detail.component.html',
    styleUrls: ['./watch-detail.component.scss']
})
export class WatchDetailComponent implements OnInit, OnDestroy {

    public watch!: IWatch | null;

    public queryParams!: Params;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private watchesService: WatchesService,
        private cartService: CartService
    ) {}

    public ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.watch = data.watch;

            this.route.queryParams
                .pipe(takeUntil(this.destroy$))
                .subscribe((queryParams: Params) => {
                    this.queryParams = queryParams;
                })
            ;
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public addWatchToCart(watch: IWatch): void {
        this.cartService.addItem(watch);
    }
}
