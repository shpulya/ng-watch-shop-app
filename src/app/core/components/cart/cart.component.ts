import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { ICart, IItem, IShortItemInfo, IType } from '../../../app.models';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    public items: Map<string, ICart> = new Map();

    public itemsList: Array<IItem> = [];

    private destroy$: Subject<void> = new Subject();

    private types: Array<IType> = this.cartService.types;

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
        const {id, type} = item;

        this.cartService.reduceCountItem({id, type});
    }

    public increaseItemsCount(item: IShortItemInfo): void {
        this.cartService.increaseCountItem(item);
    }

    public deleteItem(item: IShortItemInfo): void {
        const {id, type} = item;

        this.cartService.deleteItem({id, type});
    }

    public getItemsCount(i: IItem): number {
        const {id, type} = i;
        const item = this.items.get(`${id}#${type}`);

        if (!item) {
            return 0;
        }

        return item.count;
    }

    public getFinalSum(): number {
        let finalSum = 0;

        this.items.forEach((item: ICart) => {
            finalSum += item.count * item.item.price;
        });

        return finalSum;
    }

    public getImgFolder(type: string): string | null {
        const category = this.types.find((cat: IType) => cat.type === type);

        return category ? category.pluralType : null;
    }
}
