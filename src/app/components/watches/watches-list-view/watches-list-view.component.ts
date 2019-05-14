import { Component, Input, OnInit } from '@angular/core';
import { Params } from '@angular/router';

import { IWatch } from '../../../app.models';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-watches-list-view',
    templateUrl: './watches-list-view.component.html',
    styleUrls: ['./watches-list-view.component.scss']
})
export class WatchesListViewComponent implements OnInit {

    @Input()
    public readonly watch!: IWatch;

    @Input()
    public queryURLParams!: Params;

    constructor(
        private cartService: CartService
    ) {
    }

    public ngOnInit(): void {
    }

    public addWatchToCart(watch: IWatch): void {
        this.cartService.addWatchToCart(watch);
    }
}
