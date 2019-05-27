import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';

import { WatchesService } from '../../services/watches.service';
import { IWatch } from '../../app.models';
import { CartService } from '../../services/cart.service';
import {HttpErrorResponse} from '@angular/common/http';

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

    private destroy$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private watchesService: WatchesService,
        private cartService: CartService) {
    }

    public ngOnInit(): void {

        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        });

        if (this.route.snapshot.data.watches instanceof HttpErrorResponse) {
            console.error('Couldn\'t load data', this.route.snapshot.data);
        } else {
            this.watch = this.route.snapshot.data.watch;
        }
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
