import { Component, OnInit, Input } from '@angular/core';
import { Params } from '@angular/router';

import { IItem } from '../../../app.models';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-watches-grid-view',
    templateUrl: './items-grid-view.component.html',
    styleUrls: ['./items-grid-view.component.scss']
})
export class ItemsGridViewComponent implements OnInit {

    @Input()
    public readonly watch!: IItem;

    @Input()
    public queryURLParams!: Params;

    public isAdded: boolean = false;

    constructor(
        private cartService: CartService
    ) {
    }

    public ngOnInit(): void {
    }

    public addItemToCart(itemId: number): void {
        this.cartService.addItem(itemId);
        this.isAdded = true;
    }

}
