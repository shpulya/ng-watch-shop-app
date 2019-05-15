import { Component, Input, OnInit } from '@angular/core';
import { Params } from '@angular/router';

import { IItem } from '../../../app.models';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-watches-list-view',
    templateUrl: './items-list-view.component.html',
    styleUrls: ['./items-list-view.component.scss']
})
export class ItemsListViewComponent implements OnInit {

    @Input()
    public readonly watch!: IItem;

    @Input()
    public queryURLParams!: Params;

    constructor(
        private cartService: CartService
    ) {
    }

    public ngOnInit(): void {
    }

    public addItemToCart(itemId: number): void {
        this.cartService.addItem(itemId);
    }
}
