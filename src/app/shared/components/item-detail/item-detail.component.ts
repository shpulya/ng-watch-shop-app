import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IItem } from '../../../app.models';
import { CartService } from '../../../core/services/cart.service';
import { ViewedItemsService } from '../../../core/services/viewed-items.service';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

    @Input()
    public readonly item!: IItem | null;

    public items: Array<IItem> = [];

    public queryParams!: Params;

    public categories: {} = {
        watch: 'watches',
        wristband: 'wristbands'
    };

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private viewedItemsService: ViewedItemsService
    ) {}

    public ngOnInit(): void {
        this.viewedItemsService.receiveViewedItems();
        this.items = this.viewedItemsService.viewedItems$.getValue();
    }

    public addItemToCart(item: IItem): void {
        this.cartService.addItem(item);
    }
}
