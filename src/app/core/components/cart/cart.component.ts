import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CartService, ICart } from '../../services/cart.service';
import { IItem, IShortItemInfo, IType } from '../../../app.models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    public items: Map<string, ICart> = new Map();

    public itemsList: Array<IItem> = [];

    private destroy$: Subject<void> = new Subject();

    constructor(
        private cartService: CartService
    ) {}

    public ngOnInit(): void {
        this.cartService.items$
            .pipe(takeUntil(this.destroy$))
            .subscribe((items: Map<string, ICart>) => {
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

    public reduceItemsCount(item: IShortItemInfo): void {
        this.cartService.reduceCountItem(item);
    }

    public increaseItemsCount(item: IShortItemInfo): void {
        this.cartService.increaseCountItem(item);
    }

    public deleteItem(item: IShortItemInfo): void {
        this.cartService.deleteItem(item);
    }

    public getItemsCount(i: IItem): number {
        const item = this.items.get(this.cartService.generateItemId(i));

        if (!item) {
            return 0;
        }

        return item.count;
    }

    public getFinalSum(): number {
        return this.cartService.getFinalSum();
    }
}
