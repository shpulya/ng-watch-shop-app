import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { IWatch } from '../../app.models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    public items: Map<IWatch, number> = new Map<IWatch, number>();

    public itemsList: Array<IWatch> = [];

    constructor(
        private cartService: CartService
    ) {}

    public ngOnInit(): void {
        this.cartService.items$.subscribe((items: Map<IWatch, number>) => {
            this.items = items;
            this.itemsList = Array.from(this.items.keys());
        });
    }

    public closeCart(): void {
        this.cartService.changeCartState(false);
    }

    public reduceItemsCount(item: IWatch): void {
        this.cartService.reduceCountItem(item);
    }

    public increaseItemsCount(item: IWatch): void {
        this.cartService.addItem(item);
    }

    public deleteItem(item: IWatch): void {
        this.cartService.deleteItem(item);
    }

    public getItemsCount(item: IWatch): number {
        return this.items.get(item) || 0;
    }

    public getFinalSum(): number {
        let finalSum = 0;

        this.items.forEach((acc: number, item: IWatch) => {
            finalSum += acc * item.price;
        });

        return finalSum;
    }
}
