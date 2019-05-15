import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { WatchesService } from '../../services/watches.service';
import { IWatch } from '../../app.models';
import { CartService } from '../../services/cart.service';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'app-watch-detail',
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

    private alive: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private watchesService: WatchesService,
        private cartService: CartService) {


    }

    public ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((params: Params) => {
            this.watchId = parseInt(params['watchId'], 10);
        });

        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        });

        this.watchesService.watches$
            .pipe(
                takeWhile(() => this.alive)
            )
            .subscribe(() => {
                this.watch = this.watchesService.getWatchById(this.watchId);
            });
    }

    public ngOnDestroy(): void {
        this.alive = false;
    }

    public addWatchToCart(watchId: number): void {
        this.cartService.addItem(watchId);
        this.isAdded = true;

        setTimeout(() => {
            this.isAdded = false;
        }, 300);
    }

}
