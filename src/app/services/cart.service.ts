import { Injectable } from '@angular/core';
import { IWatch } from '../app.models';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public cartMap: Map<IWatch, number> = new Map();

    constructor() {
    }

    public addWatchToCart(watch: IWatch): void {
        const cart = this.cartMap;

        if (!cart.has(watch)) {
            cart.set(watch, 1);
        } else if (cart && cart.has(watch)) {

            const watchCount = cart.get(watch);

            if (!watchCount) {
                return;
            }

            cart.delete(watch)
            cart.set(watch, watchCount + 1);
        }

        this.countWatchesItemInList();
    }


    public deleteWatchFromCart(watch: IWatch): void {
        const watchCount = this.cartMap.get(watch);

        if (!watchCount) {
            return;
        }

        this.cartMap.delete(watch);

        if (watchCount > 1) {
            this.cartMap.set(watch, watchCount - 1);
        }

    }


    public countWatchesItemInList(): number {

        return Array.from(this.cartMap.values()).reduce((acc: number, currentVal: number) => acc + currentVal, 0);
    }

    public getCartMap(): Map<IWatch, number> {
        return this.cartMap;
    }

}
