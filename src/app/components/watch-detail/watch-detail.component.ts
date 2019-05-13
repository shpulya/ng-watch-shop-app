import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ActivatedRoute, Params, RouterLinkActive} from '@angular/router';
import { WatchesService } from '../../services/watches.service';
import { IWatch } from '../../app.models';
import { CartService } from '../../services/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-watch-detail',
    templateUrl: './watch-detail.component.html',
    styleUrls: ['./watch-detail.component.scss']
})
export class WatchDetailComponent implements OnInit {

    public watch!: IWatch | null;

    public isAdded: boolean = false;

    public price: string = '';

    public queryParams!: Params;

    private routeSubscription: Subscription;

    private watchId!: number;

    constructor(
        private route: ActivatedRoute,
        private watchesService: WatchesService,
        private cartService: CartService) {

        this.routeSubscription = route.params.subscribe((params: Params) => {
            this.watchId = parseInt(params['watchId'], 10);
        }
        );
    }

    public ngOnInit(): void {
        this.watch = this.watchesService.getWatchById(this.watchId);
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.queryParams = queryParams;
        });
    }

    public addWatchToCart(watch: IWatch): void {
        this.cartService.addWatchToCart(watch);
        this.isAdded = true;

        setTimeout(() => {
            this.isAdded = false;
        }, 300);
    }

}
