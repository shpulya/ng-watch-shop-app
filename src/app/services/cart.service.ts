import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IWatch} from '../app.models';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cartList$: BehaviorSubject<Array<IWatch>> = new BehaviorSubject<Array<IWatch>>([]);

    constructor() {
    }

    public addWatchToCart(watch: IWatch): void {
        let cartList = this.cartList$.getValue();

        cartList.push(watch);
        this.cartList$.next(cartList);
    }

    public deleteWatchFromCart(watch: IWatch): void {
        let cartList = this.cartList$.getValue();

        if (cartList.includes(watch)) {
            cartList.splice(cartList.indexOf(watch), 1);
        }
        this.cartList$.next(cartList);
    }


    public countWatchesItemInList(): number {
        if () {
            return this.cartList$.getValue().length;
        }
    }

}
