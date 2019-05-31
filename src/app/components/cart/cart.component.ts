import { Component, OnDestroy, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { ICart, IItem } from '../../app.models';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    public items: Map<number, ICart> = new Map<number, ICart>();

    public itemsList: Array<IItem> = [];

    private destroy$: Subject<void> = new Subject();

    constructor(
        private cartService: CartService
    ) {}

    public ngOnInit(): void {
        this.cartService.items$
            .pipe(takeUntil(this.destroy$))
            .subscribe((items: Map<number, ICart>) => {
                this.items = items;
                this.itemsList = Array.from(this.items.values()).map(item => item.item);
            })
        ;
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public closeCart(): void {
        this.cartService.close();
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
        const item = this.items.get(id);

        if (!item) {
            return 0;
        }

        return item.count;
    }

    public getFinalSum(): number {
        let finalSum = 0;

        this.items.forEach((item: ICart, id: number) => {
            finalSum += item.count * item.item.price;
        });

        return finalSum;
    }
}
