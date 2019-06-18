import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IItem } from '../../../app.models';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

    @Input()
    public item!: IItem | null;

    public queryParams!: Params;

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService
    ) {}

    public ngOnInit(): void {
    }

    public addItemToCart(item: IItem): void {
        this.cartService.addItem(item);
    }
}
