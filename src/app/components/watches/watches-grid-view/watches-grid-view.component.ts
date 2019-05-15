import { Component, OnInit, Input } from '@angular/core';
import { Params } from '@angular/router';

import { IWatch } from '../../../app.models';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-watches-grid-view',
    templateUrl: './watches-grid-view.component.html',
    styleUrls: ['./watches-grid-view.component.scss']
})
export class WatchesGridViewComponent implements OnInit {

    @Input()
    public readonly watch!: IWatch;

    @Input()
    public queryURLParams!: Params;

    public isAdded: boolean = false;

    constructor(
        private cartService: CartService
    ) {
    }

    public ngOnInit(): void {
    }

    public addWatchToCart(watchId: number): void {
        this.cartService.addItem(watchId);
        this.isAdded = true;
    }

}
