import { Injectable } from '@angular/core';
import { IWatch } from '../app.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public isShowCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public cartMap: Map<IWatch, number> = new Map();

    public countWatches$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor() {
    }

    public addWatchToCart(watch: IWatch): void {
        const cart = this.cartMap;

        if (!cart.has(watch)) {
            cart.set(watch, 1);
        } else {
            const watchCount = cart.get(watch);

            if (!watchCount) {
                return;
            }

            cart.delete(watch);
            cart.set(watch, watchCount + 1);
        }

        this.countWatchesItemInList();
    }

    public deleteWatchFromCart(watch: IWatch, all: boolean): void {
        const watchCount = this.cartMap.get(watch);

        if (!watchCount) {
            return;
        }

        this.cartMap.delete(watch);

        if (!all) {
            if (watchCount > 1) {
                this.cartMap.set(watch, watchCount - 1);
            }
        }

        this.countWatchesItemInList();
    }

    public countWatchesItemInList(): void {
        this.countWatches$.next(Array.from(this.cartMap.values()).reduce((acc: number, currentVal: number) => acc + currentVal, 0));
    }

    public getCartMap(): Map<IWatch, number> {
        return this.cartMap;
    }

}
