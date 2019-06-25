import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IItem } from '../../../app.models';
import { CartService } from '../../../core/services/cart.service';
import { CookiesService } from '../../../core/services/cookies.service';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

    @Input()
    public item!: IItem | null;

    public items: Array<IItem> = [];

    public queryParams!: Params;

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private cookiesService: CookiesService
    ) {}

    public ngOnInit(): void {
        this.items = JSON.parse(this.cookiesService.getCookie('viewedItems'));
    }

    public addItemToCart(item: IItem): void {
        this.cartService.addItem(item);
    }
}
