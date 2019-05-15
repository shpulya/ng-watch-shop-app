import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class CartService {

    public isShowCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public items$: BehaviorSubject<Map<number, number>> = new BehaviorSubject<Map<number, number>>(new Map());

    constructor(private cookieService: CookieService) {
    }

    public addItem(watchId: number): void {

        if (!this.items$.getValue().has(watchId)) {
            this.items$.next(this.items$.getValue().set(watchId, 1));
        } else {
            const watchCount = this.items$.getValue().get(watchId);

            if (!watchCount) {
                return;
            }

            this.items$.getValue().delete(watchId);
            this.items$.next(this.items$.getValue().set(watchId, watchCount + 1));
        }

        this.countItemsInCart();
        this.cookieService.set('cartItems', JSON.stringify([...this.items$.getValue()]));
    }

    public deleteItem(watchId: number): void {

        this.items$.getValue().delete(watchId);
        this.items$.next(this.items$.getValue());
        this.countItemsInCart();
        this.cookieService.set('cartItems', JSON.stringify([...this.items$.getValue()]));
    }

    public reduceCountItem(watchId: number): void {
        const watchCount = this.items$.getValue().get(watchId);

        if (!watchCount) {
            return;
        }

        this.items$.getValue().delete(watchId);

        if (watchCount > 1) {
            this.items$.getValue().set(watchId, watchCount - 1);
        }

        this.items$.next(this.items$.getValue());
        this.countItemsInCart();
        this.cookieService.set('cartItems', JSON.stringify([...this.items$.getValue()]));
    }

    public countItemsInCart(): number {
        return Array.from(this.items$
            .getValue()
            .values())
            .reduce((acc: number, currentCount: number) => acc + currentCount, 0);
    }
}
