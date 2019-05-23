import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WatchesService } from '../../services/watches.service';
import { IWatch } from '../../app.models';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-item-detail',
    templateUrl: './watch-detail.component.html',
    styleUrls: ['./watch-detail.component.scss']
})
export class WatchDetailComponent implements OnInit, OnDestroy {

    public watch!: IWatch | null;

    public isAdded: boolean = false;

    public price: string = '';

    public queryParams!: Params;

    private routeSubscription!: Subscription;

    private watchId!: number;

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private itemsService: WatchesService,
        private cartService: CartService) {


    }

    public ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((params: Params) => {
            this.watchId = parseInt(params['itemId'], 10);
        });

        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        });

        this.itemsService.items$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.itemsService.getItemById(this.watchId).subscribe((watch: IWatch) => {
                    this.watch = watch;
                });
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public addWatchToCart(watchId: number): void {
        this.cartService.addItem(watchId);
        this.isAdded = true;

        setTimeout(() => {
            this.isAdded = false;
        }, 300);
    }

}
