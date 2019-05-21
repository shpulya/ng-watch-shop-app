import { Component } from '@angular/core';

import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public isShowCart: boolean = false;

    public isLoading$: Observable<boolean> = this.loaderService.loading$;

    constructor(
        private cartService: CartService,
        private loaderService: LoaderService
    ) {
        this.cartService.isShowCart$.subscribe((isShow: boolean) => {
            this.isShowCart = isShow;
        });
    }
}
