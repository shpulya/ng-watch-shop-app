import {Injectable} from '@angular/core';
import {IWatch} from '../app.models';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public cartList: any [][] = [[], []];

    constructor() {
    }

    public addWatchToCart(watch: IWatch): void {

        if (this.cartList[0].includes(watch)) {
            this.cartList[1][this.cartList[0].indexOf(watch)] =  this.cartList[1][this.cartList[0].indexOf(watch)] + 1;
        } else {
            this.cartList[0].push(watch);
            this.cartList[1].push(1);
        }

        this.countWatchesItemInList();
    }



    public deleteWatchFromCart(watch: IWatch): void {

        if (this.cartList[0].includes(watch)) {
           if (this.cartList[1][this.cartList[0].indexOf(watch)] === 1) {
               this.cartList[0].splice(this.cartList[0].indexOf(watch), 1);
               this.cartList[1].splice(this.cartList[0].indexOf(watch), 1);
           } else {
               this.cartList[1][this.cartList[0].indexOf(watch)] =  this.cartList[1][this.cartList[0].indexOf(watch)] - 1;
           }
        }
    }


    public countWatchesItemInList(): number {

        return (this.cartList[1].reduce((acc: number, currentVal: number) => acc + currentVal, 0));
    }

    public getCartList(): any {

        return this.cartList;
    }

}
