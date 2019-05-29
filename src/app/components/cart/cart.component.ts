import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { ICart, IItem } from '../../app.models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    public items: Map<number, ICart> = new Map<number, ICart>();

    public itemsList: Array<IItem> = [];

    constructor(
        private cartService: CartService
    ) {}

    public ngOnInit(): void {
        this.cartService.items$.subscribe((items: Map<number, ICart>) => {
            this.items = items;
            this.itemsList = Array.from(this.items.values()).map(item => item.item);
        });
    }

    public closeCart(): void {
        this.cartService.changeCartState(false);
    }

    public reduceItemsCount(id: number): void {
        this.cartService.reduceCountItem(id);
    }

    public increaseItemsCount(id: number): void {
        this.cartService.increaseCountItem(id);
    }

    public deleteItem(id: number): void {
        this.cartService.deleteItem(id);
    }

    public getItemsCount(id: number): number {
        return this.items.get(id)!.count || 0;
    }

    public getFinalSum(): number {
        let finalSum = 0;

        this.items.forEach((item: ICart, id: number) => {
            finalSum += item.count * item.item.price;
        });

        return finalSum;
    }
}
