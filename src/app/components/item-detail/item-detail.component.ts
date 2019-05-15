import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { ItemsService } from '../../services/items.service';
import { IItem } from '../../app.models';
import { CartService } from '../../services/cart.service';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

    public watch!: IItem | null;

    public isAdded: boolean = false;

    public price: string = '';

    public queryParams!: Params;

    private routeSubscription!: Subscription;

    private watchId!: number;

    private alive: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private watchesService: ItemsService,
        private cartService: CartService) {


    }

    public ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((params: Params) => {
            this.watchId = parseInt(params['itemId'], 10);
        });

        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        });

        this.watchesService.items$
            .pipe(
                takeWhile(() => this.alive)
            )
            .subscribe(() => {
                this.watch = this.watchesService.getItemById(this.watchId);
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
