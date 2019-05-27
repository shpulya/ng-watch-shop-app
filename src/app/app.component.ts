import { Component } from '@angular/core';

import { CartService } from './services/cart.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public isShowCart: boolean = false;


    constructor(
        private cartService: CartService
    ) {
        this.cartService.isShowCart$.subscribe((isShow: boolean) => {
            this.isShowCart = isShow;
        });
    }
}
